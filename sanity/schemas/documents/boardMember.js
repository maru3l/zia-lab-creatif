export default {
  name: 'BoardMember',
  title: 'Membres',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'richText',
    },
    {
      name: 'portrait',
      title: 'Portrait',
      type: 'figure'
    },
    {
      name: 'order',
      title: 'Order d\'affichage',
      type: 'number',
    }
  ],
}
