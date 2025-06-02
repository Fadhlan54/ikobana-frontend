"use client";

import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/inputs/TextInput";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import Modal from "@/components/elements/Modal";
import { ProductData, CreateProductRequest } from "@/interface/product";
import { updateProduct } from "@/service/product.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/service/category.service";
import Image from "next/image";
import Select from "@/components/elements/inputs/Select";
import FileInput from "@/components/elements/inputs/FileInput";
import { CategoryType } from "@/interface/category";

export default function EditProductModal({
  product,
  handleCloseModal,
  setProducts,
  setProduct,
}: {
  product: ProductData;
  handleCloseModal: () => void;
  setProducts: React.Dispatch<React.SetStateAction<ProductData[]>>;
  setProduct: React.Dispatch<React.SetStateAction<ProductData | null>>;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CreateProductRequest>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      weight_per_unit: product.weight,
      category_id: product.category.ID,
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateProductRequest) => updateProduct(product.id, data),
    onSuccess: (data) => {
      const updatedProduct: ProductData = {
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
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );
      setProduct(null);
      toast.success("Produk berhasil diperbarui");
      handleCloseModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal memperbarui produk");
    },
  });

  const onSubmit = (data: CreateProductRequest) => {
    mutate({
      name: data.name,
      description: data.description,
      category_id: data.category_id,
      stock: data.stock,
      weight_per_unit: data.weight_per_unit,
      price: data.price,
      image: data.image,
    });
  };

  // Fix: Properly type the watched image value
  const watchedImage = watch("image");
  const currentImage =
    watchedImage instanceof FileList && watchedImage.length > 0
      ? watchedImage[0]
      : product.image;

  return (
    <Modal title="Edit Produk" onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-center">
          <div className="relative h-40 w-40">
            {typeof currentImage === "string" ? (
              <Image
                src={currentImage}
                alt={product.name}
                fill
                className="rounded object-cover"
              />
            ) : currentImage instanceof File ? (
              <Image
                src={URL.createObjectURL(currentImage)}
                alt={product.name}
                fill
                className="rounded object-cover"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                <span>No Image</span>
              </div>
            )}
          </div>
        </div>

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
        />

        <TextInput
          register={register}
          id="description"
          label="Deskripsi"
          placeholder="Masukkan deskripsi produk"
          error={errors.description?.message}
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
          type="number"
          label="Harga"
          prefix="Rp"
          placeholder="Masukkan harga produk"
          error={errors.price?.message}
          required
          validation={{
            min: {
              value: 0,
              message: "Harga produk minimal 0",
            },
          }}
        />

        <TextInput
          register={register}
          id="stock"
          type="number"
          label="Stok"
          placeholder="Masukkan jumlah stok"
          error={errors.stock?.message}
          required
          validation={{
            min: {
              value: 0,
              message: "Stok produk minimal 0",
            },
          }}
        />

        <TextInput
          register={register}
          id="weight_per_unit"
          type="number"
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
        />

        <FileInput
          register={register}
          id="image"
          label="Gambar Produk"
          accept="image/*"
          error={errors.image?.message}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            handleClick={handleCloseModal}
          >
            Batal
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? (
              <>
                <LoadingSpinner className="mr-2" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
