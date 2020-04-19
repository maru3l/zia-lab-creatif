// vendors
import React, { useState } from "react"
import { css } from "@emotion/core"

const GridPicture = ({ picture, loaded, isLoader, onLoad = () => {} }) => {
  const handleLoad = () => {
    onLoad()
  }

  return (
    <div
      css={css`
        position: relative;
        flex: 1 1 50%;
        width: 50%;
        height: 50%;
      `}
    >
      <img
        src={picture.base64}
        alt=""
        css={css`
          position: absolute;
          display: block;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          will-change: opacity;
          transition: opacity 150ms;
        `}
        style={{ opacity: loaded ? 0 : 1 }}
      />

      {(loaded || isLoader) && (
        <picture
          onLoad={handleLoad}
          css={css`
            height: 100%;
            width: 100%;
            display: flex;
            overflow: hidden;

            * {
              object-fit: cover;
              object-position: ;
            }
          `}
        >
          <source
            sizes="(min-aspect-ratio: 1/1) 50vh, 50vw"
            srcSet={picture.srcSetWebp}
            type="image/webp"
          />

          <img
            src={picture.src}
            alt=""
            sizes="(min-aspect-ratio: 1/1) 50vh, 50vw"
            srcSet={picture.srcSet}
          />
        </picture>
      )}
    </div>
  )
}

const Grid = ({ picture }) => {
  const [loaded, setLoaded] = useState(true)

  const handleLoad = () => {
    setLoaded(true)
  }

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
      `}
    >
      <GridPicture picture={picture} isLoader onLoad={handleLoad} loaded />

      {loaded &&
        [...Array(3)].map((_, index) => (
          <GridPicture picture={picture} loaded key={index} />
        ))}
    </div>
  )
}

const FullScreen = ({ picture }) => (
  <div
    css={css`
      width: 100%;
      height: 100%;
    `}
  >
    <picture
      css={css`
        display: flex;
        overflow: hidden;

        * {
          object-fit: cover;
        }
      `}
    >
      <source
        sizes="(min-aspect-ratio: 1/1) 100vh, 100vw"
        srcSet={picture.srcSetWebp}
        type="image/webp"
      />

      <img
        src={picture.src}
        alt=""
        sizes="(min-aspect-ratio: 1/1) 100vh, 100vw"
        srcSet={picture.srcSet}
      />
    </picture>
  </div>
)

const components = {
  GRID: ({ picture }) => <Grid picture={picture} />,
  FULLSCREEN: ({ picture }) => <FullScreen picture={picture} />,
}

const PictureMontage = ({ picture, disposition = "FULLSCREEN", ...rest }) => {
  const Tag = components[disposition.toUpperCase()]

  return (
    <div {...rest}>
      <Tag picture={picture} />
    </div>
  )
}

export default PictureMontage
