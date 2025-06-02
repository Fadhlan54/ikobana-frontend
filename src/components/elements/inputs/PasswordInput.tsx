"use client";

import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import {
  FieldValues,
  UseFormRegister,
  RegisterOptions,
  Path,
} from "react-hook-form";

type PasswordInputProps<TFieldValues extends FieldValues> = {
  id: Path<TFieldValues>;
  label: string;
  error?: string;
  register: UseFormRegister<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput<TFieldValues extends FieldValues>({
  id,
  label,
  error,
  register,
  validation,
  ...props
}: PasswordInputProps<TFieldValues>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={id} className="block mb-1.5 font-semibold">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          className={`p-2 rounded-md w-full border ${
            error ? "border-red-500 outline-red-500" : "border-neutral-4 "
          } focus:outline-1 outline-neutral-6`}
          {...(register ? register(id, validation) : {})}
          {...props}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-5 hover:text-primary-1"
          onClick={handleShowPassword}
        >
          {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
