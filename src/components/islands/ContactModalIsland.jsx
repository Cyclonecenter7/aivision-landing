import { useEffect, useState } from 'react';
import ContactModal from './ContactModal';

export default function ContactModalIsland() {
  const [state, setState] = useState({ open: false, source: 'modal', initial: null, mode: 'audit' });

  useEffect(() => {
    const handler = (e) => {
      const detail = e.detail || {};
      setState({
        open: true,
        source: detail.source || 'modal',
        initial: detail.initial || null,
        mode: detail.mode === 'demo' ? 'demo' : 'audit',
      });
    };
    window.addEventListener('shvec:open-contact', handler);
    return () => window.removeEventListener('shvec:open-contact', handler);
  }, []);

  const close = () => setState((s) => ({ ...s, open: false }));

  return (
    <ContactModal
      open={state.open}
      onClose={close}
      source={state.source}
      initial={state.initial}
      mode={state.mode}
    />
  );
}
