// vendors
import React from "react"
import { css } from "@emotion/core"

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
import VectorInverseStar from "../images/VectorInverseStar"
import { colors } from "../styles/variables"

const IndexPage = () => (
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

    <picture
      css={css`
        line-height: 0;
        width: 100vw;
        height: 100vw;
        display: block;

        > * {
          object-fit: cover;
        }
      `}
    >
      <source
        sizes="100vw"
        srcset="
          /images/bg-mandats_qo3wfk_c_scale,w_320.webp 320w,
          /images/bg-mandats_qo3wfk_c_scale,w_1661.webp 1661w,
          /images/bg-mandats_qo3wfk_c_scale,w_2170.webp 2170w,
          /images/bg-mandats_qo3wfk_c_scale,w_2511.webp 2511w,
          /images/bg-mandats_qo3wfk_c_scale,w_2854.webp 2854w,
          /images/bg-mandats_qo3wfk_c_scale,w_3102.webp 3102w,
          /images/bg-mandats_qo3wfk_c_scale,w_3342.webp 3342w,
          /images/bg-mandats_qo3wfk_c_scale,w_3576.webp 3576w,
          /images/bg-mandats_qo3wfk_c_scale,w_3810.webp 3810w,
          /images/bg-mandats_qo3wfk_c_scale,w_4027.webp 4027w,
          /images/bg-mandats_qo3wfk_c_scale,w_4240.webp 4240w,
          /images/bg-mandats_qo3wfk_c_scale,w_4446.webp 4446w,
          /images/bg-mandats_qo3wfk_c_scale,w_4639.webp 4639w,
          /images/bg-mandats_qo3wfk_c_scale,w_4850.webp 4850w,
          /images/bg-mandats_qo3wfk_c_scale,w_5039.webp 5039w,
          /images/bg-mandats_qo3wfk_c_scale,w_5109.webp 5109w,
          /images/bg-mandats_qo3wfk_c_scale,w_5120.webp 5120w"
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
    </picture>

    <Mandats />

    <div
      css={css`
        position: relative;
      `}
    >
      <VectorInverseStar
        css={css`
          position: absolute;
          top: ${(108 / 568) * 100}vw;
        `}
      />
      <VectorInverseStar
        css={css`
          position: absolute;
          bottom: ${(108 / 568) * 100}vw;
        `}
        color={colors.doublePearlLusta}
      />
      <picture
        css={css`
          line-height: 0;
          width: 100vw;
          height: ${(1168 / 593) * 100}vw;
          display: block;

          > * {
            object-fit: cover;
          }
        `}
      >
        <source
          sizes="100vw"
          srcset="
        /images/bg-organisation,w_256.webp 256w,
        /images/bg-organisation,w_640.webp 640w,
        /images/bg-organisation,w_844.webp 844w,
        /images/bg-organisation,w_1280.webp 1280w,
        /images/bg-organisation,w_1920.webp 1920w,
        /images/bg-organisation,w_2560.webp 2560w,
        /images/bg-organisation,w_3200.webp 3200w,
        /images/bg-organisation,w_3840.webp 3840w,
        /images/bg-organisation,w_5120.webp 5120w
        "
          type="image/webp"
        />

        <img
          src="/images/bg-organisation,w_5120.jpg"
          alt=""
          role="presentation"
          sizes="100vw"
          srcset="
        /images/bg-organisation,w_256.jpg 256w,
        /images/bg-organisation,w_640.jpg 640w,
        /images/bg-organisation,w_844.jpg 844w,
        /images/bg-organisation,w_1280.jpg 1280w,
        /images/bg-organisation,w_1920.jpg 1920w,
        /images/bg-organisation,w_2560.jpg 2560w,
        /images/bg-organisation,w_3200.jpg 3200w,
        /images/bg-organisation,w_3840.jpg 3840w,
        /images/bg-organisation,w_5120.jpg 5120w
        "
        />
      </picture>
    </div>

    <Board />

    <FooterView />
  </Layout>
)

export default IndexPage
