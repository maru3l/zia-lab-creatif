// vendor
import React, { useLayoutEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import VisuallyHidden from "@reach/visually-hidden"

import { colors, breakpoints } from "../../styles/variables"
import VectorStar from "../../images/VectorStar"
import ProjectTemplate from "./ProjectTemplate"

const Wrapper = styled.div`
  width: 100vh;
  max-width: 100vw;
  margin: auto;
  min-height: 100vh;
`

const colorOrder = [
  {
    background: colors.scarlet,
    color: colors.doublePearlLusta,
    star: colors.prussianBlue,
  },
  {
    background: colors.doublePearlLusta,
    color: colors.scarlet,
    star: colors.verdunGreen,
  },
  {
    background: colors.prussianBlue,
    color: colors.doublePearlLusta,
    star: colors.scarlet,
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
  const intersectionRef = React.useRef()
  const [colorState, setColorState] = useState({
    background: colors.prussianBlue,
    color: colors.doublePearlLusta,
    star: colors.scarlet,
  })
  const {
    projects: { edges: projects = [] },
  } = useStaticQuery(GET_PROJECTS)

  const handleInViewport = id => {
    if (id > -1) {
      setColorState(colorOrder[id])
    } else {
      setColorState({
        background: colors.prussianBlue,
        color: colors.doublePearlLusta,
        star: colors.scarlet,
      })
    }
  }

  useLayoutEffect(() => {
    const intersectionElement = intersectionRef.current
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            handleInViewport(-1)
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
  }, [intersectionRef])

  return (
    <section
      id="projets"
      css={css`
        background-color: ${colorState.background};
        color: ${colorState.color};
        font-size: 1em;
        transition: color 100ms, background-color 100ms;
      `}
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
        <svg viewBox="0 0 55 22">
          <text x="0" y="15" fill={colorState.color}>
            Projets
          </text>
        </svg>

        <svg viewBox="0 0 55 22">
          <text x="0" y="15" fill={colorState.color}>
            Projets
          </text>
        </svg>
      </Wrapper>

      {projects.map(({ node }, index) => (
        <ProjectTemplate
          backgroundColor={colorState.background}
          textColor={colorState.color}
          key={node.id}
          onInViewport={() => handleInViewport(index)}
          project={node}
        />
      ))}
    </section>
  )
}

export default ProjectView
