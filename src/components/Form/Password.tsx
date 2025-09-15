import { forwardRef, useState, type InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Password = forwardRef<HTMLInputElement, Props>(function Password(
  { label, error, className, ...rest },
  ref
) {
  const [show, setShow] = useState(false);
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="relative">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          className={clsx(
            "w-full rounded-md border px-3 py-2 pr-10 outline-none",
            "border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-200",
            error && "border-red-500 focus:border-red-500 focus:ring-red-200",
            className
          )}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-2 text-sm text-gray-500"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
});

export default Password;