import { useEffect, useState } from 'react';
import ContactModal from './ContactModal';

export default function ContactModalIsland() {
  const [state, setState] = useState({ open: false, source: 'modal', initial: null, demoGate: false });

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {};
      setState({
        open: true,
        source: detail.source || 'modal',
        initial: detail.initial || null,
        demoGate: !!detail.demoGate,
      });
    };
    window.addEventListener('aivision:open-contact', handler);
    return () => window.removeEventListener('aivision:open-contact', handler);
  }, []);

  const close = () => setState((s) => ({ ...s, open: false }));

  return (
    <ContactModal
      open={state.open}
      onClose={close}
      source={state.source}
      initial={state.initial}
      demoGate={state.demoGate}
    />
  );
}
