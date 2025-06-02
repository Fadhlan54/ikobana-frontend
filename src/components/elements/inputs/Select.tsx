import {
  FieldValues,
  Path,
  UseFormRegister,
  Controller,
  Control,
} from "react-hook-form";

type Options = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

type SelectProps<TFieldValues extends FieldValues> = {
  id: Path<TFieldValues>;
  label?: string;
  options: Options[];
  placeholder?: string;
  register?: UseFormRegister<TFieldValues>;
  control?: Control<TFieldValues>;
  error?: string;
  required?: boolean;
};

export default function Select<TFieldValues extends FieldValues>({
  id,
  label,
  options,
  placeholder,
  register,
  control,
  error,
  required,
}: SelectProps<TFieldValues>) {
  if (register) {
    return (
      <div>
        {label && (
          <label htmlFor={id} className="block font-semibold text-sm mb-0.5">
            {label}
          </label>
        )}
        <select
          {...register(id)}
          className="border block border-neutral-4 rounded-md p-1.5 w-full text-sm"
          required={required}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option
              key={`${id}-${option.value}-${index}`}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  if (!control) {
    throw new Error("Either register or control must be provided");
  }

  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <div>
          <label htmlFor={id} className="block font-semibold text-sm mb-0.5">
            {label}
          </label>
          <select
            {...field}
            className="border block border-neutral-4 rounded-md p-1.5 w-full text-sm"
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option, index) => (
              <option
                key={`option-select-${option.value}-${index}`}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    />
  );
}
