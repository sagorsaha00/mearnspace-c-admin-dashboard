import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LoginPage from "../pages/login/login";
import "@testing-library/dom";

describe("LoginPage Component", () => {
  it("renders without crashing", () => {
    render(<LoginPage />);

    expect(screen.getByText("sign up"));
    expect(screen.getByPlaceholderText("username"));
    expect(screen.getByPlaceholderText("password"));
    expect(screen.getByRole("checkbox"));
    expect(screen.getByText("Forget Password"));
    expect(screen.getByRole("button", { name: "Log In" }));
  });
});
