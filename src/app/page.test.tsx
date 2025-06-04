import "@/utils/mockTest";
import { render, screen } from "../components/test/test-utils";
import Home from "./page";

describe("Home", () => {
  it("should render", () => {
    render(<Home />);
    expect(
      screen.getByText(/Lezat, Praktis, dan Terjangkau/i)
    ).toBeInTheDocument();
  });
});
