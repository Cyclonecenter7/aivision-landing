import { useState } from 'react';
import ContactModal from './ContactModal';
import { BRAND } from '@/config/brand';
import { Btn } from '@/components/ui';

export default function Footer() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <footer className="bg-background">
        {/* CTA layer */}
        <div className="max-w-6xl mx-auto px-10 py-8 border-b border-[#1A1A1A] flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-white text-base font-bold mb-1">
              Готовы разобраться с бизнесом?
            </div>
            <div className="text-[#555] text-sm">
              Первый разбор бесплатно
            </div>
          </div>
          <Btn
            track="footer_cta"
            trackBlock="footer"
            onClick={() => setModal(true)}
          >
            Начать диагностику
          </Btn>
        </div>

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
            <a href="/privacy-policy" className="text-[11px] text-[#333] no-underline hover:text-[#555] transition-colors">Политика ПДн</a>
            <span className="text-[#333]">·</span>
            <a href="/consent" className="text-[11px] text-[#333] no-underline hover:text-[#555] transition-colors">Согласие на обработку ПДн</a>
            <span className="text-[#333]">·</span>
            <span className="text-[11px] text-[#333]">© 2026 {BRAND.name}</span>
          </div>
        </div>
      </footer>

      <ContactModal open={modal} onClose={() => setModal(false)} source="footer_cta" />
    </>
  );
}
