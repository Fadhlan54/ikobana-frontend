"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "@/components/elements/Button";
import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/service/auth.service";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import PasswordInput from "@/components/elements/inputs/PasswordInput";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormValues>();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
      router.push("/reset-password");
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!token) {
      toast.error("Invalid reset token");
      return;
    }
    mutate({ token, password: data.password });
  };

  useEffect(() => {
    if (!token) {
      toast.error(
        "Invalid reset link. Please request a new password reset link."
      );
    }
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gray-50 px-4">
        <Card>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Token Tidak Valid
            </h1>
            <p className="mt-3 text-gray-600">
              Token yang digunakan tidak valid atau sudah kadaluarsa. Silakan
              buat token reset password yang baru.
            </p>
          </div>
          <Link href="/forgot-password" passHref className="mx-auto block">
            <Button
              variant="primary"
              className="text-base text-center font-medium mx-auto"
            >
              Minta Link Reset Password Baru
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gray-50 px-4">
        <Card>
          <div className="text-center">
            <div className="mx-auto w-fit h-fit p-4 rounded-full bg-green-100">
              <FaCheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              Password Berhasil Direset
            </h2>
            <p className="mt-2 text-gray-600">
              Password Anda berhasil direset. Silakan login menggunakan password
              baru.
            </p>
          </div>
          <Link href="/" passHref className="mx-auto block">
            <Button
              variant="primary"
              className="text-base text-center font-medium mx-auto"
            >
              Kembali ke beranda
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gray-50 px-4">
      <Card>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Reset Your Password
          </h1>
          <p className="mt-3 text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PasswordInput
            register={register}
            id="password"
            label="New Password"
            type="password"
            placeholder="Enter new password"
            error={errors.password?.message}
            required
            validation={{
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            }}
          />

          <PasswordInput
            register={register}
            id="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            required
            validation={{
              validate: (value: string) =>
                value === watch("password") || "Passwords do not match",
            }}
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
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>
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
