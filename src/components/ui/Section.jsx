export default function Section({ id, className = '', innerClassName = '', children }) {
  return (
    <section id={id} className={className}>
      <div className={`max-w-6xl mx-auto px-6 ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}
