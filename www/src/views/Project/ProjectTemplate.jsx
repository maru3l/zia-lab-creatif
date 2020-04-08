// vendors
import React, { useLayoutEffect, useEffect, useState } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { fluidRange, transparentize } from "polished"
import { RemoveScroll } from "react-remove-scroll"

import { breakpoints, transition, zIndices } from "../../styles/variables"
import PictureMontage from "../../components/PictureMontage/PictureMontage"
import BaseBlockContent from "@sanity/block-content-to-react"
import Carousel from "../../components/Carousel/Carousel"
import Button from "../../components/Button/Button"
import IconPlay from "../../images/IconPlay"

const Wrapper = styled.div`
  width: 100vh;
  max-width: 100vw;
  margin: auto;
  min-height: 100vh;
`

const ProjectTemplate = ({
  onInViewport,
  onOutViewport,
  project,
  backgroundColor,
  textColor,
}) => {
  const intersectionRef = React.useRef()
  const sliderRef = React.useRef()
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
    sliderRef.current.scrollLeft = 0
    setOpen(!open)
  }

  const handleWheel = e => {
    const query = window.matchMedia(breakpoints.mediaQueries.ratio11)

    if (query.matches) {
      sliderRef.current.scrollLeft = e.deltaY + sliderRef.current.scrollLeft
    }
  }

  return (
    <article
      ref={intersectionRef}
      css={css`
        position: relative;
        color: ${textColor};
        background-color: ${transparentize(1, backgroundColor)};
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
            transform: rotate(-90deg);
            ${fluidRange(
              {
                prop: "font-size",
                fromSize: `${31 / 10}rem`,
                toSize: `${38 / 10}rem`,
              },
              "320px",
              "768px"
            )};

            ${breakpoints.mediaQueries.ratio11} {
              max-width: ${300 / 38}em;
            }

            ${open &&
              css`
                opacity: 0;
                pointer-events: none;
              `}
          `}
        >
          <Button onClick={handleClick} fitWithBgColor>
            {project.title}
          </Button>
        </h3>
      </Wrapper>

      <RemoveScroll enabled={open}>
        <section
          onWheel={handleWheel}
          ref={sliderRef}
          css={css`
            position: fixed;
            z-index: ${zIndices.modal};
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: ${backgroundColor};
            overflow: auto;
            transition: opacity ${transition.speed.slow}
              ${transition.curve.default};

            ${breakpoints.mediaQueries.ratio11} {
              overflow-y: hidden;
            }

            ${!open &&
              css`
                opacity: 0;
                pointer-events: none;
              `}
          `}
        >
          <div
            css={css`
              ${breakpoints.mediaQueries.ratio11} {
                display: flex;
                width: ${project.videoUrl ? "450" : "350"}vh;
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
                  margin: ${(68 / 568) * 100}vh ${(40 / 360) * 100}vw;

                  ${breakpoints.mediaQueries.ratio11} {
                    margin: ${(68 / 568) * 100}vh ${(138 / 568) * 100}vh;
                    columns: 2;
                    grid-column-gap: ${(30 / 568) * 100}vh;
                  }
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
                <a
                  css={css`
                    appearance: none;
                    background-color: inherit;
                    border: none;
                    width: ${(80 / 560) * 100}vh;
                    cursor: pointer;
                  `}
                  href={project.videoUrl}
                >
                  <IconPlay
                    css={css`
                      fill: ${textColor};
                    `}
                  />
                </a>
              </Wrapper>
            )}

            <div
              css={css`
                width: 50vh;
                max-width: 100vw;
                margin: auto;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
            >
              <div
                css={css`
                  transform: rotate(-90deg);
                `}
              >
                <Button onClick={handleClick} fitWithBgColor>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </section>
      </RemoveScroll>
    </article>
  )
}

ProjectTemplate.defaultProps = {
  onInViewport: () => {},
  onOutViewport: () => {},
}

export default ProjectTemplate
