export default function Eyebrow({ children, color = '#3F6EE8' }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-px" style={{ background: color }} />
      <span className="text-xs font-medium uppercase tracking-widest" style={{ color }}>
        {children}
      </span>
    </div>
  );
}
