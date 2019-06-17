// vendors
import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import BaseBlockContent from "@sanity/block-content-to-react"

// variables
import { breakpoints, colors } from "../../../styles/variables"

const Title = styled.h3`
  font-size: ${29 / 10}em;
  color: ${colors.prussianBlue};

  span {
    color: ${colors.scarlet};
    display: block;
  }
`

const Content = styled.div`
  grid-column-end: span 1;
  grid-row: 1 / span 1;
  padding: 40px;
  padding-top: 0;

  ${breakpoints.mediaQueries.ratio11} {
    padding-top: 40px;
  }
`

const PortraitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-end: span 1;
  grid-row: 1 / span 1;
  padding: 40px;
  padding-bottom: 0;

  ${breakpoints.mediaQueries.ratio11} {
    padding: 0;
  }
`

const Article = styled.article`
  font-size: 1rem;
  color: ${colors.scarlet};

  ${breakpoints.mediaQueries.ratio11} {
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  :nth-child(2n) {
    color: ${colors.prussianBlue};

    ${Title} {
      color: ${colors.scarlet};

      span {
        color: ${colors.prussianBlue};
      }
    }

    ${Content} {
      grid-column-start: 2;

      ${breakpoints.mediaQueries.ratio11} {
        padding-left: 0;
      }
    }

    ${PortraitWrapper} {
      grid-column-start: 1;
    }

    picture {
      clip-path: url(#polygon-clip);
    }
  }

  :nth-child(2n + 1) {
    ${Content} {
      grid-column-start: 1;

      ${breakpoints.mediaQueries.ratio11} {
        padding-right: 0;
      }
    }

    ${PortraitWrapper} {
      grid-column-start: 2;
    }

    picture {
      clip-path: circle(50% at 50% 50%);
    }
  }
`
const Text = styled.div`
  columns: 2;
`

const BoardMember = ({ name, role, portrait, children }) => (
  <Article>
    <PortraitWrapper>
      {portrait && (
        <picture
          css={css`
            justify-self: center;
            align-self: center;
            width: ${70 / 10}rem;
            height: ${70 / 10}rem;

            * {
              object-fit: cover;
            }
          `}
        >
          <source srcSet={portrait.asset.fixed.srcSetWebp} type="image/webp" />

          <img
            src={portrait.asset.fixed.src}
            alt={portrait.alt}
            srcSet={portrait.asset.fixed.srcSet}
          />
        </picture>
      )}
    </PortraitWrapper>

    <Content>
      <Title>
        {name}
        <span>{role}</span>
      </Title>

      <Text>
        <BaseBlockContent blocks={children} />
      </Text>
    </Content>
  </Article>
)

export default BoardMember
