import { useState } from 'react';

export default function ContactToggleInput({ value, onChange, dark = false, trackBlock = 'contact_modal' }) {
  const [mode, setMode] = useState('telegram'); // 'telegram' | 'phone'

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    onChange('');
  };

  const PHONE_PREFIX = '+7 ';

  const formatPhone = (digits) => {
    // Format: +7 (000) 000 00 00
    const d = digits.slice(0, 10);
    let result = '';
    if (d.length > 0) result += '(' + d.slice(0, 3);
    if (d.length > 3) result += ') ' + d.slice(3, 6);
    if (d.length > 6) result += ' ' + d.slice(6, 8);
    if (d.length > 8) result += ' ' + d.slice(8, 10);
    return result;
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (mode === 'telegram') {
      val = val.replace(/^@+/, '');
      onChange(val);
    } else {
      if (!val.startsWith(PHONE_PREFIX)) {
        val = PHONE_PREFIX;
      }
      const digits = val.slice(PHONE_PREFIX.length).replace(/\D/g, '').slice(0, 10);
      onChange(PHONE_PREFIX + formatPhone(digits));
    }
  };

  const handleFocus = () => {
    if (mode === 'phone' && !value.startsWith(PHONE_PREFIX)) {
      onChange(PHONE_PREFIX);
    }
  };

  const displayValue = value;

  return (
    <div className={`lead-contact${dark ? ' lead-contact--dark' : ' lead-contact--light'}`}>
      <div className="lead-contact-toggle" role="group" aria-label="Предпочтительный способ связи">
        <button
          type="button"
          data-track="modal_toggle_tg"
          data-track-block={trackBlock}
          onClick={() => handleModeSwitch('telegram')}
          className={`lead-contact-tab${mode === 'telegram' ? ' active' : ''}`}
          aria-pressed={mode === 'telegram'}
        >
          Telegram
        </button>
        <button
          type="button"
          data-track="modal_toggle_phone"
          data-track-block={trackBlock}
          onClick={() => handleModeSwitch('phone')}
          className={`lead-contact-tab${mode === 'phone' ? ' active' : ''}`}
          aria-pressed={mode === 'phone'}
        >
          Телефон
        </button>
      </div>

      <div className="lead-contact-input-wrap">
        {mode === 'telegram' && (
          <span className="lead-contact-prefix">@</span>
        )}
        <input
          required
          type={mode === 'phone' ? 'tel' : 'text'}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={mode === 'telegram' ? 'username' : '(000) 000 00 00'}
          maxLength={mode === 'phone' ? 18 : 32}
          className="lead-contact-input"
          aria-label={mode === 'telegram' ? 'Telegram' : 'Телефон'}
        />
      </div>
    </div>
  );
}
