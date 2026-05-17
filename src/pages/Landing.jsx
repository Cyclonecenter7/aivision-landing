import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { initTracker } from '@/lib/tracker';
import { SEO } from '@/lib/seo';

import Hero from '@/components/landing/v2/Hero';
import Problem from '@/components/landing/v2/Problem';
import Solution from '@/components/landing/v2/Solution';
import Advantages from '@/components/landing/v2/Advantages';
import Platform from '@/components/landing/v2/Platform';
import Customization from '@/components/landing/v2/Customization';
import Integrations from '@/components/landing/v2/Integrations';
import HowWeWork from '@/components/landing/v2/HowWeWork';
import Difference from '@/components/landing/v2/Difference';
import Cases from '@/components/landing/v2/Cases';
import FinalCTA from '@/components/landing/v2/FinalCTA';
import StickyCta from '@/components/landing/v2/StickyCta';
import Footer from '@/components/landing/v2/Footer';

import ContactModal from '@/components/landing/ContactModal';

export default function Landing() {
  const [modal, setModal] = useState({ open: false, initial: null, source: 'modal' });

  useEffect(() => {
    initTracker();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const openContact = (initial = null, source = 'modal') => {
    setModal({ open: true, initial, source });
  };

  const closeContact = () => {
    setModal((m) => ({ ...m, open: false }));
  };

  return (
    <div className="font-inter overflow-x-hidden">
      <Helmet>
        <html lang="ru" />
        <title>{SEO.home.title}</title>
        <meta name="description" content={SEO.home.description} />
        <link rel="canonical" href={SEO.home.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO.home.title} />
        <meta property="og:description" content={SEO.home.description} />
        <meta property="og:url" content={SEO.home.url} />
        <meta property="og:site_name" content="AIVISION" />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO.home.title} />
        <meta name="twitter:description" content={SEO.home.description} />
      </Helmet>

      <Hero onOpenContact={() => openContact(null, 'hero')} />
      <Problem />
      <Solution />
      <Advantages />
      <Platform />
      <Customization />
      <Integrations />
      <HowWeWork />
      <Difference />
      <Cases />
      <FinalCTA />
      <Footer />

      <StickyCta onOpenContact={() => openContact(null, 'sticky')} />

      <ContactModal
        open={modal.open}
        onClose={closeContact}
        source={modal.source}
        initial={modal.initial}
      />
    </div>
  );
}
