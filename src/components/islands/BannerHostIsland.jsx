import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// Смонтирован один раз в BaseLayout (client:load). Слушает 'shvec:show-banner'
// (dispatch из src/lib/banners.js) и рендерит скошенный бокс в цвете DS-палитры.
//
// Скос (chamfer) — канон DS: один 10px снизу справа. Реализован ГРАДИЕНТОМ,
// не clip-path (clip-path забанен hard-rule веб-билдера; gradient даёт чистую
// диагональ без «лестницы»). Прозрачный угол проявляет фон под баннером —
// геометрически идентично DS clip-path polygon.

// 7 цветов палитры SHVEC v1.0 (закрытая система) → hex.
const PALETTE = {
  brand: '#3F6EE8',
  emerald: '#10B981',
  crimson: '#F43F5E',
  sun: '#FCD34D',
  slate: '#94A3B8',
  indigo: '#6366F1',
  tangerine: '#FB923C',
};

// Светлые токены требуют тёмного текста для контраста.
const DARK_FG = new Set(['sun', 'slate']);

// Скос через градиент: заливка `color`, срез угла bottom-right на `px`.
function chamferBg(px, color) {
  return `linear-gradient(-45deg, transparent ${px}px, ${color} ${px}px)`;
}

export default function BannerHostIsland() {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const handler = (e) => setBanner(e.detail || null);
    window.addEventListener('shvec:show-banner', handler);
    return () => window.removeEventListener('shvec:show-banner', handler);
  }, []);

  if (!banner) return null;

  const colorToken = PALETTE[banner.color] ? banner.color : 'brand';
  const bgColor = PALETTE[colorToken];
  const isDark = DARK_FG.has(colorToken);

  const fg = isDark ? '#0A0A0A' : '#FFFFFF';
  const fgSoft = isDark ? 'rgba(10,10,10,0.72)' : 'rgba(255,255,255,0.82)';
  const eyebrowColor = isDark ? 'rgba(10,10,10,0.55)' : 'rgba(255,255,255,0.7)';
  // CTA: контрастная плашка поверх цветного фона (паттерн .btn-on-brand).
  const ctaBg = isDark ? '#0A0A0A' : '#FFFFFF';
  const ctaFg = isDark ? '#FFFFFF' : bgColor;

  const source = banner.source_block_label || 'banner';
  const size = banner.size === 'x2' ? 'x2' : 'x1';
  const isX2 = size === 'x2';

  const close = () => setBanner(null);

  const onCta = () => {
    if (banner.cta_href) {
      window.location.href = banner.cta_href;
      return;
    }
    // Открытие формы заявки — тот же CustomEvent, что и остальные CTA лендинга.
    window.dispatchEvent(
      new CustomEvent('shvec:open-contact', { detail: { source } })
    );
    close();
  };

  const card = (
    <div
      role={isX2 ? 'dialog' : 'region'}
      aria-modal={isX2 ? 'true' : undefined}
      aria-label={banner.title || 'Баннер'}
      onClick={(event) => event.stopPropagation()}
      style={{
        position: 'relative',
        width: isX2 ? 'min(100%, 520px)' : 'auto',
        maxWidth: isX2 ? 440 : 340,
        padding: isX2 ? '30px 30px 26px' : '22px 22px 20px',
        color: fg,
        background: chamferBg(10, bgColor),
        boxShadow: '0 18px 48px rgba(10,10,10,0.32)',
        fontFamily: 'inherit',
      }}
    >
      <button
        onClick={close}
        aria-label="Закрыть"
        data-track="banner_close"
        data-track-block={source}
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          display: 'inline-flex',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: fgSoft,
          padding: 2,
          lineHeight: 0,
        }}
      >
        <X size={18} />
      </button>

      {/* eyebrow — 24px линия + аккуратный акцент (DS-паттерн секции) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ width: 24, height: 2, background: fgSoft, flexShrink: 0 }} />
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: eyebrowColor,
          }}
        >
          Швец
        </span>
      </div>

      {banner.title && (
        <h3
          style={{
            fontSize: isX2 ? 24 : 18,
            fontWeight: 700,
            lineHeight: 1.22,
            letterSpacing: '-0.01em',
            margin: 0,
            marginBottom: banner.body ? 8 : 18,
            color: fg,
            paddingRight: 20,
          }}
        >
          {banner.title}
        </h3>
      )}

      {banner.body && (
        <p
          style={{
            fontSize: isX2 ? 15 : 13.5,
            lineHeight: 1.5,
            margin: 0,
            marginBottom: 20,
            color: fgSoft,
          }}
        >
          {banner.body}
        </p>
      )}

      <button
        onClick={onCta}
        data-track="banner_cta"
        data-track-block={source}
        data-banner-id={banner.id}
        data-track-text="Получить аудит"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.01em',
          padding: '13px 26px',
          border: 'none',
          cursor: 'pointer',
          color: ctaFg,
          background: chamferBg(8, ctaBg),
          fontFamily: 'inherit',
        }}
      >
        Получить аудит
      </button>
    </div>
  );

  return (
    <div
      onClick={isX2 ? close : undefined}
      style={{
        position: 'fixed',
        inset: isX2 ? 0 : 'auto 20px 20px auto',
        zIndex: 60,
        display: isX2 ? 'flex' : 'block',
        alignItems: isX2 ? 'center' : undefined,
        justifyContent: isX2 ? 'center' : undefined,
        maxWidth: isX2 ? undefined : 'calc(100vw - 40px)',
        padding: isX2 ? 20 : 0,
        background: isX2 ? 'rgba(10,10,10,0.72)' : 'transparent',
        backdropFilter: isX2 ? 'blur(4px)' : undefined,
      }}
    >
      {card}
    </div>
  );
}
