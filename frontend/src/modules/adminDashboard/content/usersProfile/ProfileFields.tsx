import type { InputHTMLAttributes } from "react";
import { InputBase, type InputBaseProps } from "@/components/base/input/input";

export function ProfileField({
  label,
  value,
  editing,
  onChange,
  ...inputProps
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "autoCapitalize">) {
  if (!editing) return <Field label={label} value={value || "Not set"} />;
  return (
    <label className="block min-w-0 border-b border-gray-100 pb-3">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <InputBase
        {...(inputProps as InputBaseProps)}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        wrapperClassName="mt-1 rounded-md border border-gray-300 bg-white shadow-none ring-0 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100"
        inputClassName="w-full rounded-md px-2.5 py-2 text-xs text-gray-900 outline-none"
      />
    </label>
  );
}

export function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border-b border-gray-100 pb-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 break-words text-xs text-gray-900">{value}</p>
    </div>
  );
}

export function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-medium text-gray-500">{label}</p>
      <p className="mt-0.5 break-words text-xs font-bold text-gray-900">{value}</p>
    </div>
  );
}

