import Button from "@/components/elements/Button";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import Modal from "@/components/elements/Modal";
import { CategoryType } from "@/interface/category";
import { deleteCategory } from "@/service/category.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function DeleteCategoryModal({
  category,
  handleCloseModal,
  setCategory,
  setCategories,
}: {
  category: CategoryType;
  handleCloseModal: () => void;
  setCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}) {
  const { handleSubmit } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      setCategories((prev: CategoryType[]) =>
        prev.filter((c) => c.id !== category.id)
      );
      toast.success("Kategori berhasil dihapus");
      setCategory(null);
      handleCloseModal();
    },
    onError: () => {
      toast.error("Kategori gagal dihapus");
    },
  });

  const onSubmit = () => {
    mutate(category.id);
  };

  return (
    <Modal title="" onClose={handleCloseModal} showHeader={false}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center space-x-2 text-center">
          <RiErrorWarningLine size={80} className="text-alert-danger mb-2" />
          <h3 className="font-semibold text-3xl">Hapus Kategori</h3>
          <p className="text-center mt-1 text-neutral-7">
            Apakah Anda yakin ingin menghapus kategori{" "}
            <span className="font-semibold">{category.name}</span>?
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
