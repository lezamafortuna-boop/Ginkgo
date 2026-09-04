import {defineField, defineType} from 'sanity'

// Free-form label/value pair, used for the property "additional fields" the
// assistant can add without a schema change (e.g. "Uso de suelo": "Mixto").
export const customField = defineType({
  name: 'customField',
  title: 'Campo adicional',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Nombre del campo', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'value', title: 'Valor', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
