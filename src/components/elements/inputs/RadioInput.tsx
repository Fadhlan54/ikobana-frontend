export default function RadioInput({
  id,
  children,
  isSelected,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  children: React.ReactNode;
  isSelected: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors mb-2 last:mb-0 ${
        isSelected
          ? "border-primary-1 bg-primary-0"
          : "border-neutral-3 hover:border-primary-4"
      }`}
    >
      <input type="radio" id={id} className="mt-1 flex-shrink-0" {...props} />
      <label htmlFor={id} className="block w-full cursor-pointer">
        {children}
      </label>
    </div>
  );
}
