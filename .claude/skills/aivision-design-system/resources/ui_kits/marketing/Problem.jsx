// Problem section — Chaos → System visualization + bottom trio.

function Problem({ onCta }) {
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
  const whatWeDo = ['Выявляем, где теряется прибыль', 'Строим управленческую модель', 'Внедряем KPI и контроль', 'Собираем всё в единую систему'];
  const howSteps = [
    { id: '01', label: 'Диагностика', desc: '1–2 недели' },
    { id: '02', label: 'Сборка системы', desc: '30 дней' },
    { id: '03', label: 'Управление', desc: 'Партнёрство' },
  ];

  return (
    <section style={{ background: '#F4F4F5', padding: '96px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <Eyebrow color="red">Проблема</Eyebrow>
        <h2 style={{ fontSize: 44, fontWeight: 600, color: '#0A0A0A', lineHeight: 1.15, letterSpacing: '-0.015em', margin: '20px 0 48px' }}>
          Если бизнес растёт,<br />но управляемости нет
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 1fr', gap: 0, alignItems: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 32 }}>
            <Kicker style={{ marginBottom: 8 }}>Сейчас</Kicker>
            {problems.map((text, i) => {
              const b = chaosBlocks[i];
              return (
                <div key={i} style={{ background: '#0A0A0A', padding: 12, display: 'flex', gap: 12, width: b.width, marginLeft: b.ml, transform: `rotate(${b.rotate})` }}>
                  <div style={{ width: 3, alignSelf: 'stretch', background: '#E5484D', flexShrink: 0, borderRadius: 2 }} />
                  <span style={{ color: '#fff', fontSize: 12, lineHeight: 1.55 }}>{text}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 1, height: 48, background: '#3F6EE8', opacity: 0.3 }} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#3F6EE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div style={{ width: 1, height: 48, background: '#3F6EE8', opacity: 0.3 }} />
          </div>
          <div style={{ paddingLeft: 32 }}>
            <Kicker style={{ marginBottom: 16 }}>С AIVISION</Kicker>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
              {Array.from({ length: 9 }).map((_, i) => {
                const isCenter = i === 4;
                return (
                  <div key={i} style={{
                    aspectRatio: '3 / 2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700,
                    background: isCenter ? '#3F6EE8' : '#0A0A0A',
                    color: isCenter ? '#fff' : 'transparent',
                    clipPath: isCenter ? chamfer(14) : 'none',
                    boxShadow: isCenter ? '0 0 32px 8px rgba(63,110,232,0.25)' : 'none',
                  }}>{isCenter ? 'СИСТЕМА' : ''}</div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, margin: '56px 0 40px' }}>
          {[
            { k: 'Для кого', body: <><p style={{ color: '#0A0A0A', fontSize: 14, lineHeight: 1.3, marginBottom: 16 }}>Собственник бизнеса<br />от 10 млн ₽ / мес</p>
              {['Устал управлять деньгами вручную', 'Хочет видеть реальную картину', 'Готов к системной работе'].map((i, idx) => <Bullet key={idx}>{i}</Bullet>)}</> },
            { k: 'Что происходит', body: whatWeDo.map((i, idx) => <Bullet key={idx}>{i}</Bullet>) },
            { k: 'Как проходит', body: howSteps.map(s => <Bullet key={s.id}><div>{s.label}<div style={{ color: '#999', fontSize: 12, marginTop: 2 }}>{s.desc}</div></div></Bullet>) },
          ].map((c, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E8E8E8', padding: 24 }}>
              <Kicker color="#3F6EE8" style={{ marginBottom: 16 }}>{c.k}</Kicker>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{c.body}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={onCta} size="large">Начать диагностику</Button>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div style={{ width: 4, height: 4, marginTop: 8, background: '#3F6EE8', borderRadius: 2, flexShrink: 0 }} />
      <div style={{ color: '#555', fontSize: 14, lineHeight: 1.55 }}>{children}</div>
    </div>
  );
}

Object.assign(window, { Problem });
