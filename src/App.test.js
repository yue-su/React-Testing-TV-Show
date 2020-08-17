import React from "react"
import { render, screen } from "@testing-library/react"
import { fetchShow as mockFetchshow } from "./components/fetchShow"
import App from "./App"
import userEvent from "@testing-library/user-event"
import { apiData } from "./components/data"

jest.mock("./components/fetchShow")

test("renders seasons", async () => {
  mockFetchshow.mockResolvedValueOnce(apiData)

  render(<App />)

  const select = await screen.findByText(/select a season/i)
  userEvent.click(select)

  //renders 4 options
  const optionArr = screen.getAllByRole("option")
  expect(optionArr).toHaveLength(4)

  //select season 1
  userEvent.click(screen.getByText(/Season 1/i))

  //renders 8 episode
  const episodes = screen.getAllByTestId("episode")
  expect(episodes).toHaveLength(8)
})
