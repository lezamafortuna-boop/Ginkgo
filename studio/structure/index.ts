import {CogIcon, EditIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

// Document types locked to a single fixed-ID document — excluded from the
// generic list below so editors can't accidentally create a second one.
const SINGLETONS = ['siteSettings', 'siteContent']

// Written only by the admin panel's mutation routes (lib/activityLog.js) —
// hidden from the generic list so editors don't try to create/edit entries
// by hand in the Studio.
const HIDDEN_FROM_LIST = ['activityLog']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido de Ginkgo')
    .items([
      S.listItem()
        .title('Datos de contacto y redes')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Datos de contacto y redes'),
        ),

      S.listItem()
        .title('Contenido del sitio')
        .icon(EditIcon)
        .child(
          S.document()
            .schemaType('siteContent')
            .documentId('siteContent')
            .title('Contenido del sitio'),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(listItem.getId() as string) &&
          !HIDDEN_FROM_LIST.includes(listItem.getId() as string),
      ),
    ])
