import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const opportunity = defineType({
  name: 'opportunity',
  title: 'Oportunidad',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'main', title: 'Principal', default: true},
    {name: 'location', title: 'Ubicación'},
    {name: 'potential', title: 'Potencial'},
    {name: 'media', title: 'Multimedia'},
    {name: 'extra', title: 'Campos adicionales'},
  ],
  fields: [
    defineField({name: 'name', title: 'Nombre', type: 'localeString', group: 'main'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name.es', maxLength: 96},
      validation: (r) => r.required(),
      group: 'main',
    }),
    defineField({
      name: 'featured',
      title: 'Destacada en Home',
      description: 'Activa para incluirla entre las tres oportunidades destacadas de la Home.',
      type: 'boolean',
      initialValue: false,
      group: 'main',
    }),
    defineField({
      name: 'order',
      title: 'Orden de despliegue',
      description: 'Número menor aparece primero (entre las destacadas y en el listado).',
      type: 'number',
      initialValue: 0,
      group: 'main',
    }),
    defineField({
      name: 'region',
      title: 'Región',
      type: 'reference',
      to: [{type: 'region'}],
      group: 'main',
    }),
    defineField({
      name: 'image',
      title: 'Imagen principal (tarjeta y hero)',
      type: 'image',
      options: {hotspot: true},
      group: 'main',
    }),
    defineField({name: 'city', title: 'Ciudad / región', type: 'localeString', group: 'main'}),
    defineField({
      name: 'surface',
      title: 'Superficie',
      description: 'Ej. "12 ha". Mismo valor para ambos idiomas.',
      type: 'string',
      group: 'main',
    }),
    defineField({name: 'vocation', title: 'Vocación', type: 'localeString', group: 'main'}),
    defineField({
      name: 'availability',
      title: 'Disponibilidad (texto libre para la tarjeta)',
      description: 'Ej. "Disponible", "Próximamente". No controla visibilidad — usa el campo Estado para eso.',
      type: 'localeString',
      group: 'main',
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      description: 'Controla si la propiedad se muestra públicamente. "Vendido" y "Reservado" siguen siendo editables en el CRM pero se ocultan de la web pública.',
      type: 'string',
      options: {
        list: [
          {title: 'Disponible', value: 'disponible'},
          {title: 'Reservado', value: 'reservado'},
          {title: 'Vendido', value: 'vendido'},
        ],
        layout: 'radio',
      },
      initialValue: 'disponible',
      validation: (r) => r.required(),
      group: 'main',
    }),
    defineField({
      name: 'advantages',
      title: 'Atributos principales (tarjeta)',
      description: 'Se muestran los primeros 2 en la tarjeta de la Home.',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'main',
    }),

    defineField({
      name: 'reasons',
      title: '¿Por qué esta oportunidad?',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'potential',
    }),
    defineField({
      name: 'developmentPotential',
      title: 'Potencial de desarrollo',
      type: 'localeText',
      group: 'potential',
    }),
    defineField({
      name: 'techSheet',
      title: 'Ficha técnica (PDF)',
      type: 'file',
      options: {accept: '.pdf'},
      group: 'potential',
    }),

    defineField({
      name: 'mapImage',
      title: 'Imagen de mapa',
      type: 'image',
      options: {hotspot: true},
      group: 'location',
    }),
    defineField({
      name: 'distances',
      title: 'Distancias relevantes',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'location',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordenadas',
      description: 'Ubicación exacta usada por el mapa interactivo público y el mapa del CRM.',
      type: 'geopoint',
      group: 'location',
    }),

    defineField({
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      group: 'media',
    }),
    defineField({
      name: 'documents',
      title: 'Documentos de la propiedad',
      type: 'array',
      of: [{type: 'propertyDocument'}],
      group: 'media',
    }),

    defineField({
      name: 'customFields',
      title: 'Campos adicionales',
      description: 'Campos libres para información específica de esta propiedad que no tiene un lugar fijo en el formulario.',
      type: 'array',
      of: [{type: 'customField'}],
      group: 'extra',
    }),
  ],
  preview: {
    select: {title: 'name.es', subtitle: 'city.es', media: 'image', featured: 'featured'},
    prepare({title, subtitle, media, featured}) {
      return {
        title,
        subtitle: featured ? `★ Destacada · ${subtitle}` : subtitle,
        media,
      }
    },
  },
})
