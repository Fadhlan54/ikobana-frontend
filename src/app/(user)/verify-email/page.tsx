"use client";

import LoadingSpinner from "@/components/elements/loading/LoadingSpinner";
import { verifyEmail } from "@/service/auth.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { toast } from "react-toastify";

function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const { mutate } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success("Email berhasil diverifikasi");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const resStatus = error.response?.status;
        if (resStatus === 404) {
          toast.error("Token tidak valid");
          return;
        }
        toast.error(error.response?.data.message);
      }
    },
    onSettled: () => {
      router.push("/");
    },
  });

  useEffect(() => {
    if (!token) {
      toast.error("Tidak ada token");
      router.push("/");
    } else {
      mutate(token);
    }
  }, [token, mutate, router]);

  return (
    <div className="h-[calc(100dvh-70px)] flex items-center justify-center">
      <div className="py-4 px-8 rounded-lg border border-neutral-4 max-w-[520px] flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-center text-primary-1 mb-4">
          Verifikasi Email
        </h2>
        <LoadingSpinner size={60} className="text-neutral-6" />
        <p className="text-lg text-center mt-2">
          Sedang memverifikasi email anda
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmail />
    </Suspense>
  );
}
