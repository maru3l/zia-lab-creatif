// vendors
import React, { useState, useCallback, useEffect, useRef } from "react"
import { css } from "@emotion/core"

const Slide = ({ picture }) => {
  const [loaded, setLoaded] = useState(false)

  const sizes = `${(238 / 562) * 100 * picture.aspectRatio}vh`

  const handleLoad = e => {
    setLoaded(true)
  }

  return (
    <div
      css={css`
        position: relative;
        margin-right: 75px;
        height: ${(238 / 562) * 100}vh;
        width: ${sizes};
      `}
    >
      <img
        src={picture.base64}
        css={css`
          position: absolute;
          height: ${(238 / 562) * 100}vh;
          width: ${sizes};
          top: 0;
          left: 0;
          z-index: 2;
          will-change: opacity;
          transition: opacity 150ms;
        `}
        role="presentation"
        alt=""
        style={{ opacity: loaded ? 0 : 1 }}
      />

      <picture
        onLoad={handleLoad}
        css={css`
          position: relative;
          z-index: 1;

          * {
            object-fit: contain;
            height: ${(238 / 562) * 100}vh;
            width: ${sizes};
          }
        `}
      >
        <source sizes={sizes} srcset={picture.srcSetWebp} type="image/webp" />

        <img
          src={picture.src}
          alt={picture.alt}
          sizes={sizes}
          srcset={picture.srcSet}
        />
      </picture>
    </div>
  )
}

const Carousel = ({ pictures, ...rest }) => {
  const pictureList = [...pictures, ...pictures]
  const [translateX, setTranslateX] = useState(0)
  const playing = useRef(true)
  const containerRef = useRef(null)
  const sliderRef = useRef(null)
  const frameRef = useRef(0)
  const RAFRef = useRef(null)

  const animate = useCallback(() => {
    const frame = frameRef.current
    const ease = 0.001

    if (RAFRef !== null && containerRef !== null && sliderRef !== null) {
      RAFRef.current = requestAnimationFrame(animate)
      frameRef.current = frame + 1

      if (!playing.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const sliderRect = sliderRef.current.getBoundingClientRect()

      if (
        containerRect.left - sliderRect.left >
        sliderRef.current.scrollWidth / 2 - ease * 1
      ) {
        setTranslateX(0)

        return
      }

      setTranslateX(prevCount => (prevCount + 1 * ease) % 100)
    }
  }, [])

  useEffect(() => {
    RAFRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(RAFRef.current)
  }, [animate])

  useEffect(() => {
    const element = containerRef.current
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        playing.current = entry.isIntersecting
      })
    })

    observer.observe(element)

    return () => {
      observer.disconnect(element)
    }
  }, [containerRef])

  const handleMouseEnter = () => {
    playing.current = false
  }
  const handleMouseLeave = () => {
    playing.current = true
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
          will-change: transform;
        `}
        style={{ transform: `translateX(${translateX * -100}%)` }}
      >
        {pictureList.map(picture => (
          <Slide picture={picture} />
        ))}
      </div>
    </div>
  )
}

export default Carousel
