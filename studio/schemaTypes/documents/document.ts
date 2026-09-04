import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// Standalone Documents module — a library of files that can be associated to
// a property and/or a region, independent of the per-property `documents`
// array on the `opportunity` schema (which is for files that belong to one
// specific listing, like its own tech sheet).
export const siteDocument = defineType({
  name: 'siteDocument',
  title: 'Documento',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({name: 'title', title: 'Nombre', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'type',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          {title: 'Ficha técnica', value: 'tech_sheet'},
          {title: 'Plano', value: 'plan'},
          {title: 'Legal', value: 'legal'},
          {title: 'Presentación', value: 'presentation'},
          {title: 'Otro', value: 'other'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'other',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'property',
      title: 'Propiedad asociada',
      type: 'reference',
      to: [{type: 'opportunity'}],
    }),
    defineField({
      name: 'region',
      title: 'Región asociada',
      type: 'reference',
      to: [{type: 'region'}],
    }),
    defineField({name: 'file', title: 'Archivo', type: 'file', validation: (r) => r.required()}),
    defineField({
      name: 'uploadedAt',
      title: 'Fecha de carga',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'type', propertyName: 'property.name.es', regionName: 'region.name.es'},
    prepare({title, subtitle, propertyName, regionName}) {
      return {title, subtitle: [subtitle, propertyName || regionName].filter(Boolean).join(' · ')}
    },
  },
})
