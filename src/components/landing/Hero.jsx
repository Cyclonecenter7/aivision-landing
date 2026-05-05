import { useState } from 'react';
import ContactModal from './ContactModal';
import HeroDashboard from './HeroDashboard';
import { Btn } from '@/components/ui';

export default function Hero() {
  const [modal, setModal] = useState(false);

  return (
    <>
    <section id="hero" className="hero-section min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden"
      style={{ background: '#3F6EE8' }}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="hero-inner relative max-w-7xl mx-auto px-6 py-20 md:py-28 w-full">
        <div className="hero-grid grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 lg:gap-16 items-center">

          {/* LEFT — Text */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px" style={{ background: 'rgba(255,255,255,0.5)' }} />
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Система управляемой прибыли
              </span>
            </div>

            <h1 className="text-[32px] md:text-5xl font-bold leading-tight mb-6" style={{ color: '#fff' }}>
              Бизнес растёт —<br />
              но внутри <span className="italic" style={{ opacity: 0.85 }}>хаос</span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed mb-10 max-w-md" style={{ color: 'rgba(255,255,255,0.72)' }}>
              За 30 дней вы увидите, где бизнес зарабатывает, где теряет и как управлять ростом через цифры
            </p>

            <Btn
              variant="white"
              size="none"
              track="hero_cta"
              trackBlock="hero"
              onClick={() => setModal(true)}
              className="hero-cta inline-block px-8 py-4 text-sm font-semibold"
            >
              Получить бесплатный разбор
            </Btn>

            <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Консультация с конкретными шагами к управляемой системе
            </p>
          </div>

          {/* RIGHT — Dashboard Slider */}
          <div className="block">
            <HeroDashboard />
          </div>

        </div>
      </div>

    </section>
    {/* ContactModal — вне <section overflow-hidden> чтобы не клипалось на iOS */}
    <ContactModal open={modal} onClose={() => setModal(false)} source="hero_cta" />
    </>
  );
}
