// vendors
import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { useLayoutEffect } from "react"
import { fluidRange } from "polished"
import { useState } from "react"
import { breakpoints, transition } from "../../styles/variables"
import PictureMontage from "../../components/PictureMontage/PictureMontage"
import BaseBlockContent from "@sanity/block-content-to-react"
import Carousel from "../../components/Carousel/Carousel"

const Wrapper = styled.div`
  width: 100vh;
  max-width: 100vw;
  margin: auto;
  min-height: 100vh;
`

const ProjectTemplate = ({ onInViewport, onOutViewport, project }) => {
  const intersectionRef = React.useRef()
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    const intersectionElement = intersectionRef.current
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(item => {
          if (item.isIntersecting && item.intersectionRatio > 0.55) {
            onInViewport()
          }
          if (item.isIntersecting && item.intersectionRatio <= 0.55) {
            onOutViewport()
          }
        })
      },
      {
        threshold: [0, 0.5, 0.55, 1],
      }
    )

    observer.observe(intersectionElement)

    return () => {
      observer.disconnect(intersectionElement)
    }
  }, [intersectionRef, onInViewport, onOutViewport])

  const handleClick = () => {
    setOpen(true)
  }

  return (
    <article
      ref={intersectionRef}
      css={css`
        position: relative;
      `}
    >
      <Wrapper
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1em;
        `}
      >
        <h3
          css={css`
            text-align: center;
            font-size: ${38 / 10}em;
            letter-spacing: ${59 / 1000}em;
            margin: 0;
            writing-mode: sideways-lr;
            max-height: ${300 / 38}em;
            ${fluidRange(
              {
                prop: "font-size",
                fromSize: `${31 / 10}rem`,
                toSize: `${38 / 10}rem`,
              },
              "320px",
              "768px"
            )};

            ${open &&
              css`
                opacity: 0;
                pointer-events: none;
              `}
          `}
        >
          <button
            type="button"
            onClick={handleClick}
            css={css`
              appearance: none;
              border: none;
              margin: 0;
              background: none;
              padding: 0;
              color: inherit;
              font-family: inherit;
              font-weight: inherit;
              display: block;
              cursor: pointer;
            `}
          >
            {project.title}
          </button>
        </h3>
      </Wrapper>

      <section
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: hidden;
          transition: opacity ${transition.speed.slow}
            ${transition.curve.default};

          ${!open &&
            css`
              opacity: 0;
              pointer-events: none;
            `}
        `}
      >
        <div
          css={css`
            display: flex;
            width: ${project.videoUrl ? "400" : "300"}vw;

            ${breakpoints.mediaQueries.ratio11} {
              width: ${project.videoUrl ? "400" : "300"}vh;
              padding: 0 calc(50vw - 50vh);
            }
          `}
        >
          <Wrapper
            css={css`
              display: flex;
              filter: grayscale();
            `}
          >
            <PictureMontage
              picture={{
                ...project.featureImage.image.asset.fluid,
              }}
              disposition={project.featureImage.disposition}
              css={css`
                height: 100vh;
              `}
            />
          </Wrapper>

          <Wrapper>
            <div
              css={css`
                margin: ${(68 / 568) * 100}vh ${(138 / 568) * 100}vh;
                columns: 2;
                grid-column-gap: ${(30 / 568) * 100}vh;
              `}
            >
              <BaseBlockContent blocks={project._rawDescription} />
            </div>
          </Wrapper>

          <Wrapper
            css={css`
              display: flex;
              height: 100%;
              align-items: center;
            `}
          >
            <Carousel
              pictures={project.gallery.map(picture => ({
                src: picture.asset.fluid.src,
                srcSet: picture.asset.fluid.srcSet,
                srcSetWebp: picture.asset.fluid.srcSetWebp,
                alt: picture.alt,
              }))}
              css={css`
                filter: grayscale();
                /* mix-blend-mode: multiply; */
              `}
            />
          </Wrapper>

          {project.videoUrl && (
            <Wrapper
              css={css`
                border: 1px solid black;
              `}
            >
              Vidéo
            </Wrapper>
          )}
        </div>
      </section>
    </article>
  )
}

ProjectTemplate.defaultProps = {
  onInViewport: () => {},
  onOutViewport: () => {},
}

export default ProjectTemplate
