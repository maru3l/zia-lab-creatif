export default {
  name: "Project",
  title: "Projets",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string"
    },
    {
      name: "featureImage",
      title: "Image à la une",
      type: "featureImage"
    },
    {
      name: "description",
      title: "Description",
      type: "richText"
    },
    {
      name: "credit",
      title: "Crédits et partenaires",
      type: "richText"
    },
    {
      name: "info",
      title: "Informations supplémentaires",
      type: "richText"
    },
    {
      name: "gallery",
      title: "Galerie",
      type: "array",
      of: [{ type: "figure" }],
      options: {
        layout: "grid"
      }
    },
    {
      title: "Vidéo",
      name: "videoUrl",
      type: "url"
    },
    {
      title: "Mis de l'avant",
      name: "highlighted",
      type: "boolean"
    },
    {
      name: "order",
      title: "Order d'affichage",
      type: "number"
    }
  ]
};
