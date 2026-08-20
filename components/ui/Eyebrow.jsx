export default function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 md:text-sm ${className}`}
    >
      <span className="h-[2px] w-5 shrink-0 bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}
