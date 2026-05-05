const CLIP_VARIANTS = {
  card:   'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)',
  button: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
  large:  'polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)',
  sm:     'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
  cta:    'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)',
};

export default function ClipCard({
  variant = 'card',
  className = '',
  style = {},
  as: Tag = 'div',
  children,
  ...rest
}) {
  return (
    <Tag
      className={className}
      style={{ ...style, clipPath: CLIP_VARIANTS[variant] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
