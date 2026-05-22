import { useState } from 'react';

const T = { bg: '#0A0A0A', card: '#181818', card2: '#222222', border: '#2A2A2A', t1: '#FFFFFF', t2: '#A3A3A3', t3: '#555555' };
const C = { brand: '#3F6EE8', emerald: '#10B981', crimson: '#F43F5E', sun: '#FCD34D', indigo: '#6366F1', tan: '#FB923C', slate: '#94A3B8' };
const ch = (n = 8) => ({ clipPath: `polygon(0 0,100% 0,100% calc(100% - ${n}px),calc(100% - ${n}px) 100%,0 100%)` });
const ha = (c, a) => { const h = c.replace('#', ''); return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`; };

function smooth(pts) {
  const n = pts.length; if (n < 2) return '';
  const t = new Array(n);
  for (let i = 1; i < n - 1; i++) {
    const d1 = pts[i][0] - pts[i - 1][0], d2 = pts[i + 1][0] - pts[i][0];
    const s1 = (pts[i][1] - pts[i - 1][1]) / d1, s2 = (pts[i + 1][1] - pts[i][1]) / d2;
    if (s1 * s2 <= 0) t[i] = 0;
    else { const p = (s1 * d2 + s2 * d1) / (d1 + d2); t[i] = Math.sign(s1) * Math.min(Math.abs(s1), Math.abs(s2), .5 * Math.abs(p)); }
  }
  t[0] = (pts[1][1] - pts[0][1]) / (pts[1][0] - pts[0][0]);
  t[n - 1] = (pts[n - 1][1] - pts[n - 2][1]) / (pts[n - 1][0] - pts[n - 2][0]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (pts[i + 1][0] - pts[i][0]) / 3;
    d += ` C${pts[i][0] + dx},${pts[i][1] + t[i] * dx} ${pts[i + 1][0] - dx},${pts[i + 1][1] - t[i + 1] * dx} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  return d;
}

function Spark({ data, color, h = 20 }) {
  if (!data || data.length < 2) return <div style={{ height: h }} />;
  const mn = Math.min(...data), mx = Math.max(...data), r = mx - mn || 1;
  const w = 100;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - mn) / r) * h * .8 - 2]);
  const line = smooth(pts);
  const area = line + ` L${pts[pts.length - 1][0]},${h} L${pts[0][0]},${h} Z`;
  const id = 'spedu' + color.replace('#', '') + Math.floor(Math.random() * 1e6);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".18" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DashMain() {
  const marginData = [12, 13, 14, 13, 16, 15, 17, 18, 18, 19, 20, 22, 24, 25, 27];
  const revenueData = [380, 410, 390, 420, 440, 430, 460, 490, 480, 510, 530, 560, 580, 610, 640];
  const repeatData = [60, 62, 64, 63, 66, 68, 70, 72, 74, 76, 78, 79, 80, 81, 82];
  const expData = revenueData.map((rv, i) => Math.round((1 - (i / 14) * 0.2) * 80));

  const mn = Math.min(...marginData), mx = Math.max(...marginData), r = mx - mn;
  const pts = marginData.map((v, i) => [(i / (marginData.length - 1)) * 300, 50 - ((v - mn) / r) * 42]);
  const line = smooth(pts);
  const area = line + ` L${pts[pts.length - 1][0]},50 L0,50 Z`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', gap: 5 }}>
        {[
          { label: 'Оборот', val: '640К ₽', sub: '+9% vs пред.', spark: revenueData, color: C.brand, accent: true },
          { label: 'Маржа', val: '27%', sub: 'было 12% → сейчас', spark: marginData, color: C.emerald },
          { label: 'Расходы', val: '−20%', sub: 'от пика расходов', spark: expData, color: C.crimson },
          { label: 'Повт. продажи', val: '+20%', sub: 'после реактивации', spark: repeatData, color: C.sun },
        ].map((it, i) => (
          <div key={i} style={{ flex: 1, background: it.accent ? C.brand : T.card, padding: '10px 11px 0', ...ch(7) }}>
            <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: it.accent ? 'rgba(255,255,255,.55)' : T.t3, marginBottom: 2 }}>{it.label}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: it.accent ? '#fff' : it.color, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{it.val}</div>
            <div style={{ fontSize: 9, color: it.accent ? 'rgba(255,255,255,.45)' : T.t2, marginBottom: 2 }}>{it.sub}</div>
            <div style={{ marginLeft: -11, marginRight: -11 }}><Spark data={it.spark} color={it.accent ? 'rgba(255,255,255,.7)' : it.color} h={20} /></div>
          </div>
        ))}
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ width: 14, height: 1, background: C.emerald, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Динамика маржинальности · 15 месяцев</span>
          <span style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, color: C.emerald }}>+27%</span>
        </div>
        <svg width="100%" height={56} viewBox="0 0 300 56" preserveAspectRatio="none" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="edumg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.emerald} stopOpacity=".2" />
              <stop offset="100%" stopColor={C.emerald} stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="50" x2="300" y2="50" stroke={T.border} strokeWidth="1" />
          <path d={area} fill="url(#edumg)" />
          <path d={line} fill="none" stroke={C.emerald} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.5" fill={C.emerald} />
          <text x="4" y="48" fontSize="8" fill={T.t3} fontFamily="Inter">−1 год</text>
          <text x="258" y="48" fontSize="8" fill={T.t3} fontFamily="Inter">сейчас</text>
        </svg>
      </div>

      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ width: 14, height: 1, background: C.brand, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Структура расходов · было vs стало</span>
        </div>
        {[
          { label: 'ФОТ', was: 68, now: 55, c: C.crimson, note: '−13пп' },
          { label: 'Маркетинг', was: 14, now: 18, c: C.brand, note: '+4пп' },
          { label: 'Операционка', was: 12, now: 16, c: C.slate, note: '+4пп' },
          { label: 'Прочее', was: 6, now: 11, c: T.t3, note: '+5пп' },
        ].map((r) => (
          <div key={r.label} style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span style={{ fontSize: 10, color: T.t2, flex: 1 }}>{r.label}</span>
              <span style={{ fontSize: 9, color: r.c, fontWeight: 600 }}>{r.note}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: T.t1, fontVariantNumeric: 'tabular-nums', minWidth: 28, textAlign: 'right' }}>{r.now}%</span>
            </div>
            <div style={{ display: 'flex', gap: 2 }}>
              <div style={{ height: 5, width: r.was + '%', background: ha(r.c, .25), borderRadius: 1 }} />
              <div style={{ height: 5, width: r.now + '%', background: r.c, borderRadius: 1, opacity: .7 }} />
            </div>
          </div>
        ))}
        <div style={{ fontSize: 8, color: T.t3, marginTop: 4 }}>▪ светлый = было · ▪ яркий = стало</div>
      </div>
    </div>
  );
}

function DashProducts() {
  const courses = [
    { name: 'Онлайн-курс Pro', cat: 'Онлайн', margin: 32, rev: '280К ₽', c: C.emerald },
    { name: 'Интенсив-воркшоп', cat: 'Мероприятие', margin: 28, rev: '196К ₽', c: C.emerald },
    { name: 'Онлайн-базовый', cat: 'Онлайн', margin: 21, rev: '164К ₽', c: C.brand },
    { name: 'Офлайн-курс', cat: 'Офлайн', margin: 11, rev: '88К ₽', c: C.sun },
    { name: 'Разовые занятия', cat: 'Офлайн', margin: -4, rev: '24К ₽', c: C.crimson, warn: true },
  ];
  return (
    <div style={{ background: T.card, ...ch(8), overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: `1px solid ${T.border}` }}>
        <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Маржинальность направлений</span>
      </div>
      {courses.map((r, i) => (
        <div key={i} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, background: i % 2 === 1 ? ha('#fff', .015) : T.card, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: T.t1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
            <div style={{ fontSize: 9, color: T.t3 }}>{r.cat}</div>
          </div>
          <div style={{ width: 80 }}>
            <div style={{ height: 5, background: T.border, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: Math.max(0, r.margin / 35 * 100) + '%', background: r.c, borderRadius: 2 }} />
            </div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: r.c, fontVariantNumeric: 'tabular-nums', minWidth: 34, textAlign: 'right' }}>{r.margin > 0 ? '+' : ''}{r.margin}%</span>
          <span style={{ fontSize: 10, color: T.t2, fontVariantNumeric: 'tabular-nums', minWidth: 50, textAlign: 'right' }}>{r.rev}</span>
          {r.warn && <span style={{ fontSize: 9, fontWeight: 700, color: C.crimson, background: ha(C.crimson, .12), padding: '1px 5px', ...ch(3) }}>СТОП</span>}
        </div>
      ))}
      <div style={{ padding: '8px 12px', background: T.card2, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: T.t2, flex: 1 }}>Повторные продажи</span>
        <span style={{ fontSize: 13, fontWeight: 900, color: C.emerald }}>+20%</span>
        <span style={{ fontSize: 9, color: T.t3 }}>после реактивации базы</span>
      </div>
    </div>
  );
}

function DashMotivation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ background: T.card, padding: '10px 12px', ...ch(8) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <span style={{ width: 14, height: 1, background: C.brand, display: 'block' }} />
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: T.t3 }}>Модель мотивации команды</span>
        </div>
        {[
          { role: 'Собственник', model: '% от маржи', was: 'Фиксированная ставка', now: 'Зависит от маржи бизнеса', c: C.emerald },
          { role: 'Менеджеры продаж', model: '% с продаж + маржа', was: 'Гарантированный минимум', now: 'Прозрачная модель от результата', c: C.brand },
          { role: 'Маркетинг', model: '% от лидов/конверсии', was: 'Фиксированная ставка', now: 'Процентная система', c: C.indigo },
        ].map((r, i) => (
          <div key={i} style={{ padding: '10px 12px', background: T.card2, ...ch(7), marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: T.t1 }}>{r.role}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: r.c, background: ha(r.c, .12), padding: '2px 8px', ...ch(4) }}>{r.model}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, padding: '5px 7px', background: ha(C.crimson, .07), borderLeft: `1px solid ${ha(C.crimson, .3)}` }}>
                <div style={{ fontSize: 8, color: T.t3, marginBottom: 1 }}>Было</div>
                <div style={{ fontSize: 10, color: T.t2 }}>{r.was}</div>
              </div>
              <div style={{ flex: 1, padding: '5px 7px', background: ha(C.emerald, .07), borderLeft: `1px solid ${ha(C.emerald, .3)}` }}>
                <div style={{ fontSize: 8, color: T.t3, marginBottom: 1 }}>Стало</div>
                <div style={{ fontSize: 10, color: T.t2 }}>{r.now}</div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ padding: '7px 10px', background: ha(C.emerald, .07), borderLeft: `2px solid ${C.emerald}`, ...ch(5) }}>
          <span style={{ fontSize: 10, color: T.t2 }}>Доля ФОТ: </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.crimson }}>68% → 55%</span>
          <span style={{ fontSize: 10, color: T.t2 }}> — сэкономлено </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.emerald }}>~83К ₽/мес</span>
        </div>
      </div>
    </div>
  );
}

export default function EduDashboard() {
  const [tab, setTab] = useState('main');
  const TBTN = { height: 22, padding: '0 9px', fontSize: 8, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .12s' };
  const tabs = [['main', 'Финансы'], ['products', 'Продукты'], ['motiv', 'Мотивация']];

  return (
    <div style={{ background: T.card, ...ch(20), overflow: 'hidden', fontFamily: 'Inter,sans-serif' }}>
      <div style={{ background: T.card, borderBottom: `1px solid ${T.border}`, padding: '0 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 38 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.1em', color: T.t2 }}>СИСТЕМА В ДЕЙСТВИИ</span>
          <div style={{ display: 'flex', gap: 1, background: '#0A0A0A', padding: 2, ...ch(5) }}>
            {tabs.map(([k, l]) => {
              const a = tab === k;
              return <button key={k} onClick={() => setTab(k)} style={{ ...TBTN, background: a ? C.brand : 'transparent', color: a ? '#fff' : T.t3, ...ch(4) }}>{l}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {tab === 'main' && <DashMain />}
        {tab === 'products' && <DashProducts />}
        {tab === 'motiv' && <DashMotivation />}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 7, color: T.t3 }}>Платформа AIVISION · NDA · данные изменены</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: C.emerald }} /><span style={{ fontSize: 7, color: T.t3 }}>live</span></div>
        </div>
      </div>
    </div>
  );
}
