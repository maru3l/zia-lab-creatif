import React from "react"
import renderer from "react-test-renderer"
import { render, cleanup, fireEvent } from "@testing-library/react"

import Button from "./Button"

afterEach(cleanup)

describe("Selective tag rendering", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Button>Voir les régions</Button>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("Defaults to rendering a button", () => {
    const { container, getByText } = render(
      <Button onClick={() => {}}>Hello</Button>
    )

    expect(container.nodeName).toBe(`DIV`)
    expect(getByText("Hello").nodeName).toBe("BUTTON")
  })

  it("renders a button if tag=button", () => {
    const { getByText } = render(
      <Button tag="button" onClick={() => {}}>
        Hello
      </Button>
    )

    expect(getByText("Hello").nodeName).toBe("BUTTON")
  })

  it("renders a button if tag=a", () => {
    const { getByText } = render(
      <Button tag="a" to="/somewhere">
        Hello
      </Button>
    )

    expect(getByText("Hello").nodeName).toBe("A")
  })

  it("renders a button if tag=link", () => {
    const { getByText } = render(
      <Button tag="link" to="/somewhere">
        Hello
      </Button>
    )

    expect(getByText("Hello").nodeName).toBe("A")
    expect(getByText("Hello").getAttribute("href")).toBe("/somewhere")
  })

  it("renders a link if tag=href", () => {
    const { getByText } = render(
      <Button tag="href" to="/somewhere">
        Hello
      </Button>
    )

    expect(getByText("Hello").nodeName).toBe("A")
    expect(getByText("Hello").getAttribute("href")).toBe("/somewhere")
  })
})

describe(`props forwarding`, () => {
  it(`invokes custom onClick handler`, () => {
    const onClick = jest.fn()

    const { getByText } = render(
      <Button to="/custom-click" onClick={onClick}>
        Hello
      </Button>
    )
    fireEvent.click(getByText(`Hello`))

    expect(onClick).toHaveBeenCalledWith(expect.any(Object))
  })

  it(`renders children`, () => {
    const children = <span>Hello World</span>
    const { getByText } = render(<Button to="/children">{children}</Button>)

    expect(getByText(`Hello World`)).toBeDefined()
  })
})
