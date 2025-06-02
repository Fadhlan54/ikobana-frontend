import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/inputs/TextInput";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import Modal from "@/components/elements/Modal";
import { CategoryType, CreateCategoryResponse } from "@/interface/category";
import { createCategory } from "@/service/category.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
};

export default function AddCategoryModal({
  handleCloseModal,
  setCategories,
}: {
  handleCloseModal: () => void;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: (data: CreateCategoryResponse) => {
      setCategories((prev: CategoryType[]) => [...prev, data.result]);
      toast.success("Kategori berhasil ditambahkan");
      handleCloseModal();
    },
    onError: () => {
      toast.error("Kategori gagal ditambahkan");
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data.name);
  };

  return (
    <Modal title="Tambah Kategori" onClose={handleCloseModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextInput
          register={register}
          id="name"
          label="Nama Kategori"
          placeholder="Masukkan nama kategori"
          error={errors.name?.message}
          required
          validation={{
            minLength: {
              value: 3,
              message: "Nama kategori minimal 3 karakter",
            },
          }}
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
              "Tambah Kategori"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
