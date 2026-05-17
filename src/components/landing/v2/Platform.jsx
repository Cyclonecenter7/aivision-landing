import DashboardSlider from '@/components/landing/DashboardSlider';

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
        <div className="plt-screen-wrap">
          <DashboardSlider variant="platform" />
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
        <div className="plt-diff-eb">Чем отличается от других интеграторов</div>
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
