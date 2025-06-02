"use client";

import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/inputs/TextInput";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import Modal from "@/components/elements/Modal";
import {
  ProductData,
  CreateProductRequest,
  CreateProductResponse,
} from "@/interface/product";
import { createProduct } from "@/service/product.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
//import FileInput from "@/components/elements/inputs/FileInput";
import Select from "@/components/elements/inputs/Select";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/service/category.service";
import { CategoryType } from "@/interface/category";
import FileInput from "@/components/elements/inputs/FileInput";

export default function AddProductModal({
  handleCloseModal,
  setProducts,
}: {
  handleCloseModal: () => void;
  setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateProductRequest>();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data: CreateProductResponse) => {
      const newProduct: ProductData = {
        id: data.result.ID,
        name: data.result.name,
        description: data.result.description,
        price: data.result.price,
        image: data.result.image_url,
        stock: data.result.stock,
        weight: data.result.weight_per_unit,
        category: {
          ID: data.result.category.ID,
          name: data.result.category.name,
        },
      };
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Produk berhasil ditambahkan");
      reset();
      handleCloseModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menambahkan produk");
    },
  });

  const onSubmit = (data: CreateProductRequest) => {
    mutate(data);
  };

  return (
    <Modal title="Tambah Produk" onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          register={register}
          id="name"
          label="Nama Produk"
          placeholder="Masukkan nama produk"
          error={errors.name?.message}
          required
          validation={{
            minLength: {
              value: 3,
              message: "Nama produk minimal 3 karakter",
            },
          }}
          size="sm"
        />

        <TextInput
          register={register}
          id="description"
          label="Deskripsi"
          placeholder="Masukkan deskripsi produk"
          error={errors.description?.message}
          size="sm"
        />

        {categories && (
          <Select
            control={control}
            id="category_id"
            label="Kategori"
            options={categories.result.map((cat: CategoryType) => ({
              value: cat.id,
              label: cat.name,
            }))}
            error={errors.category_id?.message}
            placeholder="Pilih kategori produk"
            required
          />
        )}

        <TextInput
          register={register}
          id="price"
          label="Harga"
          type="number"
          placeholder="Masukkan harga produk"
          prefix="Rp"
          error={errors.price?.message}
          required
          validation={{
            min: {
              value: 0,
              message: "Harga produk minimal Rp0",
            },
          }}
          size="sm"
        />

        <TextInput
          register={register}
          id="stock"
          label="Stok"
          type="number"
          placeholder="Masukkan jumlah stok"
          error={errors.stock?.message}
          required
          validation={{
            min: {
              value: 0,
              message: "Stok produk minimal 0",
            },
          }}
          size="sm"
        />

        <TextInput
          register={register}
          id="weight_per_unit"
          label="Berat per Unit (gram)"
          placeholder="Masukkan berat produk"
          error={errors.weight_per_unit?.message}
          required
          validation={{
            min: {
              value: 0,
              message: "Berat produk minimal 0",
            },
          }}
          size="sm"
        />

        <FileInput
          register={register}
          id="image"
          label="Gambar Produk"
          accept="image/*"
          error={errors.image?.message}
          required
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="danger" handleClick={handleCloseModal}>
            Batal
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? (
              <>
                <LoadingSpinner className="mr-2" />
                Menambahkan...
              </>
            ) : (
              "Tambah Produk"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
