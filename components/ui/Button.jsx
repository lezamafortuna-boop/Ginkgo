import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  outline: "border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white",
  ghost: "border border-white text-white hover:bg-white hover:text-charcoal",
};

export default function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
