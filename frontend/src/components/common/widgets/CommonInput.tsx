import { type ComponentType, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react"
import { InputBase, type InputBaseProps } from "@/components/base/input/input";

type CommonInputVariant = "default" | "compact"

const styles: Record<CommonInputVariant, { label: string; wrapper: string; input: string }> = {
  default: {
    label: "mb-1.5 block text-sm font-semibold text-gray-800",
    wrapper: "rounded-xl border-2 border-gray-400 bg-white shadow-sm ring-0 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400",
    input: "rounded-xl py-3 text-sm text-gray-800",
  },
  compact: {
    label: "mb-1 block text-lg font-medium text-slate-900",
    wrapper: "h-9 rounded-md border border-gray-300 bg-gray-100 shadow-none ring-0 focus-within:border-purple-500",
    input: "h-full rounded-md py-0 text-sm text-gray-800",
  },
}

export interface CommonInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "autoCapitalize"> {
  label?: string
  icon?: ReactNode
  variant?: CommonInputVariant
  showPasswordToggle?: boolean
  autoCapitalize?: boolean
  errorMessage?: string
}

/**
 * @example
 * // Basic input
 * <CommonInput
 * id="email"
 * label="Email Address"
 * type="email"
 * placeholder="admin@gmail.com"
 * />
 *
 * @example
 * // Controlled input with an icon
 * const [email, setEmail] = useState("");
 *
 * <CommonInput
 * id="email"
 * label="Email Address"
 * type="email"
 * value={email}
 * onChange={(e) => setEmail(e.target.value)}
 * placeholder="admin@gmail.com"
 * icon={<Mail size={18} />}
 * required
 * />
 *
 * @example
 * // Password input
 * <CommonInput
 * id="password"
 * label="Password"
 * type="password"
 * placeholder="Enter your password"
 * required
 * />
 */
export default function CommonInput({
  label,
  icon,
  variant = "default",
  className = "",
  showPasswordToggle = false,
  autoCapitalize = false,
  errorMessage,
  type,
  onChange,
  ...props
}: CommonInputProps) {
  const { label: labelClass, wrapper: wrapperClassName, input: inputClass } = styles[variant]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (autoCapitalize) {
      event.target.value = event.target.value.toUpperCase()
    }

    onChange?.(event)
  }

  // Dynamic padding so icon and password toggle never overlap content
  // InputBase positions leading icons at 12px with a 20px icon; leave 16px
  // between the icon and text so values and placeholders never touch it.
  const leftPadding = icon ? "pl-9" : "pl-4";
  const rightPadding =
    showPasswordToggle && type === "password" ? "pr-12" : "pr-4";
  const LeadingIcon: ComponentType<HTMLAttributes<HTMLOrSVGElement>> | undefined = icon
    ? ({ className }) => <span className={className}>{icon}</span>
    : undefined;

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className={`${labelClass} flex flex-wrap items-baseline justify-between gap-x-2`}>
          <span>{label}</span>
          {errorMessage && <span id={`${props.id}-error`} role="alert" className="text-xs font-medium text-red-700">{errorMessage}</span>}
        </label>
      )}

      <div>
        <InputBase
          {...(props as InputBaseProps)}
          aria-invalid={Boolean(errorMessage)}
          aria-describedby={errorMessage ? `${props.id}-error` : props["aria-describedby"]}
          type={type}
          icon={LeadingIcon}
          hidePasswordToggle={!showPasswordToggle}
          onChange={handleChange}
          wrapperClassName={wrapperClassName}
          inputClassName={`w-full outline-none invalid:text-gray-400 ${leftPadding} ${rightPadding} ${inputClass} ${className}`}
        />
      </div>
    </div>
  )
}
