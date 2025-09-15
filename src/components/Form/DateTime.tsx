import { forwardRef, type InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...rest }, ref) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        ref={ref}
        type="date"
        {...rest}
        className={clsx(
          "w-full rounded-md border px-3 py-2 outline-none border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100",
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
);

export default DateInput;