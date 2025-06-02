"use client";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface FileInputProps<TFieldValues extends FieldValues> {
  id: Path<TFieldValues>;
  label: string;
  register: UseFormRegister<TFieldValues>;
  error?: string;
  required?: boolean;
  accept?: string;
}

export default function FileInput<TFieldValues extends FieldValues>({
  id,
  label,
  register,
  error,
  required = false,
  accept,
}: FileInputProps<TFieldValues>) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type="file"
        {...register(id)}
        accept={accept}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-1 file:text-white hover:file:bg-primary-2"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
