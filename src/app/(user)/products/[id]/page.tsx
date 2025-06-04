"use client";

import { useParams } from "next/navigation";
import ProductDetailsCard from "./ProductDetailsCard";

export default function ProductDetails() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-semibold mb-4 px-2">Detail Produk</h1>
      <ProductDetailsCard id={id} />
    </div>
  );
}
