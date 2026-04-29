import { useEffect } from 'react';
import { initTracker } from '@/lib/tracker';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Products from '@/components/landing/Products';
import Integrations from '@/components/landing/Integrations';
import Cases from '@/components/landing/Cases';
import ComparisonWithForm from '@/components/landing/ComparisonWithForm';
import Footer from '@/components/landing/Footer';
import StarterBanner from '@/components/landing/StarterBanner';

export default function Landing() {
  useEffect(() => {
    initTracker();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="font-inter overflow-x-hidden">
      <Navbar />

      <Hero />
      <Problem />
      <Products />
      <Integrations />
      <Cases />
      <ComparisonWithForm />
      <Footer />

      <StarterBanner />
    </div>
  );
}