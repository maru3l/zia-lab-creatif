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
      href="/fonts/SuisseIntl/SuisseIntl-Medium.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="true"
    />,
    <link key="2" href="/fonts/SuisseIntl/SuisseIntl.css" rel="stylesheet" />,
  ])
}
