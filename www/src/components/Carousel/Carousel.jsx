// vendors
import React from "react"
import { css } from "@emotion/core"
import { useState, useCallback } from "react"

const useAnimationFrame = callback => {
  const requestRef = React.useRef()
  const previousTimeRef = React.useRef()

  const animate = useCallback(
    time => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        callback(deltaTime)
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    },
    [callback]
  )

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [animate]) // Make sure the effect runs only once
}

const Carousel = ({ pictures, ...rest }) => {
  const pictureList = [...pictures, ...pictures]
  const [translateX, setTranslateX] = useState(0)
  const [playing, setPlaying] = useState(true)
  const sliderRef = React.useRef()
  const containerRef = React.useRef()

  useAnimationFrame(deltaTime => {
    const containerRect = containerRef.current.getBoundingClientRect()
    const sliderRect = sliderRef.current.getBoundingClientRect()

    if (playing) {
      if (
        containerRect.left - sliderRect.left >
        sliderRef.current.scrollWidth / 2 - 0.00005
      ) {
        setTranslateX(0)
      } else {
        setTranslateX(prevCount => (prevCount + deltaTime * 0.00005) % 100)
      }
    }
  })

  const handleMouseEnter = () => {
    setPlaying(false)
  }
  const handleMouseLeave = () => {
    setPlaying(true)
  }

  return (
    <div
      ref={containerRef}
      css={css`
        overflow: hidden;
        height: 100%;
      `}
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={sliderRef}
        css={css`
          display: flex;
          height: ${(238 / 562) * 100}vh;
        `}
        style={{ transform: `translateX(${translateX * -100}%)` }}
      >
        {pictureList.map(picture => (
          <picture
            css={css`
              * {
                object-fit: contain;
                height: ${(238 / 562) * 100}vh;
                margin-right: 75px;
              }
            `}
          >
            <source sizes="" srcset={picture.srcSetWebp} type="image/webp" />

            <img
              src={picture.src}
              alt={picture.alt}
              sizes=""
              srcset={picture.srcSet}
            />
          </picture>
        ))}
      </div>
    </div>
  )
}

export default Carousel
