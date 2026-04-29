import { useState, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardSlider3 from '@/components/landing/DashboardSlider3';
import ContactModal from '@/components/landing/ContactModal';

const clipSm = 'polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%)';
const clipBtn = 'polygon(0 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)';

export default function CasePage3() {
  const [contactModal, setContactModal] = useState(false);

  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  return (
    <div className="min-h-screen bg-[#F4F4F5] font-inter">
      <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
        <Link to="/#cases" className="inline-flex items-center gap-2 text-[#666] hover:text-[#0A0A0A] transition-colors text-sm">
          <ArrowLeft size={16} />
          Назад
        </Link>
        <Link to="/case/1" className="inline-flex items-center gap-2 text-[#3F6EE8] hover:text-blue-700 transition-colors text-sm font-medium">
          Первый кейс <ArrowRight size={16} />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="bg-[#3F6EE8] px-3 py-1 text-white text-[10px] font-bold uppercase tracking-widest"
              style={{ clipPath: clipSm }}
            >
              E-commerce · WB
            </div>
            <span className="text-[#AAA] text-xs">5+ млн ₽ / мес · 3 бренда</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] leading-tight mb-4">
            Как мы оптимизировали систему продаж<br className="hidden md:block" /> в бизнесе с оборотом 5+ млн ₽ в месяц
          </h1>
          <p className="text-[#888] text-sm max-w-xl leading-relaxed">
            Продажи шли стабильно, но 2–3 часа в день уходило на ручной сбор данных.
            Автоматизировали через API — менеджер освободил треть рабочего времени.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="flex flex-col gap-6">

            {/* Point A */}
            <div className="bg-white border border-[#E8E8E8] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#E5484D]" />
                <span className="text-[#E5484D] text-[10px] font-semibold uppercase tracking-widest">Точка А — Проблема</span>
              </div>
              <p className="text-[#555] text-sm leading-relaxed mb-4">
                Оборот 5+ млн/мес, три бренда на WB. Продажи есть. Но данные — в Excel,
                менеджер перегружен ручной аналитикой, конверсия по воронке не отслеживается.
              </p>
              {[
                'Сбор данных из WB занимал 2–3 часа ежедневно вручную',
                'Часть операций не фиксировалась — расхождения в цифрах',
                'Конверсия на этапах воронки не отслеживалась',
                'Аналитика по брендам и товарам — вручную в таблицах',
                'Планирование строилось по факту, без прогнозов',
                'Все операционные решения замыкались на одном менеджере',
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-2.5 mb-2">
                  <div className="w-1.5 h-1.5 mt-1.5 bg-[#E5484D] rounded-full flex-shrink-0" />
                  <span className="text-[#666] text-sm leading-relaxed">{p}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="bg-white border border-[#E8E8E8] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#3F6EE8]" />
                <span className="text-[#3F6EE8] text-[10px] font-semibold uppercase tracking-widest">Что сделали</span>
              </div>
              {[
                { n: '01', t: 'API-интеграция с WB', d: 'Данные по заказам, просмотрам и конверсии подтягиваются автоматически' },
                { n: '02', t: 'Многоуровневая воронка', d: 'Просмотры → корзина → заказ → выкуп с конверсией на каждом этапе' },
                { n: '03', t: 'Аналитика по брендам', d: 'Отдельные PnL по каждому бренду с динамикой роста' },
                { n: '04', t: 'Прогноз и дашборд', d: 'Управленческий дашборд с прогнозом на 6 месяцев вперёд' },
              ].map(a => (
                <div key={a.n} className="flex items-start gap-3 mb-3 bg-[#F8F9FC] border border-[#E8EEF8] p-4">
                  <div
                    className="w-7 h-7 bg-[#3F6EE8] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                    style={{ clipPath: 'polygon(0 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%)' }}
                  >
                    {a.n}
                  </div>
                  <div>
                    <div className="text-[#0A0A0A] text-sm font-semibold mb-0.5">{a.t}</div>
                    <div className="text-[#888] text-xs">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
            <div className="bg-white border border-[#E8E8E8] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-[#0A0A0A]" />
                <span className="text-[#0A0A0A] text-[10px] font-semibold uppercase tracking-widest">Результат</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { v: '2 ч/день', l: 'сэкономлено на сборе данных', c: 'text-green-600' },
                  { v: '−35%', l: 'нагрузка менеджера', c: 'text-green-600' },
                  { v: '12.3%', l: 'конверсия в заказ', c: 'text-[#3F6EE8]' },
                  { v: '3 API', l: 'источника данных', c: 'text-[#3F6EE8]' },
                  { v: '+35%', l: 'выручка за квартал', c: 'text-green-600' },
                  { v: '6 мес', l: 'прогноз ДДС', c: 'text-[#3F6EE8]' },
                ].map((r, i) => (
                  <div key={i} className="bg-[#F4F4F5] border border-[#E8E8E8] p-3">
                    <div className={`text-lg font-bold mb-0.5 ${r.c}`}>{r.v}</div>
                    <div className="text-[#999] text-[10px] leading-relaxed">{r.l}</div>
                  </div>
                ))}
              </div>
              <p className="text-[#555] text-sm leading-relaxed mt-4 pt-4 border-t border-[#F0F0F0]">
                <span className="text-[#0A0A0A] font-semibold">Главное: </span>
                Продажи стали управляемым процессом. Менеджер занимается ростом, а не сбором цифр.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="self-start md:sticky md:top-6 overflow-hidden">
            <DashboardSlider3 />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0A0A0A] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ clipPath: 'polygon(0 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%)' }}>
          <div>
            <div className="text-white text-lg font-bold mb-1">Хотите такой же результат?</div>
            <p className="text-[#555] text-sm">Начнём с диагностики — покажем, где теряется прибыль именно в вашем бизнесе</p>
          </div>
          <button
            onClick={() => setContactModal(true)}
            className="flex items-center gap-2 bg-[#3F6EE8] text-white text-sm font-medium px-8 py-4 hover:bg-blue-700 transition-colors flex-shrink-0"
            style={{ clipPath: clipBtn }}
          >
            Начать диагностику <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <ContactModal open={contactModal} onClose={() => setContactModal(false)} />
    </div>
  );
}