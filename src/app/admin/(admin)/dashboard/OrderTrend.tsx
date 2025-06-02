"use client";

import { OrdersData } from "@/interface/analytics";
import { GetAnalyticsSummary } from "@/service/analytics.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AnalyticsSummaryResponse } from "@/interface/analytics";
import CountUp from "react-countup";
import {
  FaRegRectangleList,
  FaCheck,
  FaRegRectangleXmark,
  FaTruckFast,
  FaMoneyBillWave,
} from "react-icons/fa6";
import { FaHourglassHalf } from "react-icons/fa";
import { MdOutlineMoneyOffCsred } from "react-icons/md";
import DataContainer from "./DataContainer";

export default function OrderTrendComponent() {
  const [orderData, setOrderData] = useState<OrdersData>({
    total_sales: 0,
    total_orders: 0,
    avg_order_value: 0,
    order_trend: {
      not_paid: 0,
      paid: 0,
      processing: 0,
      on_delivery: 0,
      completed: 0,
      canceled: 0,
    },
  });
  const { mutate } = useMutation({
    mutationFn: GetAnalyticsSummary,
    onSuccess: (data: AnalyticsSummaryResponse) => {
      setOrderData(data.data);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <DataContainer title="Data Pesanan">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <OrderDataContainer
          icon={<FaRegRectangleList size={20} />}
          title="Total Pesanan"
          count={orderData.total_orders}
        />
        <OrderDataContainer
          icon={<FaCheck size={20} />}
          title="Selesai"
          count={orderData?.order_trend?.completed}
        />
        <OrderDataContainer
          icon={<FaRegRectangleXmark size={20} />}
          title="Dibatalkan"
          count={orderData?.order_trend?.canceled}
        />
        <OrderDataContainer
          icon={<FaHourglassHalf size={20} />}
          title="Dalam Proses"
          count={orderData?.order_trend?.processing}
        />
        <OrderDataContainer
          icon={<FaTruckFast size={20} />}
          title="Dalam Pengiriman"
          count={orderData?.order_trend?.on_delivery}
        />
        <OrderDataContainer
          icon={<FaMoneyBillWave size={20} />}
          title="Dibayar"
          count={orderData?.order_trend?.paid}
        />
        <OrderDataContainer
          icon={<MdOutlineMoneyOffCsred size={24} />}
          title="Belum Dibayar"
          count={orderData?.order_trend?.not_paid}
        />
      </div>
    </DataContainer>
  );
}

function OrderDataContainer({
  icon,
  title,
  count,
}: {
  icon?: React.ReactNode;
  title: string;
  count: number;
}) {
  return (
    <div className="rounded-md p-4 bg-primary-1/15 border border-primary-1 text-neutral-7">
      <div className="w-10 h-10 flex items-center justify-center text-white rounded-full bg-primary-1  mb-2 ">
        {icon}
      </div>
      <h1 className="font-semibold text-sm">{title}</h1>
      <div className="text-xl font-bold">
        <CountUp end={count} start={0} />
      </div>
    </div>
  );
}
