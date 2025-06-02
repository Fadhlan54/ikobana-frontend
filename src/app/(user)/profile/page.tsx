"use client";

import Button from "@/components/elements/Button";
import PasswordInput from "@/components/elements/inputs/PasswordInput";
import TextInput from "@/components/elements/inputs/TextInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEditAddress } from "@/redux/slices/editAddress";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import { selectUser, setUser } from "@/redux/slices/user";
import {
  deleteUserAddress,
  updateUserPassword,
  updateUserProfile,
} from "@/service/user.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";

type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
};

type ChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { mutate, isPending } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (_, data) => {
      toast.success("Profil berhasil diperbarui");
      dispatch(
        setUser({
          ...user,
          name: data.name,
          phone: data.phone,
        })
      );
    },
    onError: (error) => {
      toast.error(error.message || "Gagal memperbarui profil");
    },
  });

  const { mutate: mutateDeleteAddress, isPending: isPendingDelete } =
    useMutation({
      mutationFn: deleteUserAddress,
      onSuccess: (_, id) => {
        toast.success("Alamat berhasil dihapus");
        dispatch(
          setUser({
            ...user,
            addresses: user.addresses.filter((address) => address.id !== id),
          })
        );
      },
      onError: (error) => {
        toast.error(error.message || "Gagal menghapus alamat");
      },
    });

  const { mutate: mutateChangePassword, isPending: isPendingChangePassword } =
    useMutation({
      mutationFn: updateUserPassword,
      onSuccess: () => {
        toast.success("Password berhasil diperbarui");
      },
      onError: (error) => {
        toast.error(error.message || "Gagal memperbarui password");
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const {
    register: registerChangePassword,
    watch: watchChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: errorsChangePassword },
  } = useForm<ChangePasswordFormValues>();

  const handleShowAddressModal = (type: "add" | "edit", id?: number) => {
    dispatch(setEditAddress(id));
    dispatch(setShowModal(`${type}-address`));
  };

  const handleUpdateProfile = (data: ProfileFormValues) => {
    mutate(data);
  };

  const handleDeleteAddress = (id: number) => {
    mutateDeleteAddress(id);
  };

  const handleChangePassword = (data: ChangePasswordFormValues) => {
    mutateChangePassword(data);
  };

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, reset]);

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-0 py-6">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Profil Pengguna</h1>

      {/* Personal Information Section */}
      <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Informasi Pribadi
          </h2>
          {isDirty && (
            <span className="text-xs text-gray-500">
              *Anda memiliki perubahan yang belum disimpan
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              id="email"
              label="Email"
              placeholder="Email"
              register={register}
              disabled
            />

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                id="name"
                label="Nama Lengkap"
                placeholder="Nama Anda"
                register={register}
                validation={{
                  required: "Nama harus diisi",
                  minLength: {
                    value: 3,
                    message: "Nama terlalu pendek",
                  },
                }}
                error={errors.name?.message}
              />

              <TextInput
                id="phone"
                label="Nomor Telepon"
                placeholder="8123456789"
                register={register}
                validation={{
                  required: "Nomor telepon harus diisi",
                  pattern: {
                    value: /^8[1-9][0-9]{7,10}$/,
                    message: "Format nomor tidak valid (contoh: 8123456789)",
                  },
                }}
                type="tel"
                error={errors.phone?.message}
                prefix="+62"
                inputClassName="pl-11"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" variant="primary" disabled={isPending}>
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Ubah Password</h2>
          {isDirty && (
            <span className="text-xs text-gray-500">
              *Anda memiliki perubahan yang belum disimpan
            </span>
          )}
        </div>

        <form onSubmit={handleSubmitChangePassword(handleChangePassword)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PasswordInput
              id="oldPassword"
              label="Password Lama"
              placeholder="Masukkan password lama"
              register={registerChangePassword}
              validation={{
                required: "Password harus diisi",
                minLength: { value: 8, message: "Password minimal 8 karakter" },
              }}
              error={errorsChangePassword.oldPassword?.message}
            />
            <div />
            <PasswordInput
              id="newPassword"
              label="Password Baru"
              placeholder="Masukkan password baru"
              register={registerChangePassword}
              validation={{
                required: "Password harus diisi",
                minLength: { value: 8, message: "Password minimal 8 karakter" },
              }}
              error={errorsChangePassword.newPassword?.message}
            />
            <PasswordInput
              id="confirmNewPassword"
              label="Konfirmasi Password Baru"
              placeholder="Masukkan kembali password baru"
              register={registerChangePassword}
              validation={{
                required: "Password harus diisi",
                minLength: { value: 8, message: "Password minimal 8 karakter" },
                validate: (value) =>
                  value === watchChangePassword("newPassword") ||
                  "Password tidak cocok",
              }}
              error={errorsChangePassword.confirmNewPassword?.message}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={isPendingChangePassword}
            >
              Ubah Password
            </Button>
          </div>
        </form>
      </section>

      {/* Address Section */}
      <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Daftar Alamat</h2>
          <button
            onClick={() => handleShowAddressModal("add")}
            className="flex items-center gap-1 text-primary-1 hover:text-primary-2 transition-colors hover:underline cursor-pointer"
          >
            <GoPlus /> Tambah Alamat
          </button>
        </div>

        {user?.addresses && user.addresses.length > 0 ? (
          <div className="space-y-4">
            {user.addresses.map((address) => (
              <div
                key={`user-address-${address.id}`}
                className="flex flex-col sm:flex-row gap-4 border border-gray-200 hover:border-primary-300 transition-colors bg-white p-5 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-800">
                      {address.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{address.street}</p>
                  <p className="text-sm text-gray-600">
                    {address.subDistrict}, {address.district}, {address.city}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Kode Pos: {address.postalCode}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-1  ">
                  <button
                    onClick={() => handleShowAddressModal("edit", address.id)}
                    className="text-gray-500 hover:text-primary-1 hover:bg-primary-1/10 p-2 rounded-full transition-colors"
                    aria-label="Edit address"
                  >
                    <FaRegEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                    aria-label="Delete address"
                    disabled={isPendingDelete}
                  >
                    <FaRegTrashAlt size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <h3 className="mt-4 text-lg font-medium text-gray-700">
              Belum ada alamat tersimpan
            </h3>
            <p className="mt-2 text-gray-500 mb-6">
              Tambahkan alamat untuk mempermudah proses checkout
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
