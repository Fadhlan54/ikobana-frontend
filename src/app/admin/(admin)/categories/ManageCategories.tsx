import { getAllCategories } from "@/service/category.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Button from "@/components/elements/Button";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddCategoryModal from "./AddCategoryModal";
import { CategoryType, GetCategoryResponse } from "@/interface/category";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

type showModalType = "add" | "edit" | "delete";

export default function ManageCategories() {
  const [showModal, setShowModal] = useState<showModalType | null>(null);
  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(
    null
  );
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const { mutate, isPending } = useMutation<GetCategoryResponse>({
    mutationFn: getAllCategories,
    onSuccess: (data) => {
      setCategories(data.result);
    },
  });

  function handleShowAddModal() {
    setShowModal("add");
  }

  function handleShowEditModal(
    type: "edit" | "delete",
    category: CategoryType
  ) {
    setCurrentCategory(category);

    setShowModal(type);
  }

  function handleCloseModal() {
    setShowModal(null);
  }

  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <div>
      {showModal === "add" ? (
        <AddCategoryModal
          handleCloseModal={handleCloseModal}
          setCategories={setCategories}
        />
      ) : showModal === "edit" && currentCategory ? (
        <EditCategoryModal
          category={currentCategory}
          handleCloseModal={handleCloseModal}
          setCategories={setCategories}
          setCategory={setCurrentCategory}
        />
      ) : showModal === "delete" && currentCategory ? (
        <DeleteCategoryModal
          category={currentCategory}
          handleCloseModal={handleCloseModal}
          setCategories={setCategories}
          setCategory={setCurrentCategory}
        />
      ) : null}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Kelola Kategori</h1>
        <Button variant="primary" handleClick={handleShowAddModal}>
          <FaPlus className="mr-2" /> Tambah Kategori
        </Button>
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories?.map((category, index) => (
                <tr key={`${category.id}-${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button
                        variant="warning"
                        size="sm"
                        handleClick={() =>
                          handleShowEditModal("edit", category)
                        }
                      >
                        <FaEdit className="mr-1" /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        handleClick={() =>
                          handleShowEditModal("delete", category)
                        }
                      >
                        <FaTrash className="mr-1" /> Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories?.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Tidak ada data kategori
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
