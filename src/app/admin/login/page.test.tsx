import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import Login from "./page";

describe("Login", () => {
  it("should render", () => {
    render(<Login />);
    expect(
      screen.getByText(/Admin Portal/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
