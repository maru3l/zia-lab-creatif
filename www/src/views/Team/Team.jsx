// vendors
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import VisuallyHidden from "@reach/visually-hidden"

// variables
import { colors } from "../../styles/variables"

import TeamMember from "./components/TeamMember"
import ClipPathPortrait from "../../images/ClipPathPortrait"

const TeamView = () => {
  const {
    teamMembers: { edges: teamMembers },
  } = useStaticQuery(graphql`
    query {
      teamMembers: allSanityTeamMember {
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
          <h2>Équipe de gestion</h2>
        </VisuallyHidden>

        {teamMembers.map(({ node }, index) => (
          <TeamMember
            key={index}
            name={node.name}
            role={node.role}
            portrait={node.portrait}
          >
            {node._rawDescription}
          </TeamMember>
        ))}
      </div>
    </section>
  )
}

export default TeamView
