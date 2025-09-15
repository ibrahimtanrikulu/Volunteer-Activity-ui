import { forwardRef, type InputHTMLAttributes } from "react";
import clsx from 'clsx';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Text = forwardRef<HTMLInputElement, Props>(function Text(
  { label, error, className, ...rest },
  ref
) {
  return (
    <label className="block space-y-1.5">
          {label && <span className="text-sm font-medium">{label}</span>}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-md border px-3 py-2 outline-none",
          "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
        {...rest}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
});

export default Text;