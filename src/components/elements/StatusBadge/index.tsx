"use client";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  function getStatusBackgroundColor(): string {
    const colorMap: Record<string, string> = {
      not_paid: "bg-red-100 text-red-800",
      paid: "bg-green-100 text-green-800",
      processing: "bg-yellow-100 text-yellow-800",
      on_delivery: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      completed: "bg-green-100 text-green-800",
      canceled: "bg-red-100 text-red-800",
      denied: "bg-red-100 text-red-800",
      expired: "bg-red-100 text-red-800",
    };
    return colorMap[status] || "bg-red-100 text-red-800";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${getStatusBackgroundColor()} ${getSizeClass(
        size
      )}`}
    >
      {getStatusText(status)}
    </span>
  );
}
function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    not_paid: "Belum Dibayar",
    paid: "Dibayar",
    processing: "Diproses",
    on_delivery: "Dalam Pengiriman",
    delivered: "Terkirim",
    canceled: "Dibatalkan",
    denied: "Ditolak",
    expired: "Kadaluarsa",
    completed: "Selesai",
  };
  return statusMap[status] || "Belum Dibayar";
}

function getSizeClass(size: string): string {
  const sizeMap: Record<string, string> = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-3.5 py-1",
  };
  return sizeMap[size];
}
