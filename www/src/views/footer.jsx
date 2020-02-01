// vendors
import React from "react"
import { css } from "@emotion/core"
import VisuallyHidden from "@reach/visually-hidden"

import { breakpoints, colors } from "../styles/variables"

// components
import Button from "../components/Button/Button"

import logo from "../images/vector-logoFooter.svg"

const FooterView = () => (
  <footer
    id="collaborer"
    css={css`
      background-color: ${colors.prussianBlue};
      color: ${colors.doublePearlLusta};
    `}
  >
    <div
      css={css`
        width: 100vh;
        min-height: 100vh;
        max-width: 100vw;
        display: flex;
        flex-direction: column;
        margin: auto;
      `}
    >
      <div
        css={css`
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Button href="mailto:contact@zialabcreatif.com" tag="href">
          Collaborer
        </Button>
      </div>

      <div
        css={css`
          display: grid;
          grid-gap: 40px;
          margin: 40px;
          font-size: ${6.45 / 10}rem;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);

          ${breakpoints.mediaQueries.ratio11} {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(1, 1fr);
          }

          p,
          ul {
            margin-top: 0;
            margin-bottom: calc(1em * var(--line-height));
          }

          a {
            color: ${colors.doublePearlLusta};
            text-decoration: none;
            display: block;
          }

          ul {
            list-style: none;
            padding: 0;
          }
        `}
      >
        <div>
          <img
            src={logo}
            alt=""
            css={{ marginTop: `-${260 / 20}%`, width: "100%" }}
          />
        </div>
        <div>
          <VisuallyHidden>
            <p>Adresse courriel</p>
          </VisuallyHidden>

          <p>
            <a href="mailto:contact@zialabcreatif.com">
              contact@
              <br />
              zialabcreatif.com
            </a>
          </p>

          <VisuallyHidden>
            <p>Réseaux sociaux</p>
          </VisuallyHidden>

          <ul>
            <li>
              <a href="https://www.facebook.com/zialabcreatif">facebook</a>
            </li>

            <li>
              <a href="https://www.instagram.com/zialabcreatif/">instagram</a>
            </li>
          </ul>
        </div>

        <div>
          <p>
            Siège social situé <br />à la Maison pour la danse <br />
            -<br />
            336 rue du Roi, suite 220 <br />
            Québec, Québec <br />
            G1K 2W5
          </p>
        </div>

        <div>
          <p>Membres du conseil d'administration&thinsp;:</p>

          <ul>
            <li>Pascal Asselin, président</li>

            <li>Geneviève Duong, secraitaire</li>

            <li>Marie-chantale Béland, trésorière</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
)

export default FooterView
