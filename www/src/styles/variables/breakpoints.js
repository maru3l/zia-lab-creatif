const breakpoints = ["40em", "52em", "64em"]
// const breakpoints = [320, 375, 640, 768, 1024, 1280, 1440, 1560, 1920]

const mediaQueries = {
  ratio11: `@media screen and (min-aspect-ratio: 1/1) and (min-height: 768px)`,
  // xsmall: `@media screen and (max-width: ${breakpoints[0] - 1})`,
  // xsmallUp: `@media screen and (min-width: ${breakpoints[0]})`,
  // small: `@media screen and (max-width: ${breakpoints[0] - 1})`,
  // smallUp: `@media screen and (min-width: ${breakpoints[0]})`,
  // medium: `@media screen and (max-width: ${breakpoints[1] - 1})`,
  // mdediumUp: `@media screen and (min-width: ${breakpoints[1]})`,
  // large: `@media screen and (max-width: ${breakpoints[2] - 1})`,
  // largeUp: `@media screen and (min-width: ${breakpoints[2]})`,
  // xlarge: `@media screen and (max-width: ${breakpoints[2] - 1})`,
  // xlargeUp: `@media screen and (min-width: ${breakpoints[2]})`,
}

export default { breakpoints, mediaQueries }
