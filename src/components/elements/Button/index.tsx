"use client";

import { useMemo } from "react";

const buttonSize = {
  sm: "gap-1 text-[12px] leading-[16px] px-[8px] py-[4px] rounded",
  md: "gap-2 text-[14px] leading-[20px] px-[12px] py-[6px] rounded-md",
  lg: "gap-2 text-[16px] leading-[24px] px-[16px] py-[8px] rounded-md",
};

// button size tanpa padding untuk variant transparent
const buttonSizeWithoutPadding = {
  sm: "gap-1 text-xs rounded-md",
  md: "gap-2 text-sm rounded-md",
  lg: "gap-2 text-base rounded-md",
};

const buttonVariant = {
  primary:
    "bg-primary-1 hover:bg-primary-2 focus:bg-primary-3 text-white disabled:bg-accent-3",
  secondary:
    "bg-secondary-1 hover:bg-secondary-2 focus:bg-secondary-3 text-white",
  danger:
    "bg-alert-danger hover:bg-alert-danger-2 focus:bg-alert-danger-3 text-white",
  warning:
    "bg-alert-warning hover:bg-alert-warning-2 focus:bg-alert-warning-3 text-white",
  soft: "bg-primary-1/5 hover:bg-primary-2/10 border-[1.25px] border-primary-1 focus:bg-soft-3 text-primary-1",
  white:
    "bg-white hover:bg-soft-1 focus:bg-soft-2 border-[1.5px] border-primary-1 text-primary-1",
  transparent:
    "bg-transparent text-primary-1 hover:text-primary-2 focus:text-primary-3 hover:underline",
};

export default function Button({
  children,
  size = "md",
  handleClick,
  variant = "primary",
  full = false,
  type = "button",
  className = "",
  disabled = false,
  buttonRef,
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  handleClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "soft"
    | "white"
    | "transparent";
  full?: boolean;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  buttonRef?: React.RefObject<HTMLButtonElement>;
}) {
  const computedClassName = useMemo(() => {
    const sizeClass =
      variant === "transparent"
        ? buttonSizeWithoutPadding[size]
        : buttonSize[size];

    const baseClass = `flex items-center font-medium transition-colors duration-150 ease-in-out ${sizeClass} ${buttonVariant[variant]}`;
    const fullClass = full ? "w-full justify-center" : "";
    return `${baseClass} ${fullClass} ${className}`;
  }, [size, variant, full, className]);

  return (
    <button
      onClick={handleClick}
      className={computedClassName}
      disabled={disabled}
      ref={buttonRef}
      type={type}
    >
      {children}
    </button>
  );
}
