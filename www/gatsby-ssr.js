/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="1"
      rel="preload"
      href="/assets/fonts/Raleway/Raleway-Bold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="true"
    />,
    <link
      key="2"
      rel="preload"
      href="/assets/fonts/Raleway/Raleway-ExtraBold.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="true"
    />,
    <link
      key="3"
      rel="preload"
      href="/assets/fonts/Raleway/Raleway-Medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="true"
    />,
    <link
      key="4"
      rel="preload"
      href="/assets/fonts/Source_Serif_Pro/WOFF2/TTF/SourceSerifPro-Bold.ttf.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="true"
    />,
    <link key="5" href="/assets/fonts/Raleway/Raleway.css" rel="stylesheet" />,
    <link
      key="6"
      href="/assets/fonts/Source_Serif_Pro/source-serif-pro.css"
      rel="stylesheet"
    />,
  ])
}
