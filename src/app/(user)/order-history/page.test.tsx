import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import OrderHistory from "./page";

describe("OrderHistory", () => {
  it("should render", () => {
    render(<OrderHistory />);
    expect(
      screen.getByText(/Riwayat Pesanan/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
