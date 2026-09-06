import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "none" | "purple" | "orange" | "orangeLinear" | "someKindOfUniquePurpleToOrange" | "gray";
}

  const colors = {
    none: "",
    purple: "bg-[#6d02cd] hover:bg-[#480b7f] text-white",
    orange: "bg-[#f0752a] hover:bg-[#bc4608] text-white",
    orangeLinear: "bg-linear-to-b from-[#f0752a] to-[#be4809] hover:from-[#c14a0b] text-white",
    someKindOfUniquePurpleToOrange: "bg-linear-to-r from-purple-500 to-orange-400 hover:brightness-105 transition rounded-xl px-8 py-3 text-white font-semibold shadow-lg",
    gray: "bg-gray-200 hover:bg-gray-300 text-gray-500",
  };


/**
 * Reusable application button with a unified design.
 *
 * Keeps button styling consistent across the application while allowing
 * the color variant and additional Tailwind classes to be customized.
 *
 * Centralizing the default styles also makes it easy to change the
 * application's button design in one place.
 *
 * @example
 * ```tsx
 * <CommonButton>
 *   Purple Button
 * </CommonButton>
 *
 * <CommonButton variant="orange">
 *   Create Report
 * </CommonButton>
 *
 * <CommonButton variant="gray">
 *   Cancel
 * </CommonButton>
 *
 * <CommonButton
 *   variant="orange"
 *   className="w-full"
 *   type="submit"
 * >
 *   Sign In
 * </CommonButton>
 * ```
 */
export default function CommonButton({ children, variant = "purple", className = "", ...props }: ButtonProps) {

  return (
    <button
      {...props}
      className={`
        rounded-2xl
        ${colors[variant]}
        px-6 py-3
        font-semibold
        shadow-md
        transition-colors
        disabled:opacity-60
        active:scale-95
        hover:cursor-pointer
        ${className}
      `}
    >
      {children}
    </button>
  );
}
