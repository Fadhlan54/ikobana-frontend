import SkeletonLoading from "@/components/elements/loading/SkeletonLoading";

import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export default function LoadingOrder(): JSX.Element {
  return (
    <div className="p-6 rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Order header */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
        <div>
          <div className="text-sm text-neutral-600 font-medium mb-1">
            No. Pesanan
          </div>
          <div className="font-semibold ">
            <SkeletonLoading />
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-neutral-600 font-medium mb-1">
            Tanggal Pesanan
          </div>
          <div className="font-semibold">
            <SkeletonLoading />
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className="space-y-4 mb-6">
        <OrderedProductItem />
      </div>

      {/* Order summary */}
      <div className="bg-neutral-50 rounded-lg p-4 mb-2">
        <div className="flex justify-between py-2">
          <span className="text-neutral-600">Subtotal Produk</span>
          <span>
            <SkeletonLoading width="144px" />
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-neutral-600">Ongkos Kirim</span>
          <SkeletonLoading width="100px" />
        </div>
        <div className="border-t border-neutral-200 my-2 "></div>
        <div className="flex justify-between pt-2 ">
          <span className="font-semibold">Total Pembayaran</span>
          <SkeletonLoading width="160px" />
        </div>
      </div>
    </div>
  );
}

function OrderedProductItem() {
  return (
    <Link
      href={`#`}
      className="flex gap-4 p-3 bg-white rounded-lg border border-neutral-100 hover:border-neutral-200 transition-colors shadow hover:shadow-md hover:bg-neutral-100"
    >
      <div className="flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden">
        <Image
          src="/images/Rectangle.png"
          alt={"loading transaction"}
          width={80}
          height={80}
          className="object-cover w-20 h-20"
        />
      </div>
      <div className="flex-grow">
        <SkeletonLoading width="144px" />
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-neutral-600">
          <SkeletonLoading width="64px" />
          <SkeletonLoading width="64px" />
          <SkeletonLoading width="64px" />
        </div>
      </div>
    </Link>
  );
}
