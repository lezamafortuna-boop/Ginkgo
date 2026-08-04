export default function Eyebrow({ children, className = "" }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 md:text-sm ${className}`}
    >
      {children}
    </p>
  );
}
