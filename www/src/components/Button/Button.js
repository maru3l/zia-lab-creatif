// vendors
import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { fluidRange } from "polished"

// styles
import { colors, transition } from "../../styles/variables"
import { useEffect } from "react"
import { useState } from "react"
import { array } from "prop-types"

const components = {
  link: Link,
  a: React.forwardRef(({ children, ...rest }, ref) => (
    <a ref={ref} {...rest}>
      {children}
    </a>
  )),
  href: React.forwardRef(({ children, ...rest }, ref) => (
    <a ref={ref} {...rest}>
      {children}
    </a>
  )),
  button: React.forwardRef(({ children, ...rest }, ref) => (
    <button ref={ref} {...rest}>
      {children}
    </button>
  )),
}

const getRGB = str => {
  return str
    .substring(str.lastIndexOf("(") + 1, str.lastIndexOf(")"))
    .split(", ")
    .map(x => Number(x))
}

const rgbToHex = (r, g, b) =>
  "#" +
  [Number(r), Number(g), Number(b)]
    .map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? "0" + hex : hex
    })
    .join("")

const getAncesterCssValue = (element, params = []) => {
  const styles = getComputedStyle(element)

  const results = params.map(key => {
    if (key === "background-color" && styles[key] === "rgba(0, 0, 0, 0)")
      return undefined

    return styles[key]
  })

  if (results.includes(undefined)) {
    const newParams = []

    results.forEach((value, index) => {
      if (typeof value === "undefined") {
        newParams.push(params[index])
      }
    })

    getAncesterCssValue(element.parentNode, newParams).forEach((value, i) => {
      const index = params.indexOf(newParams[i])

      results[index] = value
    })
  }

  return results
}

const Button = ({ children, tag, to, ...rest }) => {
  const buttonRef = React.createRef()
  const [color, setColor] = useState(colors.doublePearlLusta)
  const [underlineColor, setUnderlineColor] = useState(colors.scarlet)
  const Tag = components[tag || "button"]

  const props = {
    to: tag === "link" ? to : undefined,
    href: tag === `href` || tag === `a` ? to : undefined,
    ...rest,
  }

  useEffect(() => {
    const response = getAncesterCssValue(buttonRef.current.parentNode, [
      "background-color",
      "color",
    ])

    console.log(response)

    const [bgColor, fontColor] = response

    const fontColorRGB = getRGB(fontColor)
    const fontColorHex = rgbToHex(
      fontColorRGB[0],
      fontColorRGB[1],
      fontColorRGB[2]
    )

    const bgColorRGB = getRGB(bgColor)
    const bgColorHex = rgbToHex(bgColorRGB[0], bgColorRGB[1], bgColorRGB[2])

    setColor(fontColorHex)

    if (fontColorHex === colors.scarlet) {
      setUnderlineColor(colors.prussianBlue)
    }

    if (bgColorHex === "#d05935") {
      setUnderlineColor(colors.prussianBlue)
    }
  }, [buttonRef])

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
    color: ${color};
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
      background-color: ${underlineColor};
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
    <Tag {...props} css={style} ref={buttonRef}>
      {children}
    </Tag>
  )
}

export default Button
