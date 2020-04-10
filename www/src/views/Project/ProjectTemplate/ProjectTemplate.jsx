// vendors
import React, { useRef, useEffect, useState } from "react"
import { css } from "@emotion/core"
import { fluidRange } from "polished"

import { breakpoints } from "../../../styles/variables"
import Button from "../../../components/Button/Button"

import Wrapper from "./shared/Wrapper"
import ProjectModal from "./ProjectModal"

const ProjectTemplate = ({ project, onInViewport, colorSet }) => {
  const intersectionRef = useRef()
  const isInViewport = useRef(false)
  const [open, setOpen] = useState(false)

  const handleClick = () => setOpen(!open)

  useEffect(() => {
    const intersectionElement = intersectionRef.current
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > 0.55 &&
            !isInViewport.current
          ) {
            isInViewport.current = true

            onInViewport()
          } else {
            isInViewport.current = false
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
  }, [intersectionRef, onInViewport])

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
          `}
        >
          <Button
            onClick={handleClick}
            color={colorSet.button.color}
            underlineColor={colorSet.button.underline}
          >
            {project.title}
          </Button>
        </h3>
      </Wrapper>

      {open && (
        <ProjectModal
          project={project}
          onClose={handleClick}
          colorSet={colorSet}
        />
      )}
    </article>
  )
}

export default ProjectTemplate
