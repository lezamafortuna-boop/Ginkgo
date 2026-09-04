import {ActivityIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// Written by admin-panel mutation routes (lib/activityLog.js), never edited
// by hand in the Studio — read-only here, surfaced on the admin Dashboard.
export const activityLog = defineType({
  name: 'activityLog',
  title: 'Registro de actividad',
  type: 'document',
  icon: ActivityIcon,
  fields: [
    defineField({name: 'actorName', title: 'Usuario', type: 'string', readOnly: true}),
    defineField({name: 'actorEmail', title: 'Correo', type: 'string', readOnly: true}),
    defineField({
      name: 'action',
      title: 'Acción',
      type: 'string',
      options: {
        list: [
          {title: 'Creó', value: 'create'},
          {title: 'Actualizó', value: 'update'},
          {title: 'Eliminó', value: 'delete'},
          {title: 'Publicó', value: 'publish'},
          {title: 'Despublicó', value: 'unpublish'},
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: 'entityType',
      title: 'Tipo de entidad',
      type: 'string',
      readOnly: true,
    }),
    defineField({name: 'entityId', title: 'ID de entidad', type: 'string', readOnly: true}),
    defineField({name: 'entityLabel', title: 'Nombre de entidad', type: 'string', readOnly: true}),
    defineField({
      name: 'createdAt',
      title: 'Fecha',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {actorName: 'actorName', action: 'action', entityLabel: 'entityLabel', createdAt: 'createdAt'},
    prepare({actorName, action, entityLabel, createdAt}) {
      return {
        title: `${actorName || 'Alguien'} ${action || ''} ${entityLabel || ''}`.trim(),
        subtitle: createdAt ? new Date(createdAt).toLocaleString('es-MX') : '',
      }
    },
  },
  orderings: [
    {
      title: 'Más reciente primero',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
  ],
})
