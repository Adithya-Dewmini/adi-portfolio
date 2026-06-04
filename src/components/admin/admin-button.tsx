import type { ReactNode } from "react";
import Link from "next/link";

interface AdminButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
}

const variantStyles = {
  primary: "bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] text-white shadow-lg shadow-sky-950/20",
  secondary: "border border-[#1E293B] bg-slate-950/40 text-[#F8FAFC] hover:border-sky-400/30 hover:text-[#38BDF8]",
  ghost: "border border-dashed border-[#1E293B] bg-slate-950/20 text-[#94A3B8] hover:text-white"
} as const;

export function AdminButton({
  children,
  href,
  variant = "primary",
  type = "button"
}: Readonly<AdminButtonProps>) {
  const className = `inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${variantStyles[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
}
