import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";

import ForgotPassword from "./page";

describe("ForgotPassword", () => {
  it("should render", () => {
    render(<ForgotPassword />);
    expect(
      screen.getByText(/Lupa Kata Sandi/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
