// vendors
import React, { Component } from "react"

import PureCanvas from "./PureCanvas"

class Canvas extends Component {
  constructor(props) {
    super(props)

    this.saveContext = this.saveContext.bind(this)
    this.saveImg = this.saveImg.bind(this)
  }

  componentDidUpdate() {
    const { offsetX, offsetY, offsetRotation, width } = this.props

    if (!this.img) return

    this.ctx.fillStyle = this.ctx.createPattern(this.img, "repeat")

    const { width: imgWidth } = this.img
    const TWO_PI = Math.PI * 2
    const HALF_PI = Math.PI / 2
    const slices = 20

    const radius = width / 2
    const scale = 1.0 * (radius / imgWidth)
    const step = TWO_PI / slices
    const cx = imgWidth / 2

    for (let index = 0; index < slices; index++) {
      this.ctx.save()
      this.ctx.translate(radius, radius)
      this.ctx.rotate(index * step)

      this.ctx.beginPath()
      this.ctx.moveTo(-0.5, -0.5)
      this.ctx.arc(0, 0, radius, step * -0.51, step * 0.51)
      this.ctx.lineTo(0.5, 0.5)
      this.ctx.closePath()

      this.ctx.rotate(HALF_PI)
      this.ctx.scale(scale, scale)
      this.ctx.scale([-1, 1][index % 2], 1)
      this.ctx.translate(offsetX - cx, offsetY)
      this.ctx.rotate(offsetRotation)
      this.ctx.scale(1, 1)

      this.ctx.fill()
      this.ctx.restore()
    }
  }

  saveContext(ctx) {
    this.ctx = ctx
  }

  saveImg(img) {
    this.img = img

    this.forceUpdate()
  }

  render() {
    const { width, css } = this.props

    return (
      <PureCanvas
        imgRef={this.saveImg}
        contextRef={this.saveContext}
        width={width}
        {...css}
      />
    )
  }
}

export default Canvas
