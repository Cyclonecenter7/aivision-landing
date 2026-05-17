import Navbar from './Navbar';

export default function Hero({ onOpenContact }) {
  const scrollToPlatform = () => {
    const el = document.getElementById('platform');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-brand hero">
      <Navbar onOpenContact={onOpenContact} />

      <div className="hero-grid">
        <div>
          <h1 className="hero-h1">
            Агентство<br />
            управленческих решений
          </h1>

          <p className="hero-sub">
            Даём собственнику видимость, контроль и управляемость
            через собственную платформу. Решения на данных, а не на ощущениях.
            Внедрение от&nbsp;1&nbsp;недели.
          </p>

          <div className="hero-cta-block">
            <div className="hero-cta-row">
              <button
                type="button"
                className="btn btn-on-brand"
                data-track="hero_cta_diagnose"
                data-track-block="hero"
                onClick={() => onOpenContact()}
              >
                Начать диагностику
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                type="button"
                className="btn-ghost"
                data-track="hero_cta_platform"
                data-track-block="hero"
                onClick={scrollToPlatform}
              >
                Посмотреть платформу →
              </button>
            </div>
            <div className="hero-cta-sub">30 минут на разбор бизнеса · бесплатно</div>
          </div>
        </div>

        <div className="triad-stage">
          <svg className="triad-svg" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <path
              className="layer-outer"
              d="M 0 0 L 480 0 L 480 410 L 410 480 L 0 480 Z"
              fill="rgba(255,255,255,0.16)"
            />
            <path
              className="layer-mid"
              d="M 90 90 L 390 90 L 390 345 L 345 390 L 90 390 Z"
              fill="rgba(255,255,255,0.32)"
            />
            <path
              className="layer-core"
              d="M 170 170 L 310 170 L 310 290 L 290 310 L 170 310 Z"
              fill="#FFFFFF"
            />

            <line x1="445" y1="35" x2="480" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <circle cx="445" cy="35" r="3.5" fill="#fff" />

            <line x1="360" y1="125" x2="480" y2="125" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <circle cx="360" cy="125" r="3.5" fill="#fff" />

            <line x1="290" y1="205" x2="480" y2="205" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <circle cx="290" cy="205" r="4" fill="#3F6EE8" stroke="#fff" strokeWidth="2" />
          </svg>

          <div className="t-label t-label-01">
            <span className="t-label-num">01</span>
            <span className="t-label-name">Видимость</span>
          </div>
          <div className="t-label t-label-02">
            <span className="t-label-num">02</span>
            <span className="t-label-name">Контроль</span>
          </div>
          <div className="t-label t-label-03">
            <span className="t-label-num">03</span>
            <span className="t-label-name">Управляемость</span>
          </div>
        </div>
      </div>
    </section>
  );
}
