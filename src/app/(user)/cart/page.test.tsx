import "@/utils/mockTest";

import { render, screen } from "@/components/test/test-utils";
import Cart from "./page";

describe("Cart", () => {
  it("should render", () => {
    render(<Cart />);
    expect(
      screen.getByText(/Keranjang/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
