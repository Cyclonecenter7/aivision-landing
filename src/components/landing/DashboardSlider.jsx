import { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDER_VARIANTS, darkTokens, lightTokens } from '@/data/dashboard-slides';

const B = '#3F6EE8';
const G = '#16A34A';
const ch = (px) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${px}px),calc(100% - ${px}px) 100%,0 100%)` });
const clipTab = 'polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)';

export default function DashboardSlider({ variant = 'finance', light = false }) {
  const config = SLIDER_VARIANTS[variant];
  const { tabs, slideComponents, fixedTheme, hasLive } = config;
  const total = tabs.length;

  const t = fixedTheme === 'light'
    ? lightTokens
    : (light ? lightTokens : darkTokens);

  const [active, setActive]   = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef              = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setActive(p => (p + 1) % total); setVisible(true); }, 200);
    }, 8000);
  }, [total]);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const handleTab = (i) => {
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 150);
    startTimer();
  };

  const Slide = slideComponents[active];

  return (
    <div style={{ background: t.wrapBg, border: t.wrapBorder, ...ch(20) }}>

      {/* Header bar */}
      <div style={{ padding: '10px 14px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: t.mutedC }}>
          Система в действии
        </div>
        {hasLive && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: G, boxShadow: `0 0 4px ${G}` }} />
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', color: G }}>LIVE</span>
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 14px' }}>
        {tabs.map((name, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            data-track={`dashboard_tab_${variant}_${i}`}
            data-track-block="hero_dashboard"
            data-track-text={name}
            style={{
              fontSize: 9, fontWeight: 500, padding: '5px 10px', cursor: 'pointer', fontFamily: 'inherit',
              background: i === active ? B : t.tabOffBg,
              color:      i === active ? '#fff' : t.tabOffC,
              border:     i === active ? `1px solid ${B}` : `1px solid ${t.tabOffBorder}`,
              transition: 'all 0.15s',
              clipPath: clipTab,
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Slide area */}
      <div style={{
        padding: '0 14px', height: 320, overflow: 'hidden',
        background: t.bg,
        borderTop: `1px solid ${t.cardBorder}`,
        borderBottom: `1px solid ${t.cardBorder}`,
      }}>
        <div style={{ height: '100%', padding: '12px 0', opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
          <Slide t={t} />
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '10px 0 12px' }}>
        {tabs.map((_, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            style={{
              height: 5, width: i === active ? 16 : 5, borderRadius: 999, padding: 0,
              background: i === active ? B : t.trackBg,
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
