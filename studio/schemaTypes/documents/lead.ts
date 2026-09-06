import {InboxIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// Written by app/api/leads/route.js from the 4 public forms (see
// Formularios-Ginkgo.pdf) — editors manage status/notes here in the Studio
// until a dedicated admin Leads screen exists.
export const lead = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  icon: InboxIcon,
  fields: [
    defineField({
      name: 'formType',
      title: 'Formulario',
      type: 'string',
      options: {
        list: [
          {title: 'A — Solicitar información', value: 'property_info'},
          {title: 'B — Promover propiedad', value: 'sell_property'},
          {title: 'C — Busco una propiedad', value: 'search_property'},
          {title: 'D — Contacto general', value: 'general'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          {title: 'Nuevo', value: 'nuevo'},
          {title: 'Contactado', value: 'contactado'},
          {title: 'En seguimiento', value: 'seguimiento'},
          {title: 'Cerrado', value: 'cerrado'},
          {title: 'Descartado', value: 'descartado'},
        ],
      },
      initialValue: 'nuevo',
      validation: (r) => r.required(),
    }),

    defineField({name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'lastName', title: 'Apellido', type: 'string'}),
    defineField({name: 'email', title: 'Correo', type: 'string', validation: (r) => r.required().email()}),
    defineField({name: 'phone', title: 'Teléfono / WhatsApp', type: 'string'}),
    defineField({name: 'company', title: 'Empresa', type: 'string'}),

    // Formulario A — Solicitar información sobre una propiedad
    defineField({
      name: 'property',
      title: 'Propiedad de interés',
      type: 'reference',
      to: [{type: 'opportunity'}],
    }),
    defineField({
      name: 'propertyName',
      title: 'Nombre de la propiedad (respaldo)',
      description: 'Guardado directamente del formulario, por si la referencia de arriba no se resuelve.',
      type: 'string',
    }),
    defineField({name: 'profile', title: 'Perfil', type: 'string'}),
    defineField({
      name: 'infoRequested',
      title: 'Información solicitada',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // Formulario B — Promover mi propiedad
    defineField({name: 'propertyState', title: 'Estado (ubicación)', type: 'string'}),
    defineField({name: 'propertyMunicipality', title: 'Municipio / ciudad', type: 'string'}),
    defineField({name: 'propertyZone', title: 'Zona / localidad', type: 'string'}),
    defineField({name: 'propertySurface', title: 'Superficie aproximada', type: 'string'}),
    defineField({name: 'propertyType', title: 'Tipo de propiedad', type: 'string'}),
    defineField({name: 'propertyVocation', title: 'Uso o vocación', type: 'string'}),
    defineField({name: 'ownerRelation', title: 'Situación de quien contacta', type: 'string'}),
    defineField({name: 'desiredPrice', title: 'Precio pretendido', type: 'string'}),
    defineField({name: 'hasDocumentation', title: '¿Cuenta con documentación?', type: 'boolean'}),
    defineField({name: 'attachment', title: 'Archivo adjunto', type: 'file'}),

    // Formulario C — Busco una propiedad
    defineField({name: 'lookingFor', title: 'Qué está buscando', type: 'string'}),
    defineField({name: 'regionOfInterest', title: 'Ubicación / región de interés', type: 'string'}),
    defineField({name: 'surfaceNeeded', title: 'Superficie aproximada', type: 'string'}),
    defineField({name: 'developmentType', title: 'Tipo de desarrollo', type: 'string'}),
    defineField({name: 'budget', title: 'Presupuesto aproximado', type: 'string'}),
    defineField({name: 'purchaseHorizon', title: 'Horizonte de compra', type: 'string'}),

    // Formulario D — Contacto general
    defineField({name: 'contactReason', title: 'Motivo del contacto', type: 'string'}),

    defineField({name: 'message', title: 'Mensaje / comentarios', type: 'text', rows: 4}),

    // Internal tracking (section 12 of the brief) — never shown to the visitor.
    defineField({name: 'sourcePage', title: 'Página de origen', type: 'string', readOnly: true}),
    defineField({name: 'locale', title: 'Idioma', type: 'string', readOnly: true}),
    defineField({name: 'utmSource', title: 'Fuente (utm_source)', type: 'string', readOnly: true}),
    defineField({name: 'utmCampaign', title: 'Campaña (utm_campaign)', type: 'string', readOnly: true}),
    defineField({
      name: 'createdAt',
      title: 'Fecha',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {name: 'name', lastName: 'lastName', formType: 'formType', status: 'status'},
    prepare({name, lastName, formType, status}) {
      return {
        title: [name, lastName].filter(Boolean).join(' '),
        subtitle: `${formType} · ${status}`,
      }
    },
  },
  orderings: [
    {title: 'Más reciente primero', name: 'createdAtDesc', by: [{field: 'createdAt', direction: 'desc'}]},
  ],
})
