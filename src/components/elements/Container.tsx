export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg p-4 border border-neutral-4">{children}</div>
  );
}
