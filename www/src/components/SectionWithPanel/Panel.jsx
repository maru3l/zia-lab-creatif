// vendors
import React, { useState, useRef, useEffect } from "react"
import { css } from "@emotion/core"

import { breakpoints } from "../../styles/variables"

const Panel = ({
  children,
  onShowInviewport,
  backgroundColor,
  color,
  starColor,
}) => {
  const [visible, setVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef !== null) {
      const element = elementRef.current
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              onShowInviewport({ backgroundColor, color, starColor })

              if (!visible) setVisible(true)
            }
          })
        },
        {
          threshold: [0.55],
        }
      )

      observer.observe(element)
    }
  }, [backgroundColor, color, elementRef, onShowInviewport, starColor, visible])

  return (
    <div
      ref={elementRef}
      css={css`
        font-size: 1em;
        letter-spacing: ${-7 / 1000}em;
        padding: 40px;
        grid-column-start: 2;
        grid-column-end: span 1;
        min-height: calc(100vh - 80px);
        opacity: ${visible ? "1" : "0"};
        transition: opacity 350ms ease-out;
        z-index: 2;
        position: relative;
        will-change: opacity;

        ${breakpoints.mediaQueries.ratio11} {
          padding-left: 0;
        }
      `}
    >
      {children}
    </div>
  )
}

Panel.defaultProps = {
  onShowInviewport: () => {},
}

export default Panel
