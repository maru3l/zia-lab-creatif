export default {
  name: 'BoardMember',
  title: 'Conseil d\'administration',
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
      name: 'order',
      title: 'Order d\'affichage',
      type: 'number',
    }
  ],
}
