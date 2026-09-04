import {PinIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const region = defineType({
  name: 'region',
  title: 'Región Estratégica',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({name: 'name', title: 'Nombre', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name.es', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'description', title: 'Descripción', type: 'localeText'}),
    defineField({
      name: 'advantages',
      title: 'Ventajas',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen principal',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'mapImage',
      title: 'Imagen de mapa',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Orden de despliegue',
      description: 'Número menor aparece primero.',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {title: 'name.es', subtitle: 'name.en', media: 'heroImage'},
  },
})
