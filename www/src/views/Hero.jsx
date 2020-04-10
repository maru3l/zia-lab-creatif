// vendors
import React, { useRef, useEffect, useState, useCallback } from "react"

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
      radius: width / 2,
      slices: 20,
      zoom: 1.0,
      width,
    }

    this.HALF_PI = Math.PI / 2
    this.TWO_PI = Math.PI * 2

    this.domElement.width = width
    this.domElement.height = width
  }

  draw() {
    const { zoom, slices, radius, width } = this.options

    this.context.fillStyle = this.context.createPattern(this.img, "repeat")

    const scale = zoom * (radius / Math.min(this.img.width, this.img.height))
    const step = this.TWO_PI / slices
    const cx = this.img.width / 2

    this.context.clearRect(0, 0, width, width)

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

  setWidth(value) {
    this.options.width = value
  }
}

const Hero = () => {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const kaleidoscopeRef = useRef(null)
  const [imgLoaded, isImgLoaded] = useState(false)
  const tickingRef = useRef(false)
  const frameRef = useRef(0)
  const mouseCoordonatesRef = useRef(null)
  const coordonatesRef = useRef({ x: 0.0, y: 0.0 })
  const playingRef = useRef(true)

  const animate = useCallback(() => {
    if (kaleidoscopeRef.current !== null) {
      const {
        offsetX,
        offsetY,
        offsetRotation,
        radius,
      } = kaleidoscopeRef.current.options

      const { x, y } = coordonatesRef.current

      const dx = x / window.innerWidth
      const dy = y / window.innerHeight

      const hx = dx - 0.5
      const hy = dy - 0.5

      const tx = hx * radius * -2
      const ty = hy * radius * 2
      const tr = Math.atan2(hy, hx)

      const delta = tr - offsetRotation
      const theta = Math.atan2(Math.sin(delta), Math.cos(delta))

      const ease = 0.05

      kaleidoscopeRef.current.setOffsetX(offsetX + (tx - offsetX) * ease)
      kaleidoscopeRef.current.setOffsetY(offsetY + (ty - offsetY) * ease)
      kaleidoscopeRef.current.setOffsetRotation(
        offsetRotation + (theta - offsetRotation) * ease
      )

      kaleidoscopeRef.current.draw()
    }

    tickingRef.current = false

    if (mouseCoordonatesRef.current === null) {
      requestAnimationFrame(requestTick)
    }
  }, [requestTick])

  const getMouseCoordonates = useCallback(
    e => {
      mouseCoordonatesRef.current = { x: e.pageX, y: e.pageY }

      requestTick()
    },
    [requestTick]
  )

  const getCoordonates = useCallback(() => {
    if (mouseCoordonatesRef.current !== null) {
      coordonatesRef.current = mouseCoordonatesRef.current

      return
    }

    const frame = frameRef.current

    const randomX =
      window.innerWidth - Math.sin(frame * 0.03) * window.innerWidth
    const randomY =
      window.innerWidth - Math.cos(frame * 0.03) * window.innerWidth

    coordonatesRef.current = { x: randomX, y: randomY }
  }, [])

  const requestTick = useCallback(() => {
    if (!tickingRef.current && playingRef.current) {
      getCoordonates()

      requestAnimationFrame(animate)

      frameRef.current += 1 / 2
      tickingRef.current = true
    }
  }, [animate, getCoordonates])

  const handleResize = useCallback(() => {
    if (canvasRef !== null && kaleidoscopeRef !== null) {
      const width = Math.min(
        canvasRef.current.offsetHeight,
        canvasRef.current.offsetwidth
      )

      kaleidoscopeRef.current.setWidth(width)

      requestTick()
    }
  }, [requestTick])

  useEffect(() => {
    requestAnimationFrame(requestTick)
  }, [requestTick])

  useEffect(() => {
    window.addEventListener("mousemove", getMouseCoordonates, false)

    return () =>
      window.removeEventListener("mousemove", getMouseCoordonates, false)
  }, [getMouseCoordonates, requestTick])

  useEffect(() => {
    if (canvasRef !== null && imgRef !== null && imgLoaded) {
      const width = Math.min(
        canvasRef.current.offsetHeight,
        canvasRef.current.offsetwidth
      )

      kaleidoscopeRef.current = new Kaleidoscope(
        canvasRef.current,
        imgRef.current,
        width
      )
    }
  }, [canvasRef, imgRef, imgLoaded])

  useEffect(() => {
    if (canvasRef !== null) {
      const element = canvasRef.current

      element.getBoundingClientRect()

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          playingRef.current = entry.isIntersecting
        })
      })

      observer.observe(element)

      return () => {
        observer.disconnect(element)
      }
    }
  }, [canvasRef])

  useEffect(() => {
    window.addEventListener("resize", handleResize, false)

    return () => {
      window.removeEventListener("resize", handleResize, false)
    }
  }, [handleResize])

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
          height: calc(100vh - 10px);
          max-height: calc(100vw - 10px);
          width: calc(100vh - 10px);
          max-width: calc(100vw - 10px);
        `}
      >
        <canvas
          ref={canvasRef}
          css={css`
            display: block;
            width: 100%;
            height: 100%;
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
