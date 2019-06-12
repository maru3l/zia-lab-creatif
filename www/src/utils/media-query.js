// vendors
import { css } from "@emotion/core"

const lessThen = breakpoint => (...args) => {
  return css`
    @media (max-width: ${breakpoint - 0.02}px) {
      ${css(...args)}
    }
  `
}

const between = (firstBreakpoint, secondBreakpoint) => (...args) => {
  return css`
    @media (
      min-width: ${firstBreakpoint}px and
      max-width: ${secondBreakpoint - 0.02}px
    ) {
      ${css(...args)}
    }
  `
}

const greaterThen = breakpoint => (...args) => {
  return css`
    @media (min-width: ${breakpoint}px) {
      ${css(...args)}
    }
  `
}

export default {
  lessThen,
  between,
  greaterThen,
}
