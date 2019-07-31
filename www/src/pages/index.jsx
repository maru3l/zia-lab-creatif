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
        fluid(maxWidth: 5120, quality: 100) {
          src
          srcSet
          srcSetWebp
        }
      }
    }
    bgOrganisation: file(name: { eq: "bg-organisation" }) {
      childImageSharp {
        fluid(maxWidth: 5120, quality: 100) {
          src
          srcSet
          srcSetWebp
        }
      }
    }
  }
`

{
  /* <picture>
      <source
        sizes="100vw"
        srcSet={data.bgOrganisation.childImageSharp.fluid.srcSetWebp}
        type="image/webp"
      />

      <img
        sizes="100vw"
        srcset="
        /images/bg-mandats_qvp8kl_c_scale,w_320.jpg 320w,
        /images/bg-mandats_qvp8kl_c_scale,w_1128.jpg 1128w,
        /images/bg-mandats_qvp8kl_c_scale,w_1467.jpg 1467w,
        /images/bg-mandats_qvp8kl_c_scale,w_1752.jpg 1752w,
        /images/bg-mandats_qvp8kl_c_scale,w_1980.jpg 1980w,
        /images/bg-mandats_qvp8kl_c_scale,w_2176.jpg 2176w,
        /images/bg-mandats_qvp8kl_c_scale,w_2361.jpg 2361w,
        /images/bg-mandats_qvp8kl_c_scale,w_2539.jpg 2539w,
        /images/bg-mandats_qvp8kl_c_scale,w_2702.jpg 2702w,
        /images/bg-mandats_qvp8kl_c_scale,w_2857.jpg 2857w,
        /images/bg-mandats_qvp8kl_c_scale,w_3005.jpg 3005w,
        /images/bg-mandats_qvp8kl_c_scale,w_3149.jpg 3149w,
        /images/bg-mandats_qvp8kl_c_scale,w_3288.jpg 3288w,
        /images/bg-mandats_qvp8kl_c_scale,w_3423.jpg 3423w,
        /images/bg-mandats_qvp8kl_c_scale,w_3554.jpg 3554w,
        /images/bg-mandats_qvp8kl_c_scale,w_3678.jpg 3678w,
        /images/bg-mandats_qvp8kl_c_scale,w_3820.jpg 3820w,
        /images/bg-mandats_qvp8kl_c_scale,w_5120.jpg 5120w"
        src="/images/bg-mandats_qvp8kl_c_scale,w_5120.jpg"
        alt=""
        role="presentation"
      />
    </picture> */
}
