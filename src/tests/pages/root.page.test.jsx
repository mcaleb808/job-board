import React from "react";
import HomePage from "../../app/page.jsx";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/renderWithProviders.jsx";

it("renders the home page without crashing", () => {
  renderWithProviders(<HomePage />);
  const homeHeading = screen.getByText("Welcome to Job Board");
  expect(homeHeading).toBeTruthy();
});
