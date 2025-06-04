"use client";

import Button from "@/components/elements/Button";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ManageProducts from "./ManageProducts";

type showModalType = "add" | "edit" | "delete";

export default function ProductsManagement() {
  const [showModal, setShowModal] = useState<showModalType | null>(null);
  function handleShowAddModal() {
    setShowModal("add");
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Kelola Produk</h1>
        <Button variant="primary" handleClick={handleShowAddModal}>
          <FaPlus className="mr-2" /> Tambah Produk
        </Button>
      </div>
      <ManageProducts showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
