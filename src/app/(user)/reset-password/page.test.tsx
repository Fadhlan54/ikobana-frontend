import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import ResetPasswordPage from "./page";

describe("ResetPasswordPage", () => {
  it("should render", () => {
    render(<ResetPasswordPage />);
    expect(
      screen.getByText(/Token Tidak Valid/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
