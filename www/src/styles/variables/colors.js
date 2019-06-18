// vendors
import { rgb } from "polished"

const colors = {
  prussianBlue: `#07002b`,
  scarlet: `#ef2904`,
  // scarlet: rgb(208, 89, 53),
  verdunGreen: `#3c6518`,
  doublePearlLusta: `#ebdeba`,
  black: `#090708`,
}

const alias = {
  text: colors.prussianBlue,
  background: colors.doublePearlLusta,
  primary: colors.prussianBlue,
  secondary: colors.scarlet,
}

export default { ...colors, ...alias }
