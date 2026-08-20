const backgrounds = {
  cream: "bg-cream text-charcoal",
  paper: "bg-paper text-charcoal",
  teal: "bg-brand-600 text-white",
  charcoal: "bg-charcoal text-white",
};

export default function Section({
  children,
  className = "",
  innerClassName = "",
  bg = "cream",
  as: Comp = "section",
  ...props
}) {
  return (
    <Comp
      className={`${backgrounds[bg] ?? backgrounds.cream} px-6 py-20 md:px-10 ${className}`}
      {...props}
    >
      <div className={`mx-auto max-w-6xl ${innerClassName}`}>{children}</div>
    </Comp>
  );
}
