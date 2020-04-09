// vendor
import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import VisuallyHidden from "@reach/visually-hidden"

import { colors } from "../../styles/variables"
import ProjectTemplate from "./ProjectTemplate/ProjectTemplate"

const projectTitleCss = css`
  will-change: fill;
`

const Wrapper = styled.div`
  width: 100vh;
  max-width: 100vw;
  margin: auto;
  min-height: 100vh;
`

const colorSets = [
  {
    background: colors.prussianBlue,
    color: colors.doublePearlLusta,
    star: colors.scarlet,
    button: {
      color: colors.doublePearlLusta,
      underline: colors.scarlet,
    },
  },
  {
    background: colors.scarlet,
    color: colors.doublePearlLusta,
    star: colors.prussianBlue,
    button: {
      color: colors.doublePearlLusta,
      underline: colors.prussianBlue,
    },
  },
  {
    background: colors.doublePearlLusta,
    color: colors.scarlet,
    star: colors.verdunGreen,
    button: {
      color: colors.scarlet,
      underline: colors.prussianBlue,
    },
  },
]

const GET_PROJECTS = graphql`
  query {
    projects: allSanityProject(
      sort: { fields: order, order: ASC }
      filter: { highlighted: { eq: false } }
    ) {
      edges {
        node {
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
            hotspot {
              x
              y
            }
          }
          _rawDescription
          _id
          _key
          highlighted
          id
          order
          title
          videoUrl
          featureImage {
            disposition
            image {
              hotspot {
                x
                y
              }
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
          }
        }
      }
    }
  }
`

const ProjectView = () => {
  const intersectionRef = React.useRef(null)
  const currentIndex = React.useRef(0)
  const [colorState, setColorState] = useState(colorSets[0])

  const {
    projects: { edges: projects = [] },
  } = useStaticQuery(GET_PROJECTS)

  const handleInViewport = index => {
    if (currentIndex.current === index) return

    const colorSet = colorSets[(index + colorSets.length) % colorSets.length]

    setColorState(colorSet)

    currentIndex.current = index
  }

  useEffect(() => {
    const intersectionElement = intersectionRef.current
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.55 &&
            currentIndex.current !== 0
          ) {
            handleInViewport(0)
          }
        })
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    )

    observer.observe(intersectionElement)

    return () => {
      observer.disconnect(intersectionElement)
    }
  }, [intersectionRef])

  return (
    <section
      id="projets"
      css={css`
        font-size: 1em;
        transition: color 150ms, background-color 150ms;
        will-change: background-color, color;
      `}
      style={{
        backgroundColor: colorState.background,
        color: colorState.color,
      }}
    >
      <VisuallyHidden>
        <h2>Projets</h2>
      </VisuallyHidden>

      <Wrapper
        ref={intersectionRef}
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        `}
      >
        <svg
          viewBox="0 0 55 22"
          css={projectTitleCss}
          style={{ fill: colorState.color }}
        >
          <text x="0" y="15">
            Projets
          </text>
        </svg>

        <svg
          viewBox="0 0 55 22"
          css={projectTitleCss}
          style={{ fill: colorState.color }}
        >
          <text x="0" y="15">
            Projets
          </text>
        </svg>
      </Wrapper>

      {projects.map(({ node }, index) => (
        <ProjectTemplate
          key={node.id}
          onInViewport={() => handleInViewport(index + 1)}
          project={node}
          colorSet={colorState}
        />
      ))}
    </section>
  )
}

export default ProjectView
