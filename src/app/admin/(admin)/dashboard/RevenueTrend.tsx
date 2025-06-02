"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { GetRevenueTrend } from "@/service/analytics.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DataContainer from "./DataContainer";
import { RevenueData, RevenueTrendResponse } from "@/interface/analytics";
import { Line } from "react-chartjs-2";
import dateParser from "@/utils/dateParser";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueTrendComponent() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const { mutate } = useMutation({
    mutationFn: GetRevenueTrend,
    onSuccess: (response: RevenueTrendResponse) => {
      setRevenueData(
        response.data.sort((a, b) => a.date.localeCompare(b.date))
      );
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <DataContainer title="Data Pendapatan">
      <Line
        data={{
          labels: revenueData.map((data) =>
            dateParser(data.date, {
              showDayName: false,
              showTime: false,
            })
          ),
          datasets: [
            {
              label: "Pendapatan",
              data: revenueData.map((data) => data.revenue),
              backgroundColor: "rgba(0, 180, 216, 0.5)",
              borderColor: "rgba(0, 180, 216, 1)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: { count: 5 },
            },
          },
        }}
      />
    </DataContainer>
  );
}
