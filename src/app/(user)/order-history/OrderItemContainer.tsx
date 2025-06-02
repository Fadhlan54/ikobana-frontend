import {
  UserTransactionData,
  UserTransactionItem,
} from "@/interface/transactionUser";
import dateParser from "@/utils/dateParser";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect } from "react";

export default function OrderContainer({
  id,
  created_at,
  payment_method,
  total_price,
  items,
  status,
  payment_url,
  shipping_data,
}: UserTransactionData): JSX.Element {
  useEffect(() => {
    console.log(items);
  }, [items]);
  return (
    <div className="p-6 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Order header */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
        <div>
          <p className="text-sm text-neutral-600 font-medium">No. Pesanan</p>
          <p className="font-semibold ">{id}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-600 font-medium">
            Tanggal Pesanan
          </p>
          <p className="font-semibold">{dateParser(created_at)}</p>
        </div>
      </div>

      {shipping_data.tracking_code && (
        <div className="mb-4">
          <p className="text-sm text-neutral-600 font-medium">Resi</p>
          <p className="font-semibold ">{shipping_data.tracking_code}</p>
        </div>
      )}

      {/* Status and payment method */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <StatusChip status={status} />
        <div className="bg-neutral-100 px-3 py-1 rounded-full text-sm">
          {payment_method}
        </div>
      </div>

      {/* Products list */}
      <div className="space-y-4 mb-6">
        {items &&
          items.map((item) => <OrderedProductItem key={item.ID} item={item} />)}
      </div>

      {/* Order summary */}
      <div className="bg-neutral-50 rounded-lg p-4 mb-2">
        <div className="flex justify-between py-2">
          <span className="text-neutral-600">Subtotal Produk</span>
          <span className="font-medium">
            {items &&
              items
                .reduce(
                  (sum, item) => sum + item.product_price * item.quantity,
                  0
                )
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-neutral-600">Ongkos Kirim</span>
          <span className="font-medium">
            {shipping_data.shipping_cost.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
        <div className="border-t border-neutral-200 my-2 "></div>
        <div className="flex justify-between pt-2 ">
          <span className="font-semibold">Total Pembayaran</span>
          <span className="font-bold text-lg text-primary-600">
            {total_price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </div>

      {/* Payment action */}
      {status === "not_paid" && (
        <div className="flex justify-end">
          <Link
            href={payment_url}
            target="_blank"
            className="bg-primary-1  hover:bg-primary-2 focus:bg-primary-3 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors text-sm"
          >
            Bayar Sekarang
          </Link>
        </div>
      )}
    </div>
  );
}

function OrderedProductItem({ item }: { item: UserTransactionItem }) {
  return (
    <Link
      href={`/products/${item.product.ID}`}
      className="flex gap-4 p-3 bg-white rounded-lg border border-neutral-100 hover:border-neutral-200 transition-colors shadow hover:shadow-md hover:bg-neutral-100"
    >
      <div className="flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden">
        {item.product?.image_url ? (
          <Image
            src={item.product.image_url}
            alt={item.product.name}
            width={80}
            height={80}
            className="object-cover w-20 h-20"
          />
        ) : (
          <Image
            src="/images/Rectangle.png"
            alt={item.product.name}
            width={80}
            height={80}
            className="object-cover w-20 h-20"
          />
        )}
      </div>
      <div className="flex-grow">
        <h3 className="font-medium hover:text-primary-600 transition-colors line-clamp-2">
          {item.product.name}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-neutral-600">
          <p>{item.product.weight_per_unit}g</p>
          <p>Jumlah: {item.quantity}</p>
          <p>
            {item.product.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}

function StatusChip({ status }: { status: string }) {
  const statusBgColor = getStatusBackgroundColor(status);
  const statusText = getStatusText(status);

  return (
    <div
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusBgColor} flex items-center`}
    >
      <span className="relative flex">
        <span
          className={`animate-ping bg-green-80 absolute inline-flex h-full w-full rounded-full ${statusBgColor} opacity-75`}
        ></span>
      </span>
      {statusText}
    </div>
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
  };
  return statusMap[status] || "Belum Dibayar";
}

function getStatusBackgroundColor(status: string): string {
  const colorMap: Record<string, string> = {
    not_paid: "bg-red-100 text-red-800",
    paid: "bg-green-100 text-green-800",
    processing: "bg-yellow-100 text-yellow-800",
    on_delivery: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
    denied: "bg-red-100 text-red-800",
    expired: "bg-red-100 text-red-800",
  };
  return colorMap[status] || "bg-red-100 text-red-800";
}
