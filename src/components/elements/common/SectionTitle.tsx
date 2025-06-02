export default function SectionTitle({
  title,
  position = "center",
}: {
  title: string;
  position?: "left" | "center" | "right";
}) {
  return (
    <h2 className={`font-bold text-[28px] mb-4 md:mb-8 text-${position}`}>
      {title}
    </h2>
  );
}
