"use client";

import {
  GetAllProductResponse,
  ProductData,
  ProductInterface,
} from "@/interface/product";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Button from "@/components/elements/Button";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";
import Image from "next/image";
import { getAllProducts } from "@/service/product.service";

type showModalType = "add" | "edit" | "delete";

export default function ProductsManagement() {
  const [showModal, setShowModal] = useState<showModalType | null>(null);
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(
    null
  );
  const [products, setProducts] = useState<ProductData[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: getAllProducts,
    onSuccess: (response: GetAllProductResponse) => {
      const result = response.result;
      setProducts(
        result.products.map((product: ProductInterface) => ({
          id: product.ID,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image_url,
          stock: product.stock,
          weight: product.weight_per_unit,
          category: {
            ID: product.category.ID,
            name: product.category.name,
          },
        }))
      );
    },
  });

  function handleShowAddModal() {
    setShowModal("add");
  }

  function handleShowEditModal(type: "edit" | "delete", product: ProductData) {
    setCurrentProduct(product);
    setShowModal(type);
  }

  function handleCloseModal() {
    setShowModal(null);
  }

  useEffect(() => {
    mutate({});
  }, [mutate]);

  return (
    <div className="container mx-auto p-4">
      {showModal === "add" ? (
        <AddProductModal
          handleCloseModal={handleCloseModal}
          setProducts={setProducts}
        />
      ) : showModal === "edit" && currentProduct ? (
        <EditProductModal
          product={currentProduct}
          handleCloseModal={handleCloseModal}
          setProducts={setProducts}
          setProduct={setCurrentProduct}
        />
      ) : showModal === "delete" && currentProduct ? (
        <DeleteProductModal
          product={currentProduct}
          handleCloseModal={handleCloseModal}
          setProducts={setProducts}
          setProduct={setCurrentProduct}
        />
      ) : null}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Kelola Produk</h1>
        <Button variant="primary" handleClick={handleShowAddModal}>
          <FaPlus className="mr-2" /> Tambah Produk
        </Button>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-auto max-w-full">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gambar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Produk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Berat (g)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.map((product, index) => (
                <tr key={`${product.id}-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 relative">
                      <Image
                        src={product.image || "/placeholder-product.jpg"}
                        alt={product.name}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-gray-500 text-xs line-clamp-2">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Rp{product.price.toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.weight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="warning"
                        size="sm"
                        handleClick={() => handleShowEditModal("edit", product)}
                      >
                        <FaEdit className="mr-1" /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        handleClick={() =>
                          handleShowEditModal("delete", product)
                        }
                      >
                        <FaTrash className="mr-1" /> Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {products?.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Tidak ada data produk
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
