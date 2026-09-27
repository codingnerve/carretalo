import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

/**
 * Form field primitives: visible label, rounded input, mint focus ring,
 * inline error wired up via aria-describedby.
 */

const inputClasses =
  "w-full rounded-xl border border-line bg-surface-raised px-3 py-3 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-mint";

function FieldShell({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wide text-ink-soft"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

function errorProps(name: string, error?: string) {
  return error
    ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` }
    : {};
}

type TextFieldProps = {
  label: string;
  name: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "className">;

export function TextField({ label, name, error, ...rest }: TextFieldProps) {
  return (
    <FieldShell label={label} name={name} error={error}>
      <input id={name} name={name} className={inputClasses} {...errorProps(name, error)} {...rest} />
    </FieldShell>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "id" | "className" | "children">;

export function SelectField({
  label,
  name,
  error,
  options,
  placeholder,
  ...rest
}: SelectFieldProps) {
  return (
    <FieldShell label={label} name={name} error={error}>
      <select id={name} name={name} className={inputClasses} {...errorProps(name, error)} {...rest}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type TextAreaFieldProps = {
  label: string;
  name: string;
  error?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id" | "className">;

export function TextAreaField({ label, name, error, ...rest }: TextAreaFieldProps) {
  return (
    <FieldShell label={label} name={name} error={error}>
      <textarea
        id={name}
        name={name}
        className={`${inputClasses} min-h-28 resize-y`}
        {...errorProps(name, error)}
        {...rest}
      />
    </FieldShell>
  );
}
