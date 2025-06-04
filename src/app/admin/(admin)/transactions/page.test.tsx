import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import Transactions from "./page";

describe("Transactions", () => {
  it("should render", () => {
    render(<Transactions />);
    expect(
      screen.getByText(/Kelola Transaksi/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
