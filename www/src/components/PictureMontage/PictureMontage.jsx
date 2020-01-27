// vendors
import React from "react"
import { css } from "@emotion/core"

const Grid = ({ picture }) => (
  <div
    css={css`
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    `}
  >
    {[...Array(4)].map(() => (
      <picture
        css={css`
          display: flex;
          overflow: hidden;

          * {
            object-fit: cover;
          }
        `}
      >
        <source sizes="50vh" srcset={picture.srcSetWebp} type="image/webp" />

        <img src={picture.src} alt="" sizes="50vh" srcset={picture.srcSet} />
      </picture>
    ))}
  </div>
)

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
      <source sizes="100vh" srcset={picture.srcSetWebp} type="image/webp" />

      <img src={picture.src} alt="" sizes="100vh" srcset={picture.srcSet} />
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
