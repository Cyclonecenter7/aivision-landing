export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="footer-left">
          <svg width="16" height="16" viewBox="0 0 32 32">
            <path d="M0 0 L32 0 L32 26 L26 32 L0 32 Z" fill="currentColor" />
          </svg>
          AIVISION
          <span style={{ opacity: 0.5 }}>·</span>
          <a
            href="mailto:support@aivisionpro.ru"
            style={{ color: 'inherit', textDecoration: 'none', letterSpacing: 'normal' }}
            data-track="footer_email"
            data-track-block="footer"
          >
            support@aivisionpro.ru
          </a>
        </div>
        <div className="footer-links">
          <a
            href="/demo/"
            target="_blank"
            rel="noopener"
            data-track="footer_demo"
            data-track-block="footer"
          >
            Демо платформы
          </a>
          <a
            href="/privacy-policy"
            data-track="footer_privacy"
            data-track-block="footer"
          >
            Политика ПДн
          </a>
          <a
            href="/consent"
            data-track="footer_consent"
            data-track-block="footer"
          >
            Согласие на обработку ПДн
          </a>
        </div>
        <div>© 2026 AIVISION</div>
      </div>
    </footer>
  );
}
