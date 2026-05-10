import { useState, useLayoutEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/lib/seo';
import DashboardSlider from '@/components/landing/DashboardSlider';
import ContactModal from '@/components/landing/ContactModal';
import { CASES } from '@/data/cases';
import { Btn } from '@/components/ui';

const clipSm  = 'polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%)';
const clipNum = 'polygon(0 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%)';

export default function CasePage() {
  const { id } = useParams();
  const [contactModal, setContactModal] = useState(false);
  const navigate = useNavigate();

  const c = CASES[id];
  if (!c) return <Navigate to="/" replace />;

  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [id]);

  const seoKey = 'case' + id;
  const seo = SEO[seoKey] || SEO.home;

  const handleBack = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('cases');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] font-inter">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.url} />
      </Helmet>
      {/* Nav */}
      <div className="max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
        <Btn variant="ghost" size="sm" className="inline-flex items-center gap-2 text-[#666] hover:text-background p-0" style={{ clipPath: 'none' }} onClick={handleBack}>
          <ArrowLeft size={16} />
          Назад
        </Btn>
        <Link to={`/case/${c.nextId}`} className="inline-flex items-center gap-2 text-blue hover:text-blue-700 transition-colors text-sm font-medium">
          {c.nextLabel} <ArrowRight size={16} />
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="px-3 py-1 text-white text-[10px] font-bold uppercase tracking-widest"
              style={{ background: c.tagBg, clipPath: clipSm }}
            >
              {c.tag}
            </div>
            <span className="text-[#AAA] text-xs">{c.tagSub}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-background leading-tight mb-4">
            {c.titleLine1}<br className="hidden md:block" /> {c.titleLine2}
          </h1>
          <p className="text-[#888] text-sm max-w-xl leading-relaxed">{c.description}</p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="flex flex-col gap-6">

            {/* Problem */}
            <div className="bg-white border border-[#E8E8E8] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-red" />
                <span className="text-red text-[10px] font-semibold uppercase tracking-widest">Точка А — Проблема</span>
              </div>
              <p className="text-[#555] text-sm leading-relaxed mb-4">{c.problemsIntro}</p>
              {c.problems.map((p, i) => (
                <div key={i} className="flex items-start gap-2.5 mb-2">
                  <div className="w-1.5 h-1.5 mt-1.5 bg-red rounded-full flex-shrink-0" />
                  <span className="text-[#666] text-sm leading-relaxed">{p}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="bg-white border border-[#E8E8E8] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-blue" />
                <span className="text-blue text-[10px] font-semibold uppercase tracking-widest">Что сделали</span>
              </div>
              {c.actions.map(a => (
                <div key={a.n} className="flex items-start gap-3 mb-3 bg-[#F8F9FC] border border-[#E8EEF8] p-4">
                  <div
                    className="w-7 h-7 bg-blue flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                    style={{ clipPath: clipNum }}
                  >
                    {a.n}
                  </div>
                  <div>
                    <div className="text-background text-sm font-semibold mb-0.5">{a.t}</div>
                    <div className="text-[#888] text-xs">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results */}
            <div className="bg-white border border-[#E8E8E8] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-background" />
                <span className="text-background text-[10px] font-semibold uppercase tracking-widest">Результат</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {c.results.map((r, i) => (
                  <div key={i} className="bg-[#F4F4F5] border border-[#E8E8E8] p-3">
                    <div className={`text-lg font-bold mb-0.5 ${r.c}`}>{r.v}</div>
                    <div className="text-[#999] text-[10px] leading-relaxed">{r.l}</div>
                  </div>
                ))}
              </div>
              <p className="text-[#555] text-sm leading-relaxed mt-4 pt-4 border-t border-[#F0F0F0]">
                <span className="text-background font-semibold">Главное: </span>
                {c.resultsSummary}
              </p>
            </div>
          </div>

          {/* RIGHT — Dashboard Slider */}
          <div className="self-start md:sticky md:top-6 overflow-hidden">
            <DashboardSlider variant={c.sliderVariant} light={c.sliderLight} />
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-12 bg-background p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ clipPath: 'polygon(0 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%)' }}
        >
          <div>
            <div className="text-white text-lg font-bold mb-1">Хотите такой же результат?</div>
            <p className="text-[#555] text-sm">Начнём с диагностики — покажем, где теряется прибыль именно в вашем бизнесе</p>
          </div>
          <Btn
            size="lg"
            track="case_cta_diagnose"
            trackBlock="case_page"
            className="flex items-center gap-2 flex-shrink-0"
            onClick={() => setContactModal(true)}
          >
            Начать диагностику <ArrowRight size={14} />
          </Btn>
        </div>
      </div>

      <ContactModal open={contactModal} onClose={() => setContactModal(false)} />
    </div>
  );
}
