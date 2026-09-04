import {defineField, defineType} from 'sanity'

// Short bilingual text (titles, labels, single-line values). Both languages
// are edited side by side in one field so ES/EN never drift out of sync.
export const localeString = defineType({
  name: 'localeString',
  title: 'Texto (ES/EN)',
  type: 'object',
  fields: [
    defineField({name: 'es', title: 'Español', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'en', title: 'English', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {
    select: {title: 'es', subtitle: 'en'},
  },
})
