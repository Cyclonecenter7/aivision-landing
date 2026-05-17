import { Link } from 'react-router-dom';
import { CASES } from '@/data/cases';

export default function Cases() {
  const cases = Object.values(CASES);

  return (
    <section id="cases" className="bg-light section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Кейсы</span>
        </div>
      </div>

      <div className="cases-head">
        <h2 className="cases-h2">
          Что мы уже <em>сделали</em>
        </h2>
        <p className="cases-sub">
          Три бизнеса разного масштаба. Один подход — управление на цифрах,
          а не на ощущениях.
        </p>
      </div>

      <div className="cases-grid">
        {cases.map(c => (
          <Link
            key={c.id}
            to={`/case/${c.id}`}
            className="case-card"
            data-track={`case_card_${c.id}`}
            data-track-block="cases"
          >
            <div className="case-tag">
              <span>{c.tag}</span>
              <span className="case-tag-sub">{c.tagSub}</span>
            </div>

            <div className="case-title">
              {c.titleLine1}<br />{c.titleLine2}
            </div>

            <p className="case-desc">{c.description}</p>

            <div className="case-kpis">
              {c.results.slice(0, 3).map((r, i) => (
                <div key={i} className="case-kpi">
                  <span className="case-kpi-val">{r.v}</span>
                  <span className="case-kpi-lab">{r.l}</span>
                </div>
              ))}
            </div>

            <span className="case-link">Открыть кейс →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
