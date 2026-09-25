import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "onBrand";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand text-on-brand hover:bg-brand-strong active:scale-[0.98] shadow-sm shadow-brand/25",
  secondary:
    "border border-ink/25 text-ink hover:border-ink hover:bg-surface-raised active:scale-[0.98]",
  ghost: "text-ink hover:bg-mint active:scale-[0.98]",
  onBrand:
    "bg-surface-raised text-brand-strong hover:bg-mint active:scale-[0.98] shadow-sm",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm min-h-11",
  lg: "px-7 py-3.5 text-base min-h-12",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">)
  );

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,border-color,transform,box-shadow] duration-150 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
