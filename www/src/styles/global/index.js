// vendors
import { css } from "@emotion/core"
import { fluidRange } from "polished"

// style varaibles
import { colors, fonts, lineHeights } from "../variables"

export default css`
  :root {
    --font-size: ${((10 * (57 / 35)) / 16) * 100}%;
    --line-height: ${12 / 10};
  }

  html {
    font-size: var(--font-size);
    line-height: var(--line-height);
    font-family: ${fonts.body};
    scroll-behavior: smooth;
  }

  body {
    font-family: ${fonts.body};
    color: ${colors.text};
    font-kerning: normal;
    font-feature-settings: "kern", "liga", "clig", "calt";
    font-weight: medium;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

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
    letter-spacing: -7;
  }

  p {
    margin: ${lineHeights.body}rem 0;
    padding: 0;

    &:first-child {
      margin-top: 0;
    }
  }

  .panel-font-size {
    ${fluidRange(
      {
        prop: "font-size",
        fromSize: `${29 / 10}rem`,
        toSize: `${36 / 10}rem`,
      },
      "320px",
      "768px"
    )}
  }
`
