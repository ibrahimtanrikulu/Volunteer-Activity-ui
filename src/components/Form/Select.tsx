import { forwardRef, type SelectHTMLAttributes } from "react";
import clsx from "clsx";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
};

const SelectInput = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, className, options, ...rest }, ref) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        ref={ref}
        {...rest}
        className={clsx(
          "w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
);

export default SelectInput;