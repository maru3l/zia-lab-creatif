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
    this.onTicking = this.onTicking.bind(this)

    this.isTicking = false
    this.hasMouse = false
    this.tick = 0
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize)
    window.addEventListener("mousemove", this.onMouseMove)

    this.onResize()

    this.rAF = requestAnimationFrame(this.onTicking)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize)
    window.removeEventListener("mousemove", this.onMouseMove)
    cancelAnimationFrame(this.rAF)
  }

  onResize() {
    const { height, width } = this.myContainer.current.getBoundingClientRect()

    this.setState({ width: (height < width ? height : width) - 20 })
  }

  onMouseMove(e) {
    this.hasMouse = true
    this.positionX = e.pageX
    this.positionY = e.pageY
  }

  onTicking() {
    const { offsetRotation, offsetX, offsetY, width } = this.state

    if (!this.isTicking) {
      this.isTicking = true

      const positionX = this.hasMouse
        ? this.positionX
        : window.innerWidth - Math.sin(this.tick) * window.innerWidth

      const positionY = this.hasMouse
        ? this.positionY
        : window.innerHeight - Math.cos(this.tick * 2) * window.innerHeight

      const dx = positionX / window.innerWidth
      const dy = positionY / window.innerHeight

      const radius = 945 / 2

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

      this.tick += 0.01
      this.isTicking = false
    }
    this.rAF = requestAnimationFrame(this.onTicking)
  }

  render() {
    const { offsetX, offsetY, offsetRotation, width } = this.state

    return (
      <section
        ref={this.myContainer}
        css={{
          backgroundColor: colors.verdunGreen,
          maxHeight: `calc(100vh - 10px)`,
          height: "100vh",
          padding: `5px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          css={{
            margin: "auto",
            borderRadius: `100%`,
            overflow: "hidden",
            height: `${width - 2}px`,
            width: `${width - 2}px`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
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
        </div>
      </section>
    )
  }
}

export default Hero
