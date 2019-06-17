import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Réglage général')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings')
        )
        .icon(MdSettings),
      S.listItem()
        .title('Membres du conseil')
        .schemaType('boardMember')
        .child(S.documentTypeList('boardMember').title('Membre')),
    ])
