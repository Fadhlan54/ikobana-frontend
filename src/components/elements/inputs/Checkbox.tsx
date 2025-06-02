"use client";

import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type CheckboxProps<TFieldValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFieldValues>;
  value?: string | number;
  register: UseFormRegister<TFieldValues>;
};

export default function Checkbox<TFieldValues extends FieldValues>({
  id,
  label,
  name,
  value,
  register,
}: CheckboxProps<TFieldValues>) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="w-3.5 h-3.5 text-primary-1 bg-gray-100 border-gray-300 rounded focus:ring-primary-1"
        value={value || label}
        {...register(name)}
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
}
