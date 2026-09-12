"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "aqua" | "navy";
  fullWidth?: boolean;
}

export default function PillButton({
  children,
  variant = "aqua",
  fullWidth = false,
  className,
  ...props
}: PillButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-pill px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        variant === "aqua" &&
          "bg-aqua text-navy hover:bg-aqua-dark",
        variant === "navy" && "bg-navy text-white hover:bg-navy-light",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
