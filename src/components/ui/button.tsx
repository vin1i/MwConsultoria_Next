import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "outline" | "solid";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, variant = "solid", className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-medium rounded transition-colors focus:outline-none focus:ring-2",
        variant === "outline"
          ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
          : "bg-primary text-white hover:bg-secondary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
