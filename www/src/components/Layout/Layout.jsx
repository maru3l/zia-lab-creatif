// vendors
import React from "react"
import PropTypes from "prop-types"
import { Global } from "@emotion/core"

// styles
import "normalize.css"
import globalStyle from "../../styles/global"

import Navigation from "../Navigation"

const Layout = ({ children }) => (
  <>
    <Global styles={globalStyle} />

    <Navigation />

    <div>
      <main>{children}</main>
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
