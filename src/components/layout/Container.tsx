export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 md:px-12 lg:px-20 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  ariaLabel,
  topPad = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
  /** Set false when the previous section already provides the gap (avoids stacked padding). */
  topPad?: boolean;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${topPad ? "py-28" : "pb-28"} ${className}`}
    >
      {children}
    </section>
  );
}
