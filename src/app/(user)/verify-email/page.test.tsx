import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import VerifyEmailPage from "./page";

describe("VerifyEmailPage", () => {
  it("should render", () => {
    render(<VerifyEmailPage />);
    expect(
      screen.getByText(/Verifikasi Email/i, { selector: "h2" })
    ).toBeInTheDocument();
  });
});
