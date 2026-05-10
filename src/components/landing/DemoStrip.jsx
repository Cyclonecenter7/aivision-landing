import { useState } from 'react';
import ContactModal from './ContactModal';

export default function DemoStrip() {
  const [hovered, setHovered] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <>
      <div style={{ background: '#0A0A0A', padding: '28px 64px' }}
           className="!px-6 sm:!px-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

          {/* Left block */}
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>
              Посмотрите платформу в действии
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
              Тестовые данные, полный функционал — без регистрации
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            data-track="demo_strip_gate"
            data-track-block="demo_strip"
            onClick={() => setModal(true)}
            className="w-full sm:w-auto justify-center sm:justify-start"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#3F6EE8',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              padding: '11px 24px',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: 'inherit',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
              transition: 'opacity 0.15s',
              whiteSpace: 'nowrap',
              opacity: hovered ? 0.85 : 1,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Открыть демо CRM →
          </button>
        </div>
      </div>

      <ContactModal
        open={modal}
        onClose={() => setModal(false)}
        source="demo_strip_gate"
        demoGate
      />
    </>
  );
}
