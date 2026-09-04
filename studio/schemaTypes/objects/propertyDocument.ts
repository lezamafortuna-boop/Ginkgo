import {defineField, defineType} from 'sanity'

// A labeled file attached directly to a property (e.g. "Ficha técnica",
// "Plano topográfico"), distinct from the standalone `document` library
// which can also associate a document to a property or region.
export const propertyDocument = defineType({
  name: 'propertyDocument',
  title: 'Documento',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Nombre del documento', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'file', title: 'Archivo', type: 'file', validation: (r) => r.required()}),
  ],
  preview: {
    select: {title: 'label'},
  },
})
