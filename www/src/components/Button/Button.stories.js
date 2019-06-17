// vendors
import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, color, boolean } from "@storybook/addon-knobs"

import Button from "./index"

const stories = storiesOf("Button", module)

stories.addDecorator(withKnobs)

stories.add("Primary", () => (
  <Button
    disabled={boolean("Disabled", false)}
    parentBackgroundColor={color("Color of the parent background", "#ffffff")}
  >
    Voir les régions
  </Button>
))

stories.add("Secondary", () => (
  <Button
    secondary
    disabled={boolean("Disabled", false)}
    parentBackgroundColor={color("Color of the parent background", "#ffffff")}
  >
    Voir les régions
  </Button>
))

stories.add("Primary - 2 line", () => (
  <Button
    disabled={boolean("Disabled", false)}
    parentBackgroundColor={color("Color of the parent background", "#ffffff")}
  >
    Remplir le formulaire de demande de stage
  </Button>
))

stories.add("Secondary - 2 line", () => (
  <Button
    secondary
    disabled={boolean("Disabled", false)}
    parentBackgroundColor={color("Color of the parent background", "#ffffff")}
  >
    Remplir le formulaire de demande de stage
  </Button>
))

stories.add("Primary Full", () => (
  <Button
    full
    disabled={boolean("Disabled", false)}
    parentBackgroundColor={color("Color of the parent background", "#ffffff")}
  >
    Voir les régions
  </Button>
))

stories.add("Secondary Full", () => (
  <Button
    full
    secondary
    disabled={boolean("Disabled", false)}
    parentBackgroundColor={color("Color of the parent background", "#ffffff")}
  >
    Voir les régions
  </Button>
))

stories.add("Primary Full - 2 line", () => (
  <Button
    full
    disabled={boolean("Disabled", false)}
    parentBackgroundColor={color("Color of the parent background", "#ffffff")}
  >
    Remplir le formulaire de demande de stage
  </Button>
))

stories.add("Secondary Full - 2 line", () => (
  <Button
    full
    secondary
    disabled={boolean("Disabled", false)}
    parentBackgroundColor={color("Color of the parent background", "#ffffff")}
  >
    Remplir le formulaire de demande de stage
  </Button>
))
