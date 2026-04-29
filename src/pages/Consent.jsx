import { useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

function Num({ n }) {
  return <span style={{ color: '#3F6EE8', fontWeight: 700, marginRight: 8 }}>{n}</span>;
}

export default function Consent() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const s = {
    section: { marginTop: 32, paddingTop: 32, borderTop: '1px solid #E8E8E8' },
    h: { fontSize: 15, fontWeight: 700, color: '#0A0A0A', marginBottom: 12, marginTop: 0 },
    p: { fontSize: 13, lineHeight: 1.75, color: '#444', marginBottom: 10 },
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '96px 24px 64px', fontFamily: 'Inter, sans-serif' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-6 h-px bg-[#3F6EE8]" />
          <span className="text-[#3F6EE8] text-xs font-medium uppercase tracking-widest">Правовая информация</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A0A0A', marginBottom: 8 }}>
          Согласие на обработку персональных данных
        </h1>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 32 }}>
          Редакция от 29 апреля 2026 г.
        </p>

        {/* Operator card */}
        <div style={{ background: '#F8F9FC', padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 24px' }}>
            {[
              ['ФИО', 'Будаева Юлия Юрьевна'],
              ['Статус', 'Самозанятая (НПД)'],
              ['ИНН', '333412284650'],
              ['Email', 'support@aivisionpro.ru'],
              ['Телефон', '+7 985 664 8001'],
              ['Бренд', 'AIVISION'],
            ].map(([label, value], i) => (
              <div key={i}>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#888', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#0A0A0A', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="01" />Субъект персональных данных</h2>
          <p style={s.p}>Физическое лицо (далее — «Пользователь»), осуществляющее заполнение формы на Сайте Оператора и проставляющее отметку (чекбокс) о согласии с настоящим документом.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="02" />Перечень персональных данных</h2>
          <p style={s.p}><strong>Данные, предоставляемые добровольно:</strong> имя; номер контактного телефона; Telegram-аккаунт.</p>
          <p style={s.p}><strong>Данные, собираемые автоматически:</strong> IP-адрес; тип и версия ОС; тип и версия браузера; тип устройства и разрешение экрана; источник перехода (реферер); язык ОС и браузера; сведения о посещённых страницах; cookie-идентификаторы; данные собственной системы веб-аналитики Оператора.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="03" />Цели обработки</h2>
          <p style={s.p}>Обработка обращений и предоставление консультаций. Заключение и исполнение договоров возмездного оказания услуг. Аналитика, обеспечение функционирования и безопасности Сайта.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="04" />Правовые основания обработки</h2>
          <p style={s.p}>Согласие субъекта ПДн — п. 1 ч. 1 ст. 6 152-ФЗ. Исполнение договора — п. 5 ч. 1 ст. 6 152-ФЗ. Законные интересы Оператора — п. 7 ч. 1 ст. 6 152-ФЗ.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="05" />Перечень действий с персональными данными</h2>
          <p style={s.p}>Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (предоставление, доступ), обезличивание, блокирование, удаление, уничтожение — как с использованием средств автоматизации, так и без таковых.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="06" />Передача персональных данных</h2>
          <p style={s.p}>Могут быть переданы обработчикам по договорам (ч. 3 ст. 6 152-ФЗ). На дату редакции обработчики не привлекаются. Перечень обработчиков — в <a href="/privacy-policy" style={{ color: '#3F6EE8' }}>Политике обработки ПДн</a>.</p>
          <p style={s.p}>Государственным органам — в случаях, предусмотренных законодательством РФ.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="07" />Хранение персональных данных</h2>
          <p style={s.p}>На территории Российской Федерации (ч. 5 ст. 18 152-ФЗ). Срок — не более 5 лет с момента последнего взаимодействия, если иное не предусмотрено договором или законодательством.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="08" />Срок действия согласия</h2>
          <p style={s.p}>5 лет с момента предоставления либо до отзыва. Если обработка необходима для исполнения договора — продолжается до полного исполнения обязательств.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="09" />Порядок отзыва согласия</h2>
          <p style={s.p}>По электронной почте: <a href="mailto:support@aivisionpro.ru" style={{ color: '#3F6EE8' }}>support@aivisionpro.ru</a> (тема: «Отзыв согласия на обработку ПДн»). Почтовым отправлением по адресу Оператора. Оператор прекращает обработку и уничтожает ПДн в течение 30 дней.</p>
        </div>

        <div style={s.section}>
          <h2 style={s.h}><Num n="10" />Способ предоставления согласия</h2>
          <p style={s.p}>Проставление отметки (чекбокса) в поле: «Я ознакомлен(-а) и согласен(-а) с Согласием на обработку персональных данных и Политикой обработки персональных данных» на странице оформления заявки на Сайте. Является конклюдентным действием (ч. 1 ст. 9 152-ФЗ).</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
