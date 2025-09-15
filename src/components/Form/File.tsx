import { forwardRef, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...rest }, ref) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input ref={ref} type="file" {...rest} />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
);

export default FileInput;