import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import Profile from "./page";

describe("Profile", () => {
  it("should render", () => {
    render(<Profile />);
    expect(
      screen.getByText(/Profil Pengguna/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
