import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import Products from "./page";

describe("Products", () => {
  it("should render", () => {
    render(<Products />);
    expect(
      screen.getByText(/Kelola Produk/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
