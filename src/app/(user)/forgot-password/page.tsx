"use client";

import { useState } from "react";
import Submitted from "./Submitted";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return <Submitted />;
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

        <ForgotPasswordForm setIsSubmitted={setIsSubmitted} />
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
