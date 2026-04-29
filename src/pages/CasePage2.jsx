import { useState, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardSlider2 from '@/components/landing/DashboardSlider2';
import ContactModal from '@/components/landing/ContactModal';

const clipSm = 'polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%)';
const clipBtn = 'polygon(0 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)';

export default function CasePage2() {
  const [contactModal, setContactModal] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  const handleBack = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('cases');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] font-inter">
      <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-[#666] hover:text-[#0A0A0A] transition-colors text-sm bg-transparent border-0 cursor-pointer p-0">
          <ArrowLeft size={16} />
          Назад
        </button>
        <Link to="/case/3" className="inline-flex items-center gap-2 text-[#3F6EE8] hover:text-blue-700 transition-colors text-sm font-medium">
          Следующий кейс <ArrowRight size={16} />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="bg-[#0A0A0A] px-3 py-1 text-white text-[10px] font-bold uppercase tracking-widest"
              style={{ clipPath: clipSm }}
            >
              Оборот 200+ млн ₽
            </div>
            <span className="text-[#AAA] text-xs">4 проекта · Строительство/услуги</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] leading-tight mb-4">
            Как мы навели систему в бизнесе<br className="hidden md:block" /> с оборотом 200+ млн ₽ и 4 проектами
          </h1>
          <p className="text-[#888] text-sm max-w-xl leading-relaxed">
            Большой оборот — нулевая прозрачность. Один из проектов тихо съедал ресурс.
            Выстроили раздельный учёт, CRM и управленческий дашборд за 30 дней.
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
                Компания с оборотом 200+ млн ₽ в год. 4 активных проекта. На уровне цифр — стабильность.
                На уровне управления — полный туман.
              </p>
              {[
                'Все доходы и расходы сводились в один общий PnL без разбивки',
                'CRM отсутствовала — приходы фиксировались некорректно',
                'Не было понимания прибыльности каждого проекта',
                'Большинство решений замыкалось на собственнике',
                'Регулярные кассовые разрывы и долги перед подрядчиками',
                'Высокий юридический риск — договоры не структурированы',
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
                { n: '01', t: 'Раздельный учёт', d: '4 самостоятельных PnL — отдельно по каждому проекту' },
                { n: '02', t: 'CRM + финансы', d: 'Настроили CRM, связали с фин. учётом и движением денег' },
                { n: '03', t: 'Процессы и команда', d: 'Прописали зоны ответственности, вывели управленцев' },
                { n: '04', t: 'Управленческий дашборд', d: 'Все ключевые показатели в одном месте в реальном времени' },
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
                  { v: '100%', l: 'финансовых операций в системе', c: 'text-[#3F6EE8]' },
                  { v: '4 PnL', l: 'отдельных проекта', c: 'text-[#3F6EE8]' },
                  { v: '0', l: 'кассовых разрывов', c: 'text-green-600' },
                  { v: '1 из 4', l: 'проект убыточный', c: 'text-red-500' },
                  { v: '+20%/мес', l: '2 проекта растут', c: 'text-green-600' },
                  { v: '6–12', l: 'мес. прогноз ДДС', c: 'text-[#3F6EE8]' },
                ].map((r, i) => (
                  <div key={i} className="bg-[#F4F4F5] border border-[#E8E8E8] p-3">
                    <div className={`text-lg font-bold mb-0.5 ${r.c}`}>{r.v}</div>
                    <div className="text-[#999] text-[10px] leading-relaxed">{r.l}</div>
                  </div>
                ))}
              </div>
              <p className="text-[#555] text-sm leading-relaxed mt-4 pt-4 border-t border-[#F0F0F0]">
                <span className="text-[#0A0A0A] font-semibold">Главное: </span>
                Сократили расходы на убыточный проект, составили финансовый план по выплатам долгов, усилили вложения в маржинальный проект и 2 стратегических.
              </p>
            </div>
          </div>

          {/* RIGHT — Dashboard Slider */}
          <div className="self-start md:sticky md:top-6 overflow-hidden">
            <DashboardSlider2 />
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