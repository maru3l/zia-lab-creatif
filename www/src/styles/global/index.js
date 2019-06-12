// vendors
import { css } from "@emotion/core"
import { fluidRange } from "polished"

// style varaibles
import { colors, fonts, lineHeights } from "../variables"

export default css`
  :root {
    --font-size: ${(18 / 16) * 100}%;
    --line-height: ${22 / 18};
  }

  html {
    font-size: var(--font-size);
    line-height: var(--line-height);
    font-family: ${fonts.body};
  }

  body {
    font-family: ${fonts.body};
    color: ${colors.text};
    word-wrap: break-word;
    font-kerning: normal;
    font-feature-settings: "kern", "liga", "clig", "calt";

    /* Rythme background */
    /* background-image: linear-gradient(#eee 1px, transparent 1px);
    background-size: 100% calc(var(--line-height) * 1rem);
    background-position-y: calc(-0.5rem + 1px); */
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-rendering: optimizeLegibility;
  }

  p {
    margin: ${lineHeights.body}rem 0;
    padding: 0;

    &:first-child {
      margin-top: 0;
    }
  }
`
