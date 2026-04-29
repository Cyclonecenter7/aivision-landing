export default function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid #E8E8E8', padding: '40px 24px' }}>
      <div
        className="footer-inner"
        style={{
          maxWidth: 1152,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="28" height="28">
            <path d="M 0 0 L 256 0 L 256 208 L 208 256 L 0 256 Z" fill="#0A0A0A"/>
            <path d="M 72 64 L 192 64 L 192 148 L 156 184 L 72 184 Z" fill="#3F6EE8"/>
          </svg>
          <span style={{ fontWeight: 700, color: '#0A0A0A', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            AIVISION
          </span>
        </div>

        <p style={{ color: '#888', fontSize: 12, margin: 0 }}>
          Мы внедряем систему, в которой бизнес начинает показывать правду в цифрах
        </p>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="/privacy-policy" style={{ fontSize: 11, color: '#AAA', textDecoration: 'none' }}>Политика ПДн</a>
          <span style={{ color: '#DDD' }}>·</span>
          <a href="/consent" style={{ fontSize: 11, color: '#AAA', textDecoration: 'none' }}>Согласие на обработку ПДн</a>
        </div>

        <p style={{ color: '#BBB', fontSize: 12, margin: 0 }}>
          © 2026 AIVISION · <a href="mailto:support@aivisionpro.ru" style={{ color: '#BBB' }}>support@aivisionpro.ru</a>
        </p>
      </div>
    </footer>
  );
}
