const problems = [
  'Прибыль есть, но непонятно где она теряется',
  'Отчёты существуют, но не управляют решениями',
  'KPI формальные, но не влияют на результат',
  'Масштабирование пугает: нет прозрачности',
];

const chaosBlocks = [
  { width: '78%',  ml: '10%', rotate: '-2deg'  },
  { width: '100%', ml: '0%',  rotate: '1.5deg' },
  { width: '88%',  ml: '4%',  rotate: '-3deg'  },
  { width: '70%',  ml: '15%', rotate: '2.5deg' },
];

export default function Problem() {
  return (
    <section className="bg-[#F4F4F5] py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#E5484D]" />
          <span className="text-[#E5484D] text-xs font-medium uppercase tracking-widest">Проблема</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#0A0A0A] leading-tight mb-12">
          Если бизнес растёт,<br />но управляемости нет
        </h2>

        {/* Visual: Chaos → System */}
        <div className="grid md:grid-cols-[1fr_64px_1fr] gap-0 items-center overflow-hidden">

          {/* LEFT — Chaos */}
          <div className="flex flex-col gap-2 pr-0 md:pr-8">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-[#999] mb-2">Сейчас</div>
            {problems.map((text, i) => {
              const b = chaosBlocks[i];
              return (
                <div
                  key={i}
                  className="bg-[#0A0A0A] p-3 flex items-start gap-3"
                  style={{ width: b.width, marginLeft: b.ml, transform: `rotate(${b.rotate})` }}
                >
                  <div className="w-1 self-stretch bg-[#E5484D] flex-shrink-0 rounded-full" />
                  <span className="text-white text-xs leading-relaxed">{text}</span>
                </div>
              );
            })}
          </div>

          {/* CENTER — Arrow (right on desktop, down on mobile) */}
          <div className="flex md:hidden justify-center my-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="#3F6EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center gap-2 self-center">
            <div className="w-px h-12 bg-[#3F6EE8] opacity-30" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#3F6EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="w-px h-12 bg-[#3F6EE8] opacity-30" />
          </div>

          {/* RIGHT — Mini-dashboard */}
          <div className="pl-0 md:pl-8 mt-10 md:mt-0">
            <div
              style={{
                background: '#fff',
                border: '1px solid #E8E8E8',
                padding: 24,
              }}
            >
              <div style={{
                fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                letterSpacing: '0.15em', color: '#888', marginBottom: 16,
              }}>С AIVISION</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {[
                  { label: 'СЛЕПЫХ ЗОН',         value: '0',    color: '#16A34A' },
                  { label: 'ПРОЗРАЧНОСТЬ',        value: '100%', color: '#3F6EE8' },
                  { label: 'ПРОПУЩ. КЛИЕНТОВ',   value: '0',    color: '#16A34A' },
                ].map(m => (
                  <div
                    key={m.label}
                    style={{
                      background: '#F0F3FA', border: '1px solid #E4E8F0',
                      padding: '12px 10px', textAlign: 'center',
                    }}
                  >
                    <div style={{
                      fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.14em',
                      color: '#AAA', fontWeight: 500, marginBottom: 6,
                    }}>{m.label}</div>
                    <div style={{
                      fontSize: 22, fontWeight: 800, color: m.color,
                      letterSpacing: '-0.025em', fontVariantNumeric: 'tabular-nums',
                    }}>{m.value}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 16, padding: '12px 16px',
                background: '#F8F9FC', border: '1px solid #E8E8E8',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                {[
                  'Каждая операция учтена',
                  'Каждое решение — на данных',
                  'Каждый рубль — под контролем',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ width: 4, height: 4, background: '#3F6EE8', borderRadius: '50%', marginTop: 5, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}