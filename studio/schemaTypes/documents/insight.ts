import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const insight = defineType({
  name: 'insight',
  title: 'Insight',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', title: 'Título', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.es', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'category', title: 'Categoría', type: 'localeString'}),
    defineField({name: 'date', title: 'Fecha', type: 'date', validation: (r) => r.required()}),
    defineField({name: 'excerpt', title: 'Resumen', type: 'localeText'}),
    defineField({name: 'content', title: 'Contenido', type: 'localeText'}),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'title.es', subtitle: 'category.es', media: 'image'},
  },
})
