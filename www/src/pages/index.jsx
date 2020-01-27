// vendors
import React from "react"
import Image from "gatsby-image"
import { graphql } from "gatsby"

// components
import Layout from "../components/Layout"
import SEO from "../components/seo"

// views
import Home from "../views/Home"
import Mission from "../views/Mission"
import Mandats from "../views/Mandats"
import Board from "../views/Board"
import FooterView from "../views/footer"
import Hero from "../views/Hero"
import Project from "../views/Project"
import FeaturedProject from "../views/FeaturedProject"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO
      keywords={[
        "Zia Lab créatif",
        "compagnie de création et production à Québec",
        "danse contemporaine au Québec",
        "création danse musique à Québec",
        "spectacles danse musique à Québec",
        "musique électronique au Québec",
        "arts multi au Québec",
        "Pascal Asselin",
        "Millimetrik",
        "Geneviève Duong",
        "Geneviève Pascal",
      ]}
    />

    <Hero />

    <Home />

    <Mission />

    <FeaturedProject />

    <Image
      fluid={{ ...data.bgMandats.childImageSharp.fluid, sizes: "100vw" }}
    />

    <Mandats />

    <Image
      fluid={{ ...data.bgProjects.childImageSharp.fluid, sizes: "100vw" }}
    />

    <Project />

    <Image
      fluid={{ ...data.bgOrganisation.childImageSharp.fluid, sizes: "100vw" }}
    />

    <Board />

    <FooterView />
  </Layout>
)

export default IndexPage

export const query = graphql`
  query IndexPage {
    bgMandats: file(name: { eq: "bg-mandats" }) {
      childImageSharp {
        fluid(maxWidth: 2560) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    bgOrganisation: file(name: { eq: "bg-organisation" }) {
      childImageSharp {
        fluid(maxWidth: 2560) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
    bgProjects: file(name: { eq: "bg-projects" }) {
      childImageSharp {
        fluid(maxWidth: 2560) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
        }
      }
    }
  }
`
