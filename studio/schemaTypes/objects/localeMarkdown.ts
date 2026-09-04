import {defineField, defineType} from 'sanity'

// Long-form bilingual Markdown (property landing-page descriptions, site
// content sections). Plain textarea storing Markdown source — rendered with
// react-markdown on the public site — rather than a full Portable Text
// authoring UI, to keep the admin panel lightweight.
export const localeMarkdown = defineType({
  name: 'localeMarkdown',
  title: 'Texto enriquecido (ES/EN, Markdown)',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      description: 'Admite Markdown: **negritas**, _cursivas_, listas, encabezados con ##, [enlaces](url).',
      type: 'text',
      rows: 10,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      description: 'Supports Markdown: **bold**, _italics_, lists, ## headings, [links](url).',
      type: 'text',
      rows: 10,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: {title: 'es'},
  },
})
