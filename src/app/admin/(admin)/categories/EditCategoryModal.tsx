import Button from "@/components/elements/Button";
import TextInput from "@/components/elements/inputs/TextInput";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import Modal from "@/components/elements/Modal";
import { CategoryType, CreateCategoryResponse } from "@/interface/category";
import { updateCategory } from "@/service/category.service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
};

export default function EditCategoryModal({
  category,
  setCategory,
  handleCloseModal,
  setCategories,
}: {
  category: CategoryType;
  setCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  handleCloseModal: () => void;
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: category.name,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateCategory,
    onSuccess: (data: CreateCategoryResponse) => {
      setCategories((prev: CategoryType[]) =>
        prev.map((c) => (c.id === category.id ? data.result : c))
      );
      toast.success("Perubahan berhasil disimpan");
      setCategory(null);
      handleCloseModal();
    },
    onError: () => {
      toast.error("Gagal menyimpan perubahan kategori");
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({ id: category.id, name: data.name });
  };

  return (
    <Modal title="Ubah Kategori" onClose={handleCloseModal}>
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
          <Button type="button" variant="secondary" handleClick={() => {}}>
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
