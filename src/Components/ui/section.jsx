export function Section({ children, className = "" }) {
  return (
    <section className={`max-w-5xl mx-auto px-4 py-12 ${className}`}>
      {children}
    </section>
  );
}

export default Section;
