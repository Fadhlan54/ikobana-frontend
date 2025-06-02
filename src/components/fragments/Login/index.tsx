"use client";

import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { setShowModal } from "@/redux/slices/modalManagementSlice";
import Modal from "../../elements/Modal";
import TextInput from "@/components/elements/inputs/TextInput";
import PasswordInput from "@/components/elements/inputs/PasswordInput";
import Button from "@/components/elements/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/service/auth.service";
import { setCookie } from "@/utils/cookies";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { setUser } from "@/redux/slices/user";
import { AddressResponse } from "@/interface/address";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const result = data.result;
      setCookie({
        key: "at",
        value: result.access_token,
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: false,
      });
      setCookie({
        key: "rt",
        value: result.refresh_token,
        maxAge: 60 * 60 * 24 * 7,
      });

      const userData = data.result.user;
      const userAddresses = userData.addresses.map(
        (address: AddressResponse) => ({
          id: address.id,
          label: address.label,
          city: address.city,
          district: address.district,
          subDistrict: address.sub_district,
          street: address.street,
          postalCode: address.postal_code,
        })
      );

      dispatch(
        setUser({
          id: userData.id,
          name: userData.fullname,
          email: userData.email,
          phone: userData.phone_number,
          addresses: userAddresses,
          role: userData.role,
        })
      );
      toast.success("Login berhasil");

      dispatch(setShowModal(null));
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            toast.error("Email atau password salah");
            return;
          case 403:
            toast.error("Email belum diverifikasi");
            return;
        }
      }
      toast.error("Something went wrong!");
    },
  });

  const handleLogin = (data: FormValues) => {
    mutate(data);
  };

  const handleClickRegister = () => {
    dispatch(setShowModal("register"));
  };

  const handleForgotPasswordClick = () => {
    dispatch(setShowModal(null));

    router.push("/forgot-password");
  };

  return (
    <Modal title="Masuk">
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <TextInput
          id="email"
          label="Email"
          placeholder="Masukkan email"
          type="email"
          error={errors.email?.message}
          register={register}
          validation={{ required: "Email harus diisi" }}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Masukkan password"
          error={errors.password?.message}
          register={register}
          validation={{ required: "Password harus diisi" }}
        />

        <button
          className="text-sm font-semibold ml-auto block mt-1 mb-4 text-neutral-8 hover:underline hover:text-primary-1"
          onClick={handleForgotPasswordClick}
        >
          Lupa Password?
        </button>
        <Button
          variant="primary"
          type="submit"
          disabled={isPending}
          size="lg"
          full
        >
          {isPending ? (
            <>
              <LoadingSpinner /> Loading ...
            </>
          ) : (
            `Masuk`
          )}
        </Button>
        <p className="text-center mt-3 text-sm">
          Belum punya akun?{" "}
          <button
            onClick={handleClickRegister}
            className="text-primary-1 hover:underline font-semibold"
          >
            Daftar
          </button>
        </p>
      </form>
    </Modal>
  );
}
