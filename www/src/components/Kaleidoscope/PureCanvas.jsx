// vendors
import React, { PureComponent } from "react"

import img from "../../images/pattern-kaleidoscope.png"

class PureCanvas extends PureComponent {
  render() {
    const { contextRef, imgRef, width, ...props } = this.props

    return (
      <>
        <img
          ref={node => (node ? imgRef(node) : null)}
          src={img}
          css={{ display: "none" }}
          alt=""
        />

        <canvas
          width={width}
          height={width}
          ref={node => (node ? contextRef(node.getContext("2d")) : null)}
          {...props}
        />
      </>
    )
  }
}

export default PureCanvas
