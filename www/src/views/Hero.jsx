// vendors
import React, { Component } from "react"

import Canvas from "../components/Kaleidoscope/Canvas"

import { colors } from "../styles/variables"

class Hero extends Component {
  constructor(props) {
    super(props)

    this.myContainer = React.createRef()

    this.state = { offsetX: 0.0, offsetY: 0.0, offsetRotation: 0.0 }

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onResize = this.onResize.bind(this)
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize)

    this.onResize()
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize)
  }

  onResize() {
    const { height, width } = this.myContainer.current.getBoundingClientRect()

    this.setState({ width: (height < width ? height : width) - 20 })
  }

  onMouseMove(e) {
    const { offsetRotation, offsetX, offsetY, width } = this.state

    const radius = 945 / 2

    const dx = e.pageX / window.innerWidth
    const dy = e.pageY / window.innerHeight

    const hx = dx - 0.5
    const hy = dy - 0.5

    const tx = hx * radius * -2
    const ty = hy * radius * 2
    const tr = Math.atan2(hy, hx)

    const delta = tr - offsetRotation
    const theta = Math.atan2(Math.sin(delta), Math.cos(delta))

    const ease = 0.1

    this.setState({
      offsetX: offsetX + (tx - offsetX) * ease,
      offsetY: offsetY + (ty - offsetY) * ease,
      offsetRotation: offsetRotation + (theta - offsetRotation) * ease,
      width,
    })
  }

  render() {
    const { offsetX, offsetY, offsetRotation, width } = this.state

    return (
      <section
        ref={this.myContainer}
        css={{
          backgroundColor: colors.verdunGreen,
          maxHeight: `calc(100vh - 20px)`,
          height: "100vh",
          padding: `10px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onMouseMove={this.onMouseMove}
      >
        <Canvas
          offsetX={offsetX}
          offsetY={offsetY}
          offsetRotation={offsetRotation}
          width={width}
          css={{
            display: "block",
            margin: "auto",
          }}
        />
      </section>
    )
  }
}

export default Hero
