import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import Products from "./page";
import { act } from "react";

describe("Products", () => {
  it("should render", () => {
    act(() => {
      render(<Products />);
    });
    expect(screen.getByText(/Filter/i, { selector: "h3" })).toBeInTheDocument();
  });
});

describe("Products", () => {
  it("should render category", () => {
    act(() => {
      render(<Products />);
    });
    expect(
      screen.getByText(/Kategori/i, { selector: "h4" })
    ).toBeInTheDocument();
  });
});
