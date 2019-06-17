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
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <Hero />

    <Home />

    <Mission />

    <Mandats />

    <Board />

    <FooterView />
  </Layout>
)

export default IndexPage

// export const query = graphql`
//   query IndexPage {
//     bgMandats: file(name: { eq: "bg-mandats" }) {
//       childImageSharp {
//         fluid(maxWidth: 2560) {
//           ...GatsbyImageSharpFluid_withWebp_noBase64
//         }
//       }
//     }
//     bgOrganisation: file(name: { eq: "bg-organisation" }) {
//       childImageSharp {
//         fluid(maxWidth: 2560) {
//           ...GatsbyImageSharpFluid_withWebp_noBase64
//         }
//       }
//     }
//   }
// `

{
  /* <Image fluid={data.bgMandats.childImageSharp.fluid} />
    <Image fluid={data.bgOrganisation.childImageSharp.fluid} /> */
}
