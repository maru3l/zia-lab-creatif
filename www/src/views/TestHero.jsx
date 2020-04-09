// vendors
import React from "react"
import Canvas, { useCanvas } from "../components/Canvas/Canvas"

import img from "../images/pattern-kaleidoscope.png"

const Image = () => {
  const [loaded, setLoaded] = React.useState(false)
  const imgRef = React.createRef(null)
}

const KaleidoscopePart = ({ imgRef, width }) => {
  const context = useCanvas()

  if (context !== null && imgRef !== null) {
    context.fillStyle = context.createPattern(imgRef.current, "repeat")

    const TWO_PI = Math.PI * 2
    const HALF_PI = Math.PI / 2
    const slices = 20

    const radius = width / 2
    const step = TWO_PI / slices

    context.beginPath()
    context.moveTo(-0.5, -0.5)
    context.arc(0, 0, radius, step * -0.51, step * 0.51)
    context.lineTo(0.5, 0.5)
    context.closePath()
    context.fill()

    const { width: imgWidth } = this.imgRef.current
  }

  return null
}

const TestHero = () => {
  const imgRef = React.createRef(null)
  const width = 800
  return (
    <>
      <Canvas width={width} height={width} isAnimating={true} dpr={1}>
        <KaleidoscopePart imgRef={imgRef} width={width} />
      </Canvas>

      <img
        src={img}
        alt=""
        ref={imgRef}
        css={{ display: "none" }}
        role="presentation"
      />
    </>
  )
}

export default TestHero
