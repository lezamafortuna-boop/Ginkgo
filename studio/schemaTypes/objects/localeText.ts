import {defineField, defineType} from 'sanity'

// Longer bilingual text (paragraphs, descriptions). Plain multi-line text —
// not Portable Text — so editors get a simple textarea instead of a rich-text
// toolbar; upgrade to blockContent later if formatting needs grow.
export const localeText = defineType({
  name: 'localeText',
  title: 'Texto largo (ES/EN)',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {title: 'es'},
  },
})
