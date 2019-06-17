// vendors
import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { fluidRange } from "polished"

// styles
import { colors, transition } from "../../styles/variables"

const components = {
  link: Link,
  a: ({ children, ...rest }) => <a {...rest}>{children}</a>,
  href: ({ children, ...rest }) => <a {...rest}>{children}</a>,
  button: ({ children, ...rest }) => <button {...rest}>{children}</button>,
}

const Button = ({ children, tag, to, ...rest }) => {
  const Tag = components[tag || "button"]

  const props = {
    to: tag === "link" ? to : undefined,
    href: tag === `href` || tag === `a` ? to : undefined,
    ...rest,
  }

  const buttonStyles = css`
    font-family: inherit;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    background: none;
    appearance: none;
    border: 0;
    font-size: ${41 / 10}rem;
    letter-spacing: ${10 / 1000}em;
    color: ${colors.doublePearlLusta};
    position: relative;
    z-index: 1;
    padding: 0 0.02em;
    margin: ${6.715 / 41}em 0;

    ${fluidRange(
      {
        prop: "font-size",
        fromSize: `${34 / 10}rem`,
        toSize: `${41 / 10}rem`,
      },
      "320px",
      "768px"
    )}

    &:after {
      background-color: ${colors.scarlet};
      height: calc(${6.715 / 41}em + 100%);
      width: 100%;
      display: block;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      transform: scaleY(0.1);
      transform-origin: bottom;
      transition: transform ${transition.speed.default}
        ${transition.curve.default};
    }

    :hover,
    :focus {
      &:after {
        transform: scaleY(1);
        outline: 0;
      }
    }
  `

  const style = {
    "&&": {
      ...buttonStyles,
    },
  }

  return (
    <Tag {...props} css={style}>
      {children}
    </Tag>
  )
}

export default Button
