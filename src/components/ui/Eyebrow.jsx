const COLORS = {
  blue: { bg: 'bg-blue', text: 'text-blue' },
  red:  { bg: 'bg-red',  text: 'text-red'  },
};

export default function Eyebrow({ children, color = 'blue', className = 'mb-5' }) {
  const c = COLORS[color] || COLORS.blue;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`w-6 h-px ${c.bg}`} />
      <span className={`${c.text} text-xs font-medium uppercase tracking-widest`}>
        {children}
      </span>
    </div>
  );
}
