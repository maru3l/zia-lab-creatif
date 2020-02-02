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
import Team from "../views/Team"
import FooterView from "../views/footer"
import Hero from "../views/Hero"

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

    <Image
      fluid={{ ...data.bgMandats.childImageSharp.fluid, sizes: "100vw" }}
    />

    <Mandats />

    <Image
      fluid={{ ...data.bgOrganisation.childImageSharp.fluid, sizes: "100vw" }}
    />

    <Team />

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
  }
`
