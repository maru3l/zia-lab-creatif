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

    <picture>
      <source
        sizes="100vw"
        srcSet={data.bgMandats.childImageSharp.fluid.srcSetWebp}
        type="image/webp"
      />

      <img
        src={data.bgMandats.childImageSharp.fluid.src}
        alt=""
        role="presentation"
        sizes="100vw"
        srcset={data.bgMandats.childImageSharp.fluid.srcSet}
      />
    </picture>

    <Mandats />

    <picture>
      <source
        sizes="100vw"
        srcSet={data.bgOrganisation.childImageSharp.fluid.srcSetWebp}
        type="image/webp"
      />

      <img
        src={data.bgOrganisation.childImageSharp.fluid.src}
        alt=""
        role="presentation"
        sizes="100vw"
        srcset={data.bgOrganisation.childImageSharp.fluid.srcSet}
      />
    </picture>

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
          src
          srcSet
          srcSetWebp
        }
      }
    }
    bgOrganisation: file(name: { eq: "bg-organisation" }) {
      childImageSharp {
        fluid(maxWidth: 2560) {
          src
          srcSet
          srcSetWebp
        }
      }
    }
  }
`
