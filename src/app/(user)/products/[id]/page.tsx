"use client";

import { getProductByID } from "@/service/product.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import Image from "next/image";
import Button from "@/components/elements/Button";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CartItemCounter from "@/components/elements/CartItemCounter/page";
import Link from "next/link";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const [count, setCount] = useState(1);
  const {
    data,
    mutate,
    isPending = true,
  } = useMutation({
    mutationFn: getProductByID,
    onError: () => {
      toast.error("Gagal memuat detail produk");
      router.push("/products");
    },
  });

  useEffect(() => {
    mutate(id);
  }, [mutate, id]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner size={72} className="text-primary-3" />
      </div>
    );
  }

  if (!data?.result) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
        <p className="text-gray-500">Produk tidak ditemukan</p>
        <Button
          variant="secondary"
          handleClick={() => router.push("/products")}
        >
          <FaArrowLeft className="mr-2" />
          Kembali ke Daftar Produk
        </Button>
      </div>
    );
  }

  const product = data.result;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="md:flex">
          {/* Product Image Section */}
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden bg-gray-50">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-100">
            <div>
              <div>
                <div className="flex items-center w-full justify-between mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 ">
                    {product.name}
                  </h1>
                  <div className="bg-primary-1/10 text-primary-1 px-3 py-1 rounded-full text-sm font-medium">
                    Stok: {product.stock}
                  </div>
                </div>

                <p className=" text-gray-500">
                  Kategori:{" "}
                  <Link
                    href={`/products?${new URLSearchParams({
                      "category[]": product.category.ID.toString(),
                    })}`}
                    className="text-primary-1 hover:underline"
                  >
                    {product.category.name}
                  </Link>
                </p>
              </div>
            </div>

            {/* Price Section */}
            <div className="mt-6 p-4 bg-primary-1/10 rounded-lg">
              <span className="text-3xl font-bold text-primary-1">
                Rp{product.price.toLocaleString("id-ID")}
              </span>
              <div className="mt-2 flex items-center">
                <span className="text-sm text-gray-500">
                  Berat:{" "}
                  <span className="font-medium">
                    {product.weight_per_unit}g
                  </span>
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  SKU: <span className="font-medium">#{product.ID}</span>
                </span>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 ">
                Deskripsi
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-10">
              <div className="flex flex-col  sm:flex-row items-center gap-4 md:gap-6">
                <div className="w-full sm:w-auto">
                  <CartItemCounter
                    productID={product.id}
                    count={count}
                    setCount={setCount}
                    stock={product.stock}
                  />
                </div>
                <div>
                  <Button
                    variant="primary"
                    className="w-fit flex-1 justify-center py-3"
                    handleClick={() => {
                      toast.success(
                        `${count} ${product.name} ditambahkan ke keranjang`
                      );
                    }}
                  >
                    <FaShoppingCart className="mr-2" />
                    Tambah ke Keranjang
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
