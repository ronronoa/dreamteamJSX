import type { InputHTMLAttributes, ReactNode } from "react"

type CommonInputVariant = "default" | "compact"

const styles: Record<CommonInputVariant, { label: string; input: string }> = {
  default: {
    label: "mb-1.5 block text-sm font-semibold text-gray-800",
    input: `
      rounded-xl bg-white border-2 border-gray-400
      py-3 text-sm text-gray-800
      focus:ring-2 focus:ring-purple-400 focus:border-purple-400
      shadow-sm
    `,
  },
  compact: {
    label: "mb-1 block text-lg font-medium text-slate-900",
    input: `
      h-9 rounded-md bg-gray-100 border border-gray-300
      text-sm text-gray-800
      focus:border-purple-500
    `,
  },
}

interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
  variant?: CommonInputVariant
}

/**
 * @example
 * // Basic input
 * <CommonInput
 * id="email"
 * label="Email Address"
 * type="email"
 * placeholder="[admin@gmail.com](mailto:admin@gmail.com)"
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
  ...props
}: CommonInputProps) {
  const { label: labelClass, input: inputClass } = styles[variant]

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className={labelClass}>
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        <input
          {...props}
          className={`
            w-full outline-none invalid:text-gray-400
            ${icon ? "pl-10" : "pl-4"} pr-4
            ${inputClass}
            ${className}
          `}
        />
      </div>
    </div>
  )
}
