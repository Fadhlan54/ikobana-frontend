"use client";

import OrderTrendComponent from "./OrderTrend";
import RevenueTrendComponent from "./RevenueTrend";
import CustomerStatistic from "./CustomerStatistic";

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      {/* data pesanan (card), status pesanan dan jumlahnya*/}
      {/* status:  Selesai, Dibatalkan, Dalam Proses, Dalam Pengiriman, Dibayar, Belum Dibayar*/}
      <OrderTrendComponent />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* data pendapatan (line chart) */}
        <RevenueTrendComponent />
        {/* data pelanggan (bar chart): jumlah pesanan dan total belanja */}
        <CustomerStatistic />
      </div>
    </div>
  );
}
