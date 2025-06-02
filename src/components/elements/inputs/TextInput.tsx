"use client";

import { JSX } from "react";
import {
  UseFormRegister,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";

type TextInputProps<TFieldValues extends FieldValues> = {
  id: Path<TFieldValues>;
  label?: string;
  placeholder: string;
  type?: "text" | "email" | "number" | "tel";
  size?: "sm" | "md" | "lg";
  prefix?: string;
  postFix?: JSX.Element;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  error?: string;
  register: UseFormRegister<TFieldValues>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean | string;
  disabled?: boolean;
  inputClassName?: string;
};

const padding = {
  input: {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  },
  withPrefix: {
    sm: "pl-7",
    md: "pl-9",
    lg: "pl-10",
  },
};

const fontSize = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export default function TextInput<TFieldValues extends FieldValues>({
  id,
  label,
  placeholder,
  type = "text",
  size = "md",
  prefix,
  error,
  register,
  handleChange,
  validation = {},
  postFix,
  required,
  disabled,
  inputClassName,
  ...props
}: TextInputProps<TFieldValues>) {
  const combinedValidation = {
    ...validation,
    ...(required && {
      required:
        typeof required === "string" ? required : `${label} harus diisi`,
    }),
  };

  return (
    <div
      style={{
        fontSize: fontSize[size],
      }}
    >
      {label && (
        <label
          htmlFor={id}
          className={`block mb-1.5 font-semibold ${fontSize[size]}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span
            className={`absolute pointer-events-none select-none inset-y-0 font-medium text-neutral-5 flex items-center ${padding.input[size]}  ${fontSize[size]}`}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          className={`appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-md w-full border ${
            error ? "border-red-500 outline-red-500" : "border-neutral-4"
          } focus:outline-1 outline-neutral-6 ${padding.input[size]} ${
            fontSize[size]
          } ${prefix ? padding.withPrefix[size] : ""} ${inputClassName}`}
          type={type}
          placeholder={placeholder}
          {...(handleChange
            ? { onChange: (e) => handleChange(e) }
            : register
            ? register(id, combinedValidation)
            : {})}
          {...props}
          disabled={disabled}
        />
        {postFix && (
          <div
            className={`absolute pointer-events-none select-none inset-y-0 right-0 font-medium text-neutral-5 flex items-center ${padding.input[size]}`}
          >
            {postFix}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
