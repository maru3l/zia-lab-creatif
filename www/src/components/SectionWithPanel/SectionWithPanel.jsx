// vendors
import React, { useState } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { colors, breakpoints } from "../../styles/variables"

import VectorStar from "../../images/VectorStar"

const Wrapper = styled.div`
  width: 100vh;
  max-width: 100vw;
  margin: auto;
  min-height: 100vh;

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
`

const SectionWithPanel = ({ children, title, ...props }) => {
  const [current, setCurrent] = useState()
  const [colorsState, setColorsState] = useState({
    backgroundColor: colors.doublePearlLusta,
    color: colors.verdunGreen,
    starColor: ``,
  })
  const setColors = (index, { backgroundColor, starColor, color }) => {
    if (current === index) return

    setCurrent(index)

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
          color: ${colorsState.color};
          background-color: ${colorsState.backgroundColor};
          transition: color 100ms, background-color 100ms;
        `,
      ]}
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
                position: absolute;
                width: ${42 / 36}em;
                fill: ${colorsState.starColor};
                top: 50%;
                left: 125%;
                opacity: 0;
                z-index: -1;

                ${breakpoints.mediaQueries.ratio11} {
                  opacity: 1;
                }
              `}
            />
            <h2
              css={css`
                text-align: center;
                font-size: ${50 / 35}em;
                letter-spacing: ${59 / 1000}em;
                margin: 0;

                ${breakpoints.mediaQueries.ratio11} {
                  writing-mode: sideways-lr;
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
