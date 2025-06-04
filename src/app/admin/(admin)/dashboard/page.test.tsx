import "@/utils/mockTest";
import { render, screen } from "@/components/test/test-utils";
import AdminDashboard from "./page";

describe("AdminDashboard Order Trend", () => {
  it("should render", () => {
    render(<AdminDashboard />);
    expect(
      screen.getByText(/Data Pesanan/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});

describe("AdminDashboard Revenue Trend", () => {
  it("should render", () => {
    render(<AdminDashboard />);
    expect(
      screen.getByText(/Data Pendapatan/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});

describe("AdminDashboard Customer Statistic", () => {
  it("should render", () => {
    render(<AdminDashboard />);
    expect(
      screen.getByText(/Statistik Pelanggan/i, { selector: "h1" })
    ).toBeInTheDocument();
  });
});
