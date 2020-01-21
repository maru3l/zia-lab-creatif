export default {
  name: "featureImage",
  title: "Image à la une",
  type: "object",
  fields: [
    {
      name: "image",
      type: "figure"
    },
    {
      name: "disposition",
      title: "disposition",
      type: "string",
      options: {
        list: [
          {title: 'Pleine écran', value: 'fullScreen'},
          {title: 'Grille', value: 'grid'}
        ]
      }
    }
  ]
};
