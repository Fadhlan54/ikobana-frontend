"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMutation } from "@tanstack/react-query";
import DataContainer from "./DataContainer";
import { GetCustomerStats } from "@/service/analytics.service";
import { useEffect, useState } from "react";
import { UserStatsData, UserStatsResponse } from "@/interface/analytics";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CustomerStatistic() {
  const [userStats, setUserStats] = useState<UserStatsData[]>([]);

  const { mutate } = useMutation({
    mutationFn: GetCustomerStats,
    onSuccess: (data: UserStatsResponse) => {
      // Optional: Sort berdasarkan total_orders dari terbesar
      const sorted = data.data.sort((a, b) => b.total_orders - a.total_orders);
      setUserStats(sorted);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <DataContainer title="Statistik Pelanggan">
      <Bar
        data={{
          labels: userStats.map((data) => data.user_name),
          datasets: [
            {
              label: "Jumlah Pesanan",
              data: userStats.map((data) => data.total_orders),
              backgroundColor: "rgba(0, 180, 216, 0.6)",
              borderColor: "rgba(0, 180, 216, 1)",
              borderWidth: 1,
              yAxisID: "y",
            },
            {
              label: "Total Belanja (Rp)",
              data: userStats.map((data) => data.total_spent),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              yAxisID: "y1",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            tooltip: {
              mode: "index" as const,
              intersect: false,
              callbacks: {
                label: function (tooltipItem) {
                  const label = tooltipItem.dataset.label || "";
                  const value = tooltipItem.raw as number;
                  if (label.includes("Belanja")) {
                    return `${label}: Rp ${value.toLocaleString("id-ID")}`;
                  }
                  return `${label}: ${value}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              position: "left",
              title: {
                display: true,
                text: "Jumlah Pesanan",
              },
            },
            y1: {
              beginAtZero: true,
              position: "right",
              grid: {
                drawOnChartArea: false, // jangan tumpang tindih dengan y kiri
              },
              title: {
                display: true,
                text: "Total Belanja (Rp)",
              },
              ticks: {
                callback: function (value) {
                  return `Rp ${Number(value).toLocaleString("id-ID")}`;
                },
              },
            },
          },
        }}
      />
    </DataContainer>
  );
}
