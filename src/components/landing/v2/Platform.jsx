export default function Platform() {
  return (
    <section id="platform" className="bg-dark section">
      <div className="container">
        <div className="eyebrow">
          <div className="eyebrow-line"></div>
          <span className="eyebrow-text">Платформа</span>
        </div>

        <div className="plt-head">
          <h2 className="plt-h2">Одна система — <em>три плоскости</em> управления</h2>
          <p className="plt-sub">
            Технически — сайт, CRM, дашборд, учёт, задачи в единой системе.
            Внутри — управленческая логика, внедренная в десятки бизнесов.
          </p>
        </div>
      </div>

      <div className="plt-body">
        <div className="plt-screen">
          <div className="plt-screen-bar">
            <div className="plt-dots"><span></span><span></span><span></span></div>
            <span>admin.aivisionpro.ru / Дашборд</span>
            <span className="hm-live" style={{ marginLeft: 'auto' }}>Live</span>
          </div>

          <div className="plt-editorial">
            <span className="plt-ed-eb">МАЙ · 16 ИЗ 31 ДН.</span>
            <span className="plt-ed-h">
              <em>48</em> новых заявок. <em style={{ color: 'var(--emerald)' }}>+18%</em> к апрелю.
            </span>
          </div>

          <div className="plt-kpis">
            <div className="plt-kpi">
              <div className="plt-kpi-lab">Маржа</div>
              <div className="plt-kpi-val" style={{ color: 'var(--brand)' }}>1.84&nbsp;М&nbsp;₽</div>
              <div className="plt-kpi-delta" style={{ color: 'var(--emerald)' }}>+27%</div>
            </div>
            <div className="plt-kpi">
              <div className="plt-kpi-lab">Доход</div>
              <div className="plt-kpi-val">4.2&nbsp;М&nbsp;₽</div>
              <div className="plt-kpi-delta" style={{ color: 'var(--emerald)' }}>+14%</div>
            </div>
            <div className="plt-kpi">
              <div className="plt-kpi-lab">Расход</div>
              <div className="plt-kpi-val">2.36&nbsp;М&nbsp;₽</div>
              <div className="plt-kpi-delta" style={{ color: 'var(--crimson)' }}>+6%</div>
            </div>
            <div className="plt-kpi">
              <div className="plt-kpi-lab">Сделки</div>
              <div className="plt-kpi-val">15</div>
              <div className="plt-kpi-delta" style={{ color: 'var(--d-text-mut)' }}>в работе</div>
            </div>
          </div>

          <div className="plt-chart-wrap">
            <div className="plt-chart-head">
              <span className="plt-chart-title">Маржа · Доходы · Расходы — Май</span>
              <div className="plt-chart-legend">
                <span><span style={{ background: 'var(--brand)' }}></span>Маржа</span>
                <span><span style={{ background: 'var(--emerald)' }}></span>Доход</span>
                <span><span style={{ background: 'var(--crimson)' }}></span>Расход</span>
              </div>
            </div>
            <svg width="100%" height="180" viewBox="0 0 600 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gBrandPlt" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#3F6EE8" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3F6EE8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="gEm2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="40" x2="600" y2="40" stroke="#222" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#222" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#222" strokeWidth="1" />

              <path d="M 20,120 C 80,118 140,125 200,115 C 260,105 320,118 380,108 C 440,98 500,105 580,100" fill="none" stroke="#F43F5E" strokeWidth="2" />
              <path d="M 20,90 C 80,85 140,78 200,72 C 260,66 320,70 380,55 C 440,40 500,50 580,42 L 580,140 L 20,140 Z" fill="url(#gEm2)" />
              <path d="M 20,90 C 80,85 140,78 200,72 C 260,66 320,70 380,55 C 440,40 500,50 580,42" fill="none" stroke="#10B981" strokeWidth="2" />
              <path d="M 20,110 C 80,108 140,100 200,95 C 260,90 320,82 380,70 C 440,58 500,68 580,58 L 580,140 L 20,140 Z" fill="url(#gBrandPlt)" />
              <path d="M 20,110 C 80,108 140,100 200,95 C 260,90 320,82 380,70 C 440,58 500,68 580,58" fill="none" stroke="#3F6EE8" strokeWidth="2.25" />

              <circle cx="580" cy="58" r="3.5" fill="#181818" stroke="#3F6EE8" strokeWidth="2" />
              <circle cx="580" cy="42" r="3" fill="#181818" stroke="#10B981" strokeWidth="2" />
              <circle cx="580" cy="100" r="3" fill="#181818" stroke="#F43F5E" strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div className="plt-features">
          <div className="plt-features-title">Что внутри</div>
          <ul className="plt-feat-list">
            <li className="plt-feat">
              <div className="plt-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
              <div className="plt-feat-text"><strong>Сайт</strong> под задачу бизнеса — приём заявок, продукт-витрина</div>
            </li>
            <li className="plt-feat">
              <div className="plt-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                  <circle cx="17" cy="11" r="3" />
                </svg>
              </div>
              <div className="plt-feat-text"><strong>CRM</strong> — клиенты, сделки, заявки, задачи в едином потоке</div>
            </li>
            <li className="plt-feat">
              <div className="plt-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <div className="plt-feat-text"><strong>Дашборд</strong> с KPI по направлениям, маржой, оборотом</div>
            </li>
            <li className="plt-feat">
              <div className="plt-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="plt-feat-text"><strong>Управленческий учёт</strong> с интеграцией банков</div>
            </li>
            <li className="plt-feat">
              <div className="plt-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <div className="plt-feat-text"><strong>Регламенты и контроли</strong> внутри процессов</div>
            </li>
            <li className="plt-feat">
              <div className="plt-feat-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className="plt-feat-text"><strong>Оповещения</strong> по отклонениям и heat-классификация лидов</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="plt-diff">
        <div className="plt-diff-eb">Чем отличается от Битрикс / amoCRM / Аспро.Cloud</div>
        <div className="plt-diff-text">
          Внутри — управленческая логика. Не «настройте сами под себя», а готовая система
          с зашитыми правилами, для управления вашим бизнесом.
        </div>
      </div>

      <div className="plt-cta">
        <a
          className="btn btn-on-dark"
          href="/demo/"
          target="_blank"
          rel="noopener"
          data-track="platform_cta"
          data-track-block="platform"
        >
          Посмотреть платформу
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
