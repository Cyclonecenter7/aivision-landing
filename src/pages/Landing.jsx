import { useEffect } from 'react';
import { initTracker } from '@/lib/tracker';
import { Helmet } from 'react-helmet-async';
import { SEO } from '@/lib/seo';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Products from '@/components/landing/Products';
import DemoStrip from '@/components/landing/DemoStrip';
import Cases from '@/components/landing/Cases';
import ComparisonWithForm from '@/components/landing/ComparisonWithForm';
import Diagnosis from '@/components/landing/Diagnosis';
import Footer from '@/components/landing/Footer';

export default function Landing() {
  useEffect(() => {
    initTracker();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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

      <Navbar />

      <Hero />
      <Problem />
      <Products />
      <DemoStrip />
      <Cases />
      <ComparisonWithForm />
      <Diagnosis />
      <Footer />
    </div>
  );
}