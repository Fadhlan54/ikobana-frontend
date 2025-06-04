import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import ProductDetails from "./page";
import { useParams } from "next/navigation";
import { act } from "react";

describe("ProductDetails", () => {
  it("should render", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    act(() => {
      render(<ProductDetails />);
    });

    expect(
      screen.getByText(/Detail Produk/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
