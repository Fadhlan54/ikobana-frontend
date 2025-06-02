import { CgSpinner } from "react-icons/cg";

export default function LoadingSpinner({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <CgSpinner size={size} className={`animate-spin ${className}`} />;
}
