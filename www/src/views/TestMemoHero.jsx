// vendors
import React, { useRef, useEffect, useState } from "react"

import img from "../images/pattern-kaleidoscope.png"
import { colors } from "../styles/variables"
import { css } from "@emotion/core"

class Kaleidoscope {
  constructor(domElement, img) {
    this.domElement = domElement
    this.context = domElement.getContext("2d")
    this.img = img

    const width = Math.min(
      this.domElement.offsetWidth,
      this.domElement.offsetHeight
    )

    this.options = {
      offsetRotation: 0.0,
      offsetScale: 1.0,
      offsetX: 0.0,
      offsetY: 0.0,
      // radius: 260,
      radius: width / 2,
      slices: 20,
      zoom: 1.0,
    }

    this.HALF_PI = Math.PI / 2
    this.TWO_PI = Math.PI * 2

    // this.domElement.width = width;
    // this.domElement.height = width;
  }

  draw() {
    const { zoom, slices, radius } = this.options

    this.context.fillStyle = this.context.createPattern(this.img, "repeat")

    const scale = zoom * (radius / Math.min(this.img.width, this.img.height))
    const step = this.TWO_PI / slices
    const cx = this.img.width / 2

    // this.context.clearRect(0, 0, this.domElement.offsetWidth, this.domElement.offsetHeight);

    for (let i = 0; i < slices; i++) {
      this.context.save()
      this.context.translate(radius, radius)
      this.context.rotate(i * step)

      this.context.beginPath()
      this.context.moveTo(-0.5, -0.5)
      this.context.arc(0, 0, radius, step * -0.51, step * 0.51)
      this.context.lineTo(0.5, 0.5)
      this.context.closePath()

      this.context.rotate(this.HALF_PI)
      this.context.scale(scale, scale)
      this.context.scale([-1, 1][i % 2], 1)
      this.context.translate(this.options.offsetX - cx, this.options.offsetY)
      this.context.rotate(this.options.offsetRotation)
      this.context.scale(this.options.offsetScale, this.options.offsetScale)

      this.context.fill()
      this.context.restore()
    }
  }

  setOptions(options) {
    this.options = { ...this.options, ...options }
  }

  setOffsetX(value) {
    this.options.offsetX = value
  }

  setOffsetY(value) {
    this.options.offsetY = value
  }

  setOffsetRotation(value) {
    this.options.offsetRotation = value
  }
}

const Hero = () => {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const kaleidoscopeRef = useRef(null)
  const frameCountRef = useRef(0)
  const [imgLoaded, isImgLoaded] = useState(false)

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate)
      const frame = frameCountRef.current

      const {
        offsetX,
        offsetY,
        offsetRotation,
        radius,
      } = kaleidoscopeRef.current.options

      const positionX =
        window.innerWidth - Math.sin(frame * 0.01) * window.innerWidth
      const positionY =
        window.innerHeight - Math.cos(frame * 0.01) * window.innerHeight

      const dx = positionX / window.innerWidth
      const dy = positionY / window.innerHeight

      const hx = dx - 0.5
      const hy = dy - 0.5

      const tx = hx * radius * -2
      const ty = hy * radius * 2
      const tr = Math.atan2(hy, hx)

      const delta = tr - offsetRotation
      const theta = Math.atan2(Math.sin(delta), Math.cos(delta))

      const ease = 0.1

      kaleidoscopeRef.current.setOffsetX(offsetX + (tx - offsetX) * ease)
      kaleidoscopeRef.current.setOffsetY(offsetY + (ty - offsetY) * ease)
      kaleidoscopeRef.current.setOffsetRotation(
        offsetRotation + (theta - offsetRotation) * ease
      )

      kaleidoscopeRef.current.draw()

      frameCountRef.current = frame + 1
    }

    if (canvasRef !== null && imgRef !== null && imgLoaded) {
      kaleidoscopeRef.current = new Kaleidoscope(
        canvasRef.current,
        imgRef.current
      )

      animate()
    }
  }, [canvasRef, imgLoaded])

  const handleLoaded = e => {
    isImgLoaded(true)
  }

  return (
    <section
      css={css`
        background-color: ${colors.verdunGreen};
        max-height: calc(100vh - 10px);
        height: 100vh;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          margin: auto;
          border-radius: 100%;
          overflow: hidden;
          /* border: 1px solid tomato; */
          height: calc(100vh - 10px);
          max-height: calc(100vw - 10px);
          width: calc(100vh - 10px);
          max-width: calc(100vw - 10px);
        `}
      >
        <canvas
          ref={canvasRef}
          width="849"
          height="849"
          css={css`
            display: block;
            /* width: 100%; */
            /* height: 100%; */
            /* border: 1px solid black; */
          `}
        />
      </div>

      <img
        src={img}
        ref={imgRef}
        role="presentation"
        style={{ display: "none" }}
        onLoad={handleLoaded}
        alt=""
      />
    </section>
  )
}

export default React.memo(Hero)
