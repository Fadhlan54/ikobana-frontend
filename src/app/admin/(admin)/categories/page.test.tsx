import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import Categories from "./page";

describe("Categories", () => {
  it("should render", () => {
    render(<Categories />);
    expect(
      screen.getByText(/Kelola Kategori/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
