// vendors
import React, { useState } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { colors, breakpoints } from "../../styles/variables"

import VectorStar from "../../images/VectorStar"
import { useRef } from "react"

const Wrapper = styled.div`
  width: 100vh;
  max-width: 100vw;
  margin: auto;
  min-height: 100vh;
  position: relative;

  ${breakpoints.mediaQueries.ratio11} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto last-line;
  }
`

const TitlePanel = styled.div`
  font-size: 1em;
  letter-spacing: ${-7 / 1000}em;
  grid-column-start: 1;
  grid-row: 1 / span 6;
  grid-column-end: span 1;
  z-index: 1;
  position: relative;
`

const SectionWithPanel = ({ children, title, ...props }) => {
  const currentIndex = useRef(null)
  const [colorsState, setColorsState] = useState({
    backgroundColor: colors.doublePearlLusta,
    color: colors.verdunGreen,
    starColor: ``,
  })
  const setColors = (index, { backgroundColor, starColor, color }) => {
    if (currentIndex.current === index) return

    currentIndex.current = index

    setColorsState({
      backgroundColor,
      starColor,
      color,
    })
  }

  return (
    <section
      className="panel-font-size"
      css={[
        css`
          min-height: 100vh;
          position: relative;
          transition: color 150ms, background-color 150ms;
          will-change: background-color color;
        `,
      ]}
      style={{
        backgroundColor: colorsState.backgroundColor,
        color: colorsState.color,
      }}
      {...props}
    >
      <Wrapper>
        <TitlePanel>
          <div
            css={css`
              height: 100vh;
              position: sticky;
              top: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <VectorStar
              css={css`
                display: none;
                position: absolute;
                width: ${42 / 36}em;
                top: 50%;
                left: 125%;
                will-change: fill;

                ${breakpoints.mediaQueries.ratio11} {
                  display: block;
                  opacity: 1;
                }
              `}
              style={{
                fill: colorsState.starColor,
              }}
            />
            <h2
              css={css`
                text-align: center;
                font-size: ${50 / 35}em;
                letter-spacing: ${59 / 1000}em;
                margin: 0;

                ${breakpoints.mediaQueries.ratio11} {
                  writing-mode: vertical-lr;
                  transform: rotate(180deg);
                }
              `}
            >
              {title}
            </h2>
          </div>
        </TitlePanel>

        {children.map((child, index) => {
          return React.cloneElement(child, {
            key: index,
            onShowInviewport: values => setColors(index, values),
          })
        })}
      </Wrapper>
    </section>
  )
}

export default SectionWithPanel
