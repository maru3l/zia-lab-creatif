// vendors
import React, { Component } from "react"
import { css } from "@emotion/core"

import { breakpoints } from "../../styles/variables"

class Panel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
    }

    this.myRef = React.createRef()

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    const { onShowInviewport, backgroundColor, color, starColor } = this.props
    const { isVisible } = this.state

    const { top, height } = this.myRef.current.getBoundingClientRect()

    const { innerHeight } = window

    if (top - innerHeight / (4 / 3) < 0) {
      if (!isVisible) this.setState({ isVisible: true })

      onShowInviewport({ backgroundColor, color, starColor })
    }

    if (
      top - innerHeight / (4 / 3) < 0 &&
      top + height - innerHeight / (4 / 3) > 0
    ) {
      onShowInviewport({ backgroundColor, color, starColor })
    }
  }

  render() {
    const { children } = this.props
    const { isVisible } = this.state

    return (
      <div
        ref={this.myRef}
        css={css`
          font-size: 1em;
          letter-spacing: ${-7 / 1000}em;
          padding: 40px;
          grid-column-start: 2;
          grid-column-end: span 1;
          min-height: calc(100vh - 80px);
          opacity: ${isVisible ? "1" : "0"};
          transition: opacity 450ms ease-out;
          z-index: 1;

          ${breakpoints.mediaQueries.ratio11} {
            padding-left: 0;
          }
        `}
      >
        {children}
      </div>
    )
  }
}

Panel.defaultProps = {
  onShowInviewport: () => {},
}

export default Panel
