'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhatWeDo from '@/components/WhatWeDo';
import WhyNifty from '@/components/WhyNifty';
import HowItWorks from '@/components/HowItWorks';
import ProjectShowcase from '@/components/ProjectShowcase';
import Founders from '@/components/Founders';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import AILiveChat from '@/components/AILiveChat';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WhatWeDo />
      <WhyNifty />
      <HowItWorks />
      <ProjectShowcase />
      <Founders />
      <FinalCTA />
      <Footer />
      <AILiveChat />
    </div>
  );
}