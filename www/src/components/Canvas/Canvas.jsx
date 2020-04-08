// vendors
import React, { useEffect, useState } from "react"

const CanvasContext = React.createContext(null)
const FrameContext = React.createContext(0)

const Canvas = ({ children, isAnimating, width, height, dpr }) => {
  const canvasRef = React.useRef(null)

  const actualWidth = width * dpr
  const actualHeight = height * dpr

  // the canvas' context is stored once it's created
  const [context, setContext] = useState(null)
  useEffect(() => {
    if (canvasRef.current !== null) {
      const context2d = canvasRef.current.getContext("2d")

      if (context2d !== null) {
        setContext(context2d)
      }
    }
  }, [canvasRef])

  // making the component and the context re-render at every frame
  const [frameCount, setFrameCount] = useState(0)
  React.useEffect(() => {
    let frameId
    if (isAnimating) {
      frameId = requestAnimationFrame(() => {
        setFrameCount(frameCount + 1)
      })
    }
    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [isAnimating, frameCount, setFrameCount])

  // whenever the canvas' dimensions change, it's automatically cleared
  // we need to re-draw all its children in this case */
  React.useLayoutEffect(() => {
    setFrameCount(Math.random())
  }, [width, height])

  // we need to clear the whole canvas before drawing the children
  if (context !== null) {
    context.clearRect(0, 0, actualWidth, actualHeight)
  }

  return (
    <CanvasContext.Provider value={context}>
      <FrameContext.Provider value={frameCount}>
        <canvas
          ref={canvasRef}
          height={actualHeight}
          width={actualWidth}
          style={{ width, height }}
        />
        {children}
      </FrameContext.Provider>
    </CanvasContext.Provider>
  )
}

export default Canvas

export const useCanvas = () => {
  React.useContext(FrameContext)
  const renderingContext = React.useContext(CanvasContext)
  return renderingContext
}

export const useAnimation = (initialValue, valueUpdater) => {
  const animatedValue = React.useRef(initialValue)
  animatedValue.current = valueUpdater(animatedValue.current)
  return animatedValue.current
}
