import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ContactModal from './ContactModal';

const navLinks = [
  { label: 'Продукты', href: '#products' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Отличие', href: '#comparison' },
];

const clipBtn = 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)';

// Логотип: внешний chamfer-квадрат + внутренний chamfer-квадрат
function LogoMark({ outerColor = '#0A0A0A', innerColor = '#3F6EE8' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="0,0 20,0 20,14 14,20 0,20" fill={outerColor} />
      <polygon points="4,4 16,4 16,12 12,16 4,16" fill={innerColor} />
    </svg>
  );
}

// Определяем тему по тому, какая секция сейчас под навбаром
function getNavTheme() {
  const Y = 72; // высота навбара

  const hero = document.getElementById('hero');
  if (hero && hero.getBoundingClientRect().bottom > Y) return 'hero';

  for (const sec of document.querySelectorAll('section')) {
    const { top, bottom } = sec.getBoundingClientRect();
    if (top <= Y && bottom > Y) {
      const bg = getComputedStyle(sec).backgroundColor;
      if (bg === 'rgb(10, 10, 10)') return 'dark';
      return 'light';
    }
  }
  return 'light';
}

// Тема → CSS-значения
const THEMES = {
  hero: {
    navBg:      'rgba(63,110,232,0.9)',
    border:     'rgba(255,255,255,0.18)',
    logoText:   'rgba(255,255,255,0.92)',
    markOuter:  '#fff',
    markInner:  '#3F6EE8',
    link:       'rgba(255,255,255,0.7)',
    linkHover:  '#fff',
    ctaBg:      '#fff',
    ctaText:    '#3F6EE8',
    ctaHover:   '#EEF2FF',
    burger:     'rgba(255,255,255,0.9)',
  },
  light: {
    navBg:      'rgba(255,255,255,0.92)',
    border:     'rgba(232,232,232,0.5)',
    logoText:   '#0A0A0A',
    markOuter:  '#0A0A0A',
    markInner:  '#3F6EE8',
    link:       '#666',
    linkHover:  '#0A0A0A',
    ctaBg:      '#0A0A0A',
    ctaText:    '#fff',
    ctaHover:   '#3F6EE8',
    burger:     '#0A0A0A',
  },
  dark: {
    navBg:      'rgba(10,10,10,0.94)',
    border:     'rgba(63,110,232,0.22)',
    logoText:   '#fff',
    markOuter:  '#3F6EE8',
    markInner:  '#fff',
    link:       'rgba(255,255,255,0.6)',
    linkHover:  '#fff',
    ctaBg:      '#3F6EE8',
    ctaText:    '#fff',
    ctaHover:   '#2D5BD4',
    burger:     'rgba(255,255,255,0.9)',
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [themeName, setThemeName] = useState('hero');
  const [modal, setModal]         = useState(false);

  useEffect(() => {
    const onScroll = () => setThemeName(getNavTheme());
    window.addEventListener('scroll', onScroll, { passive: true });
    // Небольшая задержка при маунте — DOM точно прорисован
    const t = setTimeout(() => setThemeName(getNavTheme()), 50);
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t); };
  }, []);

  const t = THEMES[themeName];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href === '#hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const section = document.querySelector(href);
    if (!section) return;
    const target = section.querySelector('h2') || section;
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: t.navBg,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${t.border}`,
          transition: 'background 0.35s, border-color 0.35s',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer"
            aria-label="На главную"
          >
            <LogoMark outerColor={t.markOuter} innerColor={t.markInner} />
            <span
              className="font-bold text-sm uppercase tracking-widest"
              style={{ color: t.logoText, transition: 'color 0.35s' }}
            >
              AIVISION
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center" style={{ gap: 32 }}>
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="bg-transparent border-0 p-0"
                style={{ fontSize: 13, fontWeight: 500, color: t.link, cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = t.linkHover; }}
                onMouseLeave={e => { e.currentTarget.style.color = t.link; }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <button
              onClick={() => setModal(true)}
              className="hidden md:block text-sm font-medium px-5 py-2"
              style={{ clipPath: clipBtn, background: t.ctaBg, color: t.ctaText, transition: 'background 0.25s, color 0.35s' }}
              onMouseEnter={e => { e.currentTarget.style.background = t.ctaHover; }}
              onMouseLeave={e => { e.currentTarget.style.background = t.ctaBg; }}
            >
              Начать диагностику
            </button>

            {/* Mobile burger */}
            <button
              className="md:hidden bg-transparent border-0 p-1"
              style={{ color: t.burger }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown — всегда светлый */}
        {menuOpen && (
          <div className="md:hidden bg-white border-b border-[#E8E8E8] px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left bg-transparent border-0 p-0 text-sm font-medium text-[#666] hover:text-[#0A0A0A] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setModal(true); }}
              className="text-sm font-medium px-5 py-3 bg-[#0A0A0A] text-white hover:bg-[#3F6EE8] transition-all text-center"
              style={{ clipPath: clipBtn }}
            >
              Начать диагностику
            </button>
          </div>
        )}
      </nav>

      {/* ContactModal рендерится ВНЕ <nav> — иначе backdropFilter на nav
          создаёт новый stacking context и ломает position:fixed у модалки */}
      <ContactModal open={modal} onClose={() => setModal(false)} source="navbar_cta" />
    </>
  );
}
