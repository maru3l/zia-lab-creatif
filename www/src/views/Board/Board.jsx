// vendors
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import VisuallyHidden from "@reach/visually-hidden"

// variables
import { colors } from "../../styles/variables"

import BoardMember from "./components/BoardMember"
import ClipPathPortrait from "../../images/ClipPathPortrait"

const BoardView = () => {
  const {
    boardMembers: { edges: boardMembers },
  } = useStaticQuery(graphql`
    query {
      boardMembers: allSanityBoardMember {
        edges {
          node {
            name
            _rawDescription
            role
            portrait {
              alt
              asset {
                fixed(width: 115, height: 115) {
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
  `)

  console.log(boardMembers)

  return (
    <section
      id="bios"
      css={css`
        background-color: ${colors.doublePearlLusta};
      `}
    >
      <ClipPathPortrait css={{ position: "absolute" }} />

      <div
        css={css`
          width: 100vh;
          max-width: 100vw;
          margin: auto;
          min-height: 100vh;
        `}
      >
        <VisuallyHidden>
          <h2>Conseil d'administration</h2>
        </VisuallyHidden>

        {boardMembers.map(({ node }, index) => (
          <BoardMember
            key={index}
            name={node.name}
            role={node.role}
            portrait={node.portrait}
          >
            {node._rawDescription}
          </BoardMember>
        ))}
      </div>
    </section>
  )
}

export default BoardView
