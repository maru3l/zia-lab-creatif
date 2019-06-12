export default {
  name: 'figure',
  type: 'image',
  title: 'Image',
  options: { hotspot: true },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Description',
      options: { isHighlighted: true }
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Texte alternatif',
      description: 'Neccessaire pour les lecteurs d\'écran ou lorsque l\'image n\'est pas téléchargé correctement',
      options: { isHighlighted: true },
      validation: Rule => Rule.error('Vous devez entrer le texte alternatif.').required(),
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
