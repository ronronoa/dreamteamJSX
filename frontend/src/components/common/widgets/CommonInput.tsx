import type { InputHTMLAttributes, ReactNode } from "react";

interface CommonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

/**

* A reusable styled input component that supports all standard HTML
* `<input>` attributes, plus a label and optional icon.
*
* Additional props such as `type`, `value`, `onChange`, `placeholder`,
* `required`, `disabled`, `name`, etc. are forwarded directly to the
* underlying `<input>` element.
*
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
export default function CommonInput({ label, icon, className = "", ...props }: CommonInputProps) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-semibold text-gray-800 mb-1.5"
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="
            absolute left-3.5 top-1/2
            -translate-y-1/2
            text-gray-400
          ">
            {icon}
          </span>
        )}

        <input
          {...props}
          className={`
            w-full rounded-xl bg-white
            ${icon ? "pl-10" : "pl-4"}
            pr-4 py-3
            text-sm text-gray-800
            outline-none
            border-2
            focus:ring-2 focus:ring-purple-400
            shadow-sm
            invalid:text-gray-400
            ${className}
          `}
        />
      </div>
    </div>
  );
}
