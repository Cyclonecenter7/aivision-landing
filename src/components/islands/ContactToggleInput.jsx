import { useState } from 'react';



export default function ContactToggleInput({ value, onChange, dark = false }) {
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

  const bg      = dark ? 'bg-[#252525]' : 'bg-[#F4F6FA]';
  const border  = dark ? 'border-[#2A2A2A] focus-within:border-blue' : 'border-[#E8E8E8] focus-within:border-blue';
  const text    = dark ? 'text-white' : 'text-background';
  const ph      = dark ? 'placeholder:text-[#444]' : 'placeholder:text-[#BBB]';
  const prefix  = dark ? 'text-blue' : 'text-blue';
  const tabBase = 'text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 transition-colors cursor-pointer';
  const tabOff  = dark ? 'text-[#555] hover:text-[#888]' : 'text-[#AAA] hover:text-[#666]';
  const tabOn   = dark ? 'text-white bg-blue' : 'text-white bg-blue';

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center gap-0 mb-2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}>
        <button
          type="button"
          data-track="modal_toggle_tg"
          data-track-block="contact_modal"
          onClick={() => handleModeSwitch('telegram')}
          className={`${tabBase} ${mode === 'telegram' ? tabOn : tabOff}`}
        >
          Telegram
        </button>
        <button
          type="button"
          data-track="modal_toggle_phone"
          data-track-block="contact_modal"
          onClick={() => handleModeSwitch('phone')}
          className={`${tabBase} ${mode === 'phone' ? tabOn : tabOff}`}
        >
          Телефон
        </button>
      </div>

      {/* Input */}
      <div
        className={`flex items-center ${bg} border ${border} transition-colors`}
      >
        {mode === 'telegram' && (
          <span className={`pl-4 pr-1 text-sm font-medium select-none ${prefix}`}>@</span>
        )}
        <input
          required
          type={mode === 'phone' ? 'tel' : 'text'}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={mode === 'telegram' ? 'username' : '(000) 000 00 00'}
          maxLength={mode === 'phone' ? 18 : 32}
          className={`flex-1 bg-transparent ${text} text-sm px-3 py-3 focus:outline-none ${ph}`}
          style={mode === 'telegram' ? { paddingLeft: 0 } : {}}
        />
      </div>
    </div>
  );
}