import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

// Singleton — locked to a fixed document ID by the Structure (see structure/index.ts).
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Datos de contacto y redes',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'phoneDisplay',
      title: 'Teléfono (formato de visualización)',
      description: 'Ej. "+52 442 508 8204" — como se muestra en el sitio.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      description: 'Solo dígitos con código de país, sin espacios ni signos. Ej. "524425088204".',
      type: 'string',
      validation: (r) =>
        r
          .required()
          .regex(/^[0-9]{8,15}$/, {name: 'digits', invert: false})
          .error('Solo dígitos, incluyendo código de país (8–15 caracteres).'),
    }),
    defineField({
      name: 'email',
      title: 'Correo de contacto',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'URL de Instagram',
      type: 'url',
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'URL de LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'address',
      title: 'Dirección (opcional)',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Datos de contacto y redes'}
    },
  },
})
