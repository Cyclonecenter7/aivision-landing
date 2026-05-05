const VARIANTS = {
  primary:   'bg-blue text-white hover:bg-blue/90',
  secondary: 'bg-dark2 text-white border border-[#3A3A3A] hover:bg-[#2F2F2F]',
  ghost:     'bg-transparent text-[#888] hover:text-white',
  dark:      'bg-background text-white hover:bg-blue',
  white:     'bg-white text-blue hover:bg-[#EEF2FF]',
};
const SIZES = {
  sm:   'px-4 py-2 text-xs',
  md:   'px-6 py-3 text-sm',
  lg:   'px-8 py-4 text-base',
  none: '',
};

export default function Btn({
  variant = 'primary',
  size = 'md',
  track,
  trackBlock,
  className = '',
  style = {},
  children,
  ...rest
}) {
  const trackProps = track
    ? { 'data-track': track, 'data-track-block': trackBlock }
    : {};
  return (
    <button
      className={`${VARIANTS[variant]} ${SIZES[size]} font-medium transition-colors ${className}`}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)', ...style }}
      {...trackProps}
      {...rest}
    >
      {children}
    </button>
  );
}
