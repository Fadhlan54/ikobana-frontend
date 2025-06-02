"use client";

import Button from "@/components/elements/Button";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import Modal from "@/components/elements/Modal";
import { ProductData } from "@/interface/product";
import { deleteProduct } from "@/service/product.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function DeleteProductModal({
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
  const { handleSubmit } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProduct(product.id),
    onSuccess: () => {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      toast.success("Produk berhasil dihapus");
      handleCloseModal();
      setProduct(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal menghapus produk");
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    <Modal title="" onClose={handleCloseModal} showHeader={false}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center space-x-2 text-center">
          <RiErrorWarningLine size={80} className="text-alert-danger mb-2" />
          <h3 className="font-semibold text-3xl">Hapus Produk</h3>
          <p className="text-center mt-1 text-neutral-7">
            Apakah Anda yakin ingin menghapus produk{" "}
            <span className="font-semibold">{product.name}</span>?
          </p>
        </div>

        <div className="flex justify-center space-x-3 pt-4">
          <Button type="button" variant="danger" handleClick={handleCloseModal}>
            Batal
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {isPending ? (
              <>
                <LoadingSpinner className="mr-2" />
                Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
