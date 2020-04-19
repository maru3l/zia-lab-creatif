// vendors
import React, { useState, useCallback, useEffect } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { colors, breakpoints } from "../styles/variables"
import { useStaticQuery, graphql } from "gatsby"
import { fluidRange } from "polished"
import BaseBlockContent from "@sanity/block-content-to-react"

import PictureMontage from "../components/PictureMontage/PictureMontage"
import Carousel from "../components/Carousel/Carousel"

import IconPlay from "../images/IconPlay"

const Wrapper = styled.div`
  width: 100vh;
  max-width: 100vw;
  min-height: 100vh;
`

const GET_PROJECT = graphql`
  query {
    project: sanityProject(highlighted: { eq: true }) {
      _rawDescription
      featureImage {
        disposition
        image {
          asset {
            fluid {
              src
              srcSet
              srcSetWebp
              aspectRatio
              base64
            }
          }
          alt
          hotspot {
            x
            y
          }
        }
      }
      gallery {
        alt
        asset {
          fluid {
            src
            srcSet
            srcSetWebp
            aspectRatio
            base64
          }
        }
      }
      title
      videoUrl
    }
  }
`

const FeaturedProject = () => {
  const { project } = useStaticQuery(GET_PROJECT)
  const [translateX, setTranslateX] = useState(0)
  const intersectionRef = React.useRef(null)
  const tickingRef = React.useRef(false)
  const canScrollHandleRef = React.useRef(true)
  const isIntersectingRef = React.useRef(false)

  const animate = useCallback(() => {
    if (intersectionRef !== null) {
      const ratio = 1 / 5
      const {
        top,
        bottom,
        height,
      } = intersectionRef.current.getBoundingClientRect()

      if (
        top - window.innerHeight < 0 &&
        0 < bottom + window.innerHeight &&
        canScrollHandleRef.current
      ) {
        setTranslateX(Math.max(Math.min((top * -1) / height, ratio * 5), 0))
      }

      if (!canScrollHandleRef.current && translateX !== 0) {
        setTranslateX(0)
      }
    }

    tickingRef.current = false
  }, [translateX])

  const requestTick = useCallback(() => {
    if (!tickingRef.current && isIntersectingRef.current) {
      requestAnimationFrame(animate)

      tickingRef.current = true
    }
  }, [animate])

  const handleResize = useCallback(() => {
    const query = window.matchMedia(
      "(min-aspect-ratio: 1/1) and (min-height: 768px)"
    )

    canScrollHandleRef.current = query.matches

    requestTick()
  }, [requestTick])

  useEffect(() => {
    window.addEventListener("scroll", requestTick, false)

    return () => {
      window.removeEventListener("scroll", requestTick, false)
    }
  }, [requestTick])

  useEffect(() => {
    const element = intersectionRef.current
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isIntersectingRef.current = entry.isIntersecting
      })
    })

    observer.observe(element)

    return () => {
      observer.disconnect(element)
    }
  }, [intersectionRef])

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  return (
    <section
      ref={intersectionRef}
      css={css`
        position: relative;
        background-color: ${colors.black};
        color: ${colors.doublePearlLusta};

        ${breakpoints.mediaQueries.ratio11} {
          min-height: 500vh;
        }
      `}
    >
      <div
        css={css`
          ${breakpoints.mediaQueries.ratio11} {
            top: 0;
            height: 100vh;
            overflow: hidden;
            position: sticky;
            width: 100vw;
          }
        `}
      >
        <div
          css={css`
            ${breakpoints.mediaQueries.ratio11} {
              display: flex;
              width: 500vh;
              padding: 0 calc(50vw - 50vh);
              will-change: transform;
            }
          `}
          style={{ transform: `translateX(${translateX * -100}%)` }}
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
                hotspot: project.featureImage.image.hotspot || null,
              }}
              disposition={project.featureImage.disposition}
              css={css`
                height: 100vh;
                width: 100%;
              `}
            />
          </Wrapper>

          <Wrapper
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1em;
            `}
          >
            <h2
              css={css`
                text-align: center;
                font-size: ${38 / 10}em;
                letter-spacing: ${59 / 1000}em;
                margin: 0;
                writing-mode: vertical-lr;
                transform: rotate(180deg);
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
              `}
            >
              Noirceur solitaire
            </h2>
          </Wrapper>

          <Wrapper>
            <div
              css={css`
                margin: ${(30 / 568) * 100}vh ${(60 / 568) * 100}vh;
                ${fluidRange(
                  {
                    prop: "font-size",
                    fromSize: `${19 / 10}rem`,
                    toSize: `${28 / 10}rem`,
                  },
                  "320px",
                  "768px"
                )};
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
            />
          </Wrapper>

          {project.videoUrl && (
            <Wrapper
              css={css`
                display: flex;
                height: 100%;
                align-items: center;
                justify-content: center;
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
                    fill: ${colors.doublePearlLusta};
                  `}
                />
              </a>
            </Wrapper>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProject
