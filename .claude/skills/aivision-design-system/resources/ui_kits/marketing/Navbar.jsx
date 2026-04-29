// Navbar — fixed, transparent by default, becomes white-on-scroll.

function Navbar({ onContactClick }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? '#fff' : 'transparent',
      borderBottom: scrolled ? '1px solid #E8E8E8' : '1px solid transparent',
      transition: 'all 300ms',
    }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: scrolled ? 1 : 0, transition: 'opacity 300ms' }}>
          <img src="../../assets/aivision-logo.png" style={{ width: 24, height: 24, objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#0A0A0A' }}>AIVISION</span>
        </div>
        <Button variant="dark" size="small" onClick={onContactClick}>Начать</Button>
      </div>
    </nav>
  );
}

Object.assign(window, { Navbar });
