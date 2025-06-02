"use client";

import TextInput from "@/components/elements/inputs/TextInput";
import Modal from "../../elements/Modal";
import PasswordInput from "@/components/elements/inputs/PasswordInput";
import Button from "@/components/elements/Button";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import { useMutation } from "@tanstack/react-query";
import { register as registerService } from "@/service/auth.service";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export default function RegisterModal() {
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      dispatch(setShowModal(null));
      toast.success("Pendaftaran berhasil, cek email untuk verifikasi");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  const handleClickLogin = () => {
    dispatch(setShowModal("login"));
  };
  return (
    <Modal title="Daftar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 mb-6">
          <TextInput
            id="email"
            label="Email"
            placeholder="Masukkan email"
            error={errors.email?.message}
            register={register}
            validation={{ required: "Email harus diisi" }}
          />
          <TextInput
            id="name"
            label="Nama Lengkap"
            placeholder="Masukkan nama"
            register={register}
            validation={{ required: "Nama harus diisi" }}
            error={errors.name?.message}
          />
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Masukkan password"
            register={register}
            validation={{
              required: "Password harus diisi",
              minLength: { value: 8, message: "Password minimal 8 karakter" },
            }}
            error={errors.password?.message}
          />
          <PasswordInput
            id="confirmPassword"
            label="Konfirmasi Password"
            placeholder="Masukkan kembali password"
            register={register}
            validation={{
              required: "Password harus diisi",
              minLength: { value: 8, message: "Password minimal 8 karakter" },
              validate: (value) =>
                value === watch("password") || "Password tidak cocok",
            }}
            error={errors.confirmPassword?.message}
          />
          <div>
            <TextInput
              id="phone"
              label="Nomor Telepon"
              placeholder="Masukkan nomor tanpa diawali +62"
              register={register}
              validation={{
                required: "Nomor telepon harus diisi",
                pattern: {
                  value: /^8[1-9][0-9]{7,10}$/,
                  message: "Nomor telepon tidak valid",
                },
              }}
              type="number"
              error={errors.phone?.message}
              prefix="62"
            />
            <p className="text-xs mt-1">Contoh: 81212345678</p>
          </div>
        </div>

        <Button
          variant="primary"
          handleClick={() => {}}
          size="lg"
          full
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <LoadingSpinner /> Loading ...
            </>
          ) : (
            `Daftar`
          )}
        </Button>
      </form>
      <p className="text-center mt-3 text-sm">
        Sudah punya akun?{" "}
        <button
          onClick={handleClickLogin}
          className="text-primary-1 hover:underline font-semibold"
        >
          Masuk
        </button>
      </p>
    </Modal>
  );
}
