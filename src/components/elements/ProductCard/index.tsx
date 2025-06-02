"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../Button";
import CartItemCounter from "../CartItemCounter/page";
import SkeletonLoading from "../loading/SkeletonLoading";

type ProductCardProps = {
  id: number;
  image?: string;
  name: string;
  desc: string;
  weight: number;
  stock: number;
  price: number;
  loading?: boolean;
};

export default function ProductCard({
  id,
  image = "/images/Rectangle.png",
  name,
  desc,
  weight,
  stock,
  price,
  loading = false,
}: ProductCardProps) {
  const [count, setCount] = useState(1);

  const handleAddToCart = () => {
    try {
      const cart = localStorage.getItem("cart") || "[]";
      const parsedCart: { id: number; count: number }[] = JSON.parse(cart);

      const existingItemIndex = parsedCart.findIndex((item) => item.id === id);

      if (existingItemIndex >= 0) {
        parsedCart[existingItemIndex].count += count;
      } else {
        parsedCart.push({ id, count });
      }

      localStorage.setItem("cart", JSON.stringify(parsedCart));
      toast.success("Produk berhasil ditambahkan ke keranjang");
    } catch {
      toast.error("Gagal menambahkan produk ke keranjang");
    }
  };

  return (
    <article className="rounded-lg border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {loading ? (
        <div className="w-full h-48 bg-neutral-100 animate-pulse" />
      ) : (
        <Link href={`/products/${id}`} className="block relative h-48 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      )}

      <div className="p-4 space-y-2">
        {loading ? (
          <LoadingContent />
        ) : (
          <>
            <div>
              <Link
                href={`/products/${id}`}
                className="font-bold text-primary-600 hover:text-primary-700 transition-colors line-clamp-1"
                title={name}
              >
                {name}
              </Link>
              <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500">{weight}g</span>
              <span
                className={`font-medium ${
                  stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock > 0 ? "Tersedia" : "Habis"}
              </span>
            </div>

            <p className="font-bold text-gray-500">
              {price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              })}
            </p>

            <div className="flex justify-between items-center pt-2">
              <CartItemCounter
                count={count}
                setCount={setCount}
                productID={id}
                stock={stock}
              />

              <Button
                handleClick={handleAddToCart}
                className="flex items-center gap-1.5 text-sm px-3 py-2 bg-primary-600 hover:bg-primary-700"
                disabled={stock <= 0}
              >
                <FaPlus size={12} />
                <span>Keranjang</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

function LoadingContent() {
  return (
    <div className="space-y-2">
      <SkeletonLoading className="h-6 w-3/4 bg-gray-200" />
      <SkeletonLoading className="h-4 w-full bg-gray-200" />
      <SkeletonLoading className="h-4 w-2/3 bg-gray-200" />
      <SkeletonLoading className="h-4 w-1/2 bg-gray-200" />
      <div className="flex justify-between pt-2">
        <SkeletonLoading className="h-8 w-1/3 bg-gray-200" />
        <SkeletonLoading className="h-8 w-1/4 bg-gray-200" />
      </div>
    </div>
  );
}
