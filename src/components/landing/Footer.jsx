import { useState } from 'react';
import ContactModal from './ContactModal';
import { BRAND } from '@/config/brand';

export default function Footer() {
  const [demoModal, setDemoModal] = useState(false);

  return (
    <>
      <footer className="bg-background">
        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto px-10 py-[18px] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#444]">
              {BRAND.name}
            </span>
            <span className="text-[#333]">·</span>
            <a
              data-track="footer_email"
              data-track-block="footer"
              href={`mailto:${BRAND.email}`}
              className="text-[11px] text-blue no-underline hover:text-blue-400 transition-colors"
            >
              {BRAND.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-track="footer_demo_gate"
              data-track-block="footer"
              onClick={() => setDemoModal(true)}
              className="text-[11px] text-[#333] bg-transparent border-0 p-0 cursor-pointer hover:text-[#555] transition-colors"
            >
              Демо платформы
            </button>
            <span className="text-[#333]">·</span>
            <a href="/privacy-policy" className="text-[11px] text-[#333] no-underline hover:text-[#555] transition-colors">Политика ПДн</a>
            <span className="text-[#333]">·</span>
            <a href="/consent" className="text-[11px] text-[#333] no-underline hover:text-[#555] transition-colors">Согласие на обработку ПДн</a>
            <span className="text-[#333]">·</span>
            <span className="text-[11px] text-[#333]">© 2026 {BRAND.name}</span>
          </div>
        </div>
      </footer>

      <ContactModal
        open={demoModal}
        onClose={() => setDemoModal(false)}
        source="footer_demo_gate"
        demoGate
      />
    </>
  );
}
