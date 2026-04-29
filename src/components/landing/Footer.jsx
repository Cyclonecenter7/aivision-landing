import { useState } from 'react';
import ContactModal from './ContactModal';

const clipBtn = 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)';

export default function Footer() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <footer style={{ background: '#0A0A0A' }}>
        {/* CTA layer */}
        <div
          style={{
            maxWidth: 1152,
            margin: '0 auto',
            padding: '32px 40px',
            borderBottom: '1px solid #1A1A1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <div style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
              Готовы разобраться с бизнесом?
            </div>
            <div style={{ color: '#555', fontSize: 13 }}>
              Первый разбор бесплатно
            </div>
          </div>
          <button
            onClick={() => setModal(true)}
            style={{
              background: '#3F6EE8',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              padding: '12px 24px',
              border: 'none',
              cursor: 'pointer',
              clipPath: clipBtn,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2D5BD4'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#3F6EE8'; }}
          >
            Начать диагностику
          </button>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: 1152,
            margin: '0 auto',
            padding: '18px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#444' }}>
              AIVISION
            </span>
            <span style={{ color: '#333' }}>·</span>
            <a href="mailto:support@aivisionpro.ru" style={{ fontSize: 11, color: '#3F6EE8', textDecoration: 'none' }}>
              support@aivisionpro.ru
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a href="/privacy-policy" style={{ fontSize: 11, color: '#333', textDecoration: 'none' }}>Политика ПДн</a>
            <span style={{ color: '#333' }}>·</span>
            <a href="/consent" style={{ fontSize: 11, color: '#333', textDecoration: 'none' }}>Согласие на обработку ПДн</a>
            <span style={{ color: '#333' }}>·</span>
            <span style={{ fontSize: 11, color: '#333' }}>© 2026 AIVISION</span>
          </div>
        </div>
      </footer>

      <ContactModal open={modal} onClose={() => setModal(false)} source="footer_cta" />
    </>
  );
}
