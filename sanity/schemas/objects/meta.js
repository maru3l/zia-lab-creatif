export default {
  type: 'object',
  name: 'meta',
  title: 'Meta',
  options: { collapsible: true, collapsed: true },
  fields: [
    // {
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   options: {
    //     source: 'title',
    //     maxLength: 96
    //   }
    // },
    {
      name: 'title',
      title: 'Titre',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'keyword',
      title: 'Mot clé',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
  ]
}
