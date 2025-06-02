export default function DataContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border p-4 md:p-6 rounded-lg border-neutral-3 shadow-md">
      <h1 className="text-lg font-semibold mb-2">{title}</h1>
      {children}
    </div>
  );
}
