"use client";

import TextInput from "@/components/elements/inputs/TextInput";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/elements/Button";
import { FaRegEnvelope } from "react-icons/fa";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import { requestResetPassword } from "@/service/auth.service";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setShowModal } from "@/redux/slices/modalManagementSlice";

type FormValues = {
  email: string;
};

export default function ForgotPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      setIsSubmitted(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    mutate(data.email);
  };

  const handleBackToLogin = () => {
    dispatch(setShowModal("login"));
    router.push("/");
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center">
            <div className="mx-auto w-fit h-fit p-4  rounded-full bg-primary-1/10">
              <FaRegEnvelope size={40} className="text-primary-1" />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Email Terkirim
            </h2>
            <p className="mt-2 text-gray-600">
              Kami telah mengirimkan instruksi untuk mereset kata sandi Anda ke
              email Anda.
            </p>
          </div>
          <Link href="/" passHref className="mx-auto block">
            <Button
              variant="primary"
              className="text-base text-center font-medium mx-auto"
            >
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-70px)]  flex items-center justify-center bg-gray-50 px-4">
      <Card>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Lupa Kata Sandi?</h1>
          <p className="mt-3 text-gray-600">
            Masukkan email Anda dan kami akan mengirimkan link untuk mereset
            kata sandi.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextInput
            register={register}
            id="email"
            label="Email address"
            type="email"
            placeholder="your.email@example.com"
            error={errors.email?.message}
            required
          />

          <div>
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          <Button
            className="font-medium  hover:text-primary-1 hover:underline"
            handleClick={handleBackToLogin}
          >
            Remember your password? Sign in
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Card({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <div
      className="w-full max-w-md p-8 space-y-6 border border-neutral-4 shadow-md rounded-md"
      style={{ ...(width && { maxWidth: width }) }}
    >
      {children}
    </div>
  );
}
