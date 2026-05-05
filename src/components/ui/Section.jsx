export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`py-20 px-6 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  );
}
