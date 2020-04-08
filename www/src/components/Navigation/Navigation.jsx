// vendors
import React, { useState } from "react"
import { css } from "@emotion/core"
import VisuallyHidden from "@reach/visually-hidden"

import Button from "../Button/Button"

import iconMenu from "../../images/icon-menu.svg"
import iconCloseMenu from "../../images/icon-close.svg"

import {
  breakpoints,
  colors,
  transition,
  zIndices,
} from "../../styles/variables"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      css={css`
        width: 100vw;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        pointer-events: none;
        z-index: ${zIndices.sticky};
      `}
    >
      <div
        css={css`
          top: 0;
          right: 0;
          left: 0;
          padding: 40px;
          text-align: right;
        `}
      >
        <button
          css={css`
            pointer-events: auto;
            appearance: none;
            border: none;
            background: none;
            margin: 0;
            padding: 0;
            cursor: pointer;
            display: inline-block;
            position: relative;
            background-image: url(${iconMenu});
            background-repeat: no-repeat;
            font-size: 0;

            width: 40px;
            height: 40px;
          `}
          onClick={() => setIsOpen(true)}
        >
          menu
        </button>
      </div>

      <div
        css={css`
          background-color: ${colors.prussianBlue};
          width: 100vw;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          overflow: scroll;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          pointer-events: auto;
          z-index: ${zIndices.fixed};
          transition: transform ${transition.speed.slow}
            ${transition.curve.default};

          ${breakpoints.mediaQueries.ratio11} {
            width: 50vw;
          }
        `}
        style={{
          transform: `translateX(${isOpen ? "0" : "100%"})`,
        }}
      >
        <nav
          role="navigation"
          css={css`
            margin: 40px;
            color: ${colors.doublePearlLusta};
          `}
        >
          <ul
            css={css`
              margin-top: 0;
              list-style: none;
              padding: 0;
            `}
          >
            <li>
              <Button tag="a" href="#mission" onClick={() => setIsOpen(false)}>
                Mission
              </Button>
            </li>
            <li>
              <Button tag="a" href="#mandats" onClick={() => setIsOpen(false)}>
                Mandats
              </Button>
            </li>
            <li>
              <Button tag="a" href="#projets" onClick={() => setIsOpen(false)}>
                Projets
              </Button>
            </li>
            <li>
              <Button tag="a" href="#bios" onClick={() => setIsOpen(false)}>
                Bios
              </Button>
            </li>
            <li>
              <Button
                tag="a"
                href="#collaborer"
                onClick={() => setIsOpen(false)}
              >
                Collaborer
              </Button>
            </li>
          </ul>
        </nav>

        <button
          css={css`
            pointer-events: auto;
            appearance: none;
            border: none;
            background: none;
            margin: 0;
            padding: 0;
            cursor: pointer;
            display: inline-block;
            background-image: url(${iconCloseMenu});
            background-size: 80%;
            background-position: top right;
            background-repeat: no-repeat;
            font-size: 0;
            position: absolute;
            top: 40px;
            right: 40px;

            width: 40px;
            height: 40px;
          `}
          onClick={() => setIsOpen(false)}
        >
          menu
        </button>

        <div
          css={css`
            display: grid;
            color: ${colors.scarlet};
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            grid-gap: 40px;
            margin: 40px;
            font-size: ${6.45 / 10}rem;

            p,
            ul {
              margin-top: 0;
              margin-bottom: calc(1em * var(--line-height));
            }

            a {
              color: ${colors.scarlet};
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
                <a href="https://www.facebook.com/">facebook</a>
              </li>

              <li>
                <a href="https://www.instagram.com/">instagram</a>
              </li>

              <li>
                <a href="https://www.linkedin.com/">linked in</a>
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
    </div>
  )
}

export default Navigation
