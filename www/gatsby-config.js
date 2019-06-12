require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: "Gatsby Default Starter",
    description:
      "Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",
    author: "@maru3l",
    siteUrl: "https://www.example.com",
  },
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-subfont",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: process.env.MY_SANITY_PROJECT_ID,
        dataset: process.env.MY_SANITY_DATASET,
        token: process.env.MY_SANITY_TOKEN,
        overlayDrafts: false,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-transformer-yaml",
  ],
}
