// vendors
import React from "react"
import PropTypes from "prop-types"
import { Global } from "@emotion/core"

// styles
import "normalize.css"
import globalStyle from "../../styles/global"

const Layout = ({ children }) => (
  <>
    <Global styles={globalStyle} />

    <div>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
