export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded-lg border border-border bg-paper p-8 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
