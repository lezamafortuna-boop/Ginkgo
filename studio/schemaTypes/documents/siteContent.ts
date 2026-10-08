import {EditIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// Singleton — locked to a fixed document ID by the Structure (see structure/index.ts).
// Homepage and informational-section copy editable from the admin panel's
// "Contenido del sitio" module without a redeploy.
export const siteContent = defineType({
  name: 'siteContent',
  title: 'Contenido del sitio',
  type: 'document',
  icon: EditIcon,
  groups: [
    {name: 'home', title: 'Homepage', default: true},
    {name: 'sections', title: 'Secciones informativas'},
  ],
  fields: [
    defineField({name: 'homeHeroTitle', title: 'Título del hero', type: 'localeString', group: 'home'}),
    defineField({name: 'homeHeroSubtitle', title: 'Subtítulo del hero', type: 'localeText', group: 'home'}),
    defineField({
      name: 'homeHeroImage',
      title: 'Imagen del hero',
      type: 'image',
      options: {hotspot: true},
      group: 'home',
    }),
    defineField({
      name: 'texts',
      title: 'Textos editables (admin)',
      description: 'Los gestiona el panel /admin/contenido (catálogo en lib/siteContentCatalog.js). Solo guarda los textos que difieren del original.',
      type: 'array',
      group: 'sections',
      readOnly: true,
      of: [
        {
          type: 'object',
          name: 'textOverride',
          fields: [
            defineField({name: 'key', title: 'Clave', type: 'string'}),
            defineField({name: 'es', title: 'Español', type: 'text'}),
            defineField({name: 'en', title: 'English', type: 'text'}),
          ],
          preview: {select: {title: 'key', subtitle: 'es'}},
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Secciones informativas',
      description: 'Bloques reutilizables de texto + imagen para las páginas de contenido.',
      type: 'array',
      group: 'sections',
      of: [
        {
          type: 'object',
          name: 'contentSection',
          fields: [
            defineField({name: 'key', title: 'Identificador', type: 'slug', options: {maxLength: 96}}),
            defineField({name: 'title', title: 'Título', type: 'localeString'}),
            defineField({name: 'body', title: 'Texto', type: 'localeMarkdown'}),
            defineField({
              name: 'image',
              title: 'Imagen',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {title: 'title.es', subtitle: 'key.current', media: 'image'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contenido del sitio'}
    },
  },
})
