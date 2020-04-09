// vendors
import React, { useRef, useCallback, useEffect } from "react"
import { RemoveScroll } from "react-remove-scroll"
import { css } from "@emotion/core"
import BaseBlockContent from "@sanity/block-content-to-react"

import Wrapper from "./shared/Wrapper"

import { breakpoints, transition, zIndices } from "../../../styles/variables"
import PictureMontage from "../../../components/PictureMontage/PictureMontage"
import Carousel from "../../../components/Carousel/Carousel"
import Button from "../../../components/Button/Button"
import IconPlay from "../../../images/IconPlay"

const ProjectModal = ({ project, onClose, colorSet }) => {
  const sliderRef = useRef(null)
  const tickingRef = useRef(false)
  const wheelHandleRef = useRef(null)

  const handleResize = useCallback(() => {
    const query = window.matchMedia(
      "(min-aspect-ratio: 1/1) and (min-height: 768px)"
    )

    wheelHandleRef.current = query.matches
  }, [])

  const requestTick = useCallback(
    e => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => animate(e))

        tickingRef.current = true
      }
    },
    [animate]
  )

  const onWheel = useCallback(
    e => {
      requestTick(e)
    },
    [requestTick]
  )

  const animate = useCallback(
    e => {
      sliderRef.current.scrollLeft = e.deltaY + sliderRef.current.scrollLeft

      tickingRef.current = false
    },
    [sliderRef]
  )

  useEffect(() => {
    if (sliderRef.current !== null) {
      sliderRef.current.addEventListener("wheel", onWheel, false)
    }

    return () => sliderRef.current.removeEventListener("wheel", onWheel, false)
  }, [onWheel, sliderRef])

  useEffect(() => {
    window.addEventListener("resize", handleResize, false)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize, false)
    }
  }, [handleResize])

  const handleClick = () => onClose()

  return (
    <RemoveScroll>
      <section
        ref={sliderRef}
        css={css`
          position: fixed;
          z-index: ${zIndices.modal};
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${colorSet.background};
          overflow: auto;
          transition: opacity ${transition.speed.slow}
            ${transition.curve.default};
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
                aspectRatio: picture.asset.fluid.aspectRatio,
                base64: picture.asset.fluid.base64,
              }))}
              css={css`
                filter: grayscale();
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
                    fill: ${colorSet.color};
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
              <Button
                onClick={handleClick}
                color={colorSet.button.color}
                underlineColor={colorSet.button.underline}
              >
                Fermer
              </Button>
            </div>
          </div>
        </div>
      </section>
    </RemoveScroll>
  )
}

export default ProjectModal
