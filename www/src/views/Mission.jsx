// vendors
import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { colors, breakpoints } from "../styles/variables"

import VectorStar from "../images/VectorStar"

const Wrapper = styled.div`
  width: 100vh;
  max-width: 100vw;
  margin: auto;
  min-height: 100vh;

  ${breakpoints.mediaQueries.ratio11} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`

const TitlePanel = styled.div`
  color: ${colors.prussianBlue};
  font-size: 1em;
  letter-spacing: ${-7 / 1000}em;
`

const ContentPanel = styled.div`
  font-size: 1em;
  letter-spacing: ${-7 / 1000}em;
  padding: 40px;

  ${breakpoints.mediaQueries.ratio11} {
    padding-left: 0;
  }
`

const MissionView = () => {
  return (
    <section
      id="mission"
      className="panel-font-size"
      css={css`
        background-color: ${colors.scarlet};
        min-height: 100vh;
        position: relative;
      `}
    >
      <Wrapper>
        <VectorStar
          css={css`
            position: absolute;
            width: ${42 / 36}em;
            fill: ${colors.doublePearlLusta};
            top: 80px;
            right: 52%;
            opacity: 0;

            ${breakpoints.mediaQueries.ratio11} {
              opacity: 1;
            }
          `}
        />

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
            <h2
              css={css`
                text-align: center;
                color: ${colors.doublePearlLusta};
                font-size: ${50 / 36}em;
                letter-spacing: ${59 / 1000}em;
                margin: 0;

                ${breakpoints.mediaQueries.ratio11} {
                  writing-mode: sideways-lr;
                }
              `}
            >
              Mission
            </h2>
          </div>
        </TitlePanel>

        <ContentPanel
          css={css`
            color: ${colors.prussianBlue};
          `}
        >
          <p>
            Créer et produire des spectacles dont la danse et la musique se
            magnifient l'un l'autre, afin de permettre à un large public de
            vivre l'art.
          </p>
        </ContentPanel>
      </Wrapper>
    </section>
  )
}

export default MissionView
