import { useState, useEffect, useRef, useCallback } from 'react';
import { B, G } from './atoms';
import { SlideDashboard, SlideOperations, SlideDeals, SlidePnL, SlideFunnel, SlideProducts } from './slides';

const TABS = ['Дашборд', 'Операции', 'Сделки', 'PnL', 'Воронка', 'Товары'];
const slideComponents = [SlideDashboard, SlideOperations, SlideDeals, SlidePnL, SlideFunnel, SlideProducts];
const clipTab = 'polygon(0 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%)';

export default function HeroDashboard() {
  const [active, setActive]   = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef              = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setActive(p => (p + 1) % TABS.length); setVisible(true); }, 200);
    }, 6000);
  }, []);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const handleTab = (i) => {
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 150);
    startTimer();
  };

  const Slide = slideComponents[active];

  return (
    <div className="av-dashboard-wrap" style={{ background: '#fff', border: '1px solid #E8E8E8', clipPath: 'polygon(0 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%)' }}>
      {/* Header bar */}
      <div style={{ padding: '10px 14px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AAA' }}>
          Система в действии
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: G, boxShadow: `0 0 4px ${G}` }} />
          <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', color: G }}>LIVE</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="av-dashboard-tabs" style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px 14px' }}>
        {TABS.map((name, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            data-track={`hero_dashboard_tab_${i}`}
            data-track-block="hero_dashboard"
            data-track-text={name}
            style={{
              fontSize: 9, fontWeight: 500, padding: '5px 10px', fontFamily: 'inherit',
              background: i === active ? B : '#fff',
              color:      i === active ? '#fff' : '#888',
              border:     i === active ? `1px solid ${B}` : '1px solid #E8E8E8',
              cursor: 'pointer', transition: 'all 0.15s', clipPath: clipTab,
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Slide area */}
      <div className="av-dashboard-stage" style={{ padding: '0 14px', height: 300, overflow: 'hidden', background: '#F8F9FC', borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0' }}>
        <div style={{ height: '100%', padding: '12px 0', opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
          <Slide />
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '10px 0 12px' }}>
        {TABS.map((name, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            data-track={`hero_dashboard_dot_${i}`}
            data-track-block="hero_dashboard"
            data-track-text={name}
            style={{ height: 5, width: i === active ? 16 : 5, borderRadius: '50rem', background: i === active ? B : '#DDD', border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
}
