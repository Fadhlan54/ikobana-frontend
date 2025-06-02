export default function SkeletonLoading({
  width = "100%",
  height = "20px",
  className = "",
}: {
  width?: string;
  height?: string;
  bgColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded bg-neutral-4 ${className}`}
      style={{ width: width, height: height }}
    ></div>
  );
}
