
'use client';

import { useEffect, useState } from 'react';

export default function WhyNifty() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('why-nifty');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      badge: 'Strategy-First Approach',
      description: 'We begin with comprehensive strategic analysis before any implementation, ensuring every solution aligns with your business objectives',
      color: 'bg-red-50 border-red-200',
      textColor: '#ff5757',
      icon: 'ri-lightbulb-line'
    },
    {
      badge: 'Elite Managed Teams',
      description: 'Premium team curation and management from world-class recruitment to flawless project delivery',
      color: 'bg-green-50 border-green-200',
      textColor: '#7ed957',
      icon: 'ri-team-line'
    },
    {
      badge: 'Global Excellence',
      description: 'Access to top-tier global talent delivering exceptional results across all time zones with premium standards',
      color: 'bg-cyan-50 border-cyan-200',
      textColor: '#0cc0df',
      icon: 'ri-global-line'
    },
    {
      badge: 'Scalable Architecture',
      description: 'Enterprise-grade solutions built with advanced architecture that scales seamlessly with your business growth',
      color: 'bg-orange-50 border-orange-200',
      textColor: '#ffbd59',
      icon: 'ri-rocket-line'
    }
  ];

  return (
    <section id="why-nifty" className="pt-32 pb-24 bg-gradient-to-br from-slate-50/50 to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="premium-hexagons" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,10 65,25 65,55 40,70 15,55 15,25" fill="none" stroke="#ff5757" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premium-hexagons)"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="text-base uppercase tracking-widest font-medium mb-6 flex items-center justify-center" style={{ color: '#7ed957' }}>
            <div className="w-8 h-px mr-3 bg-green-500" style={{ backgroundColor: '#7ed957' }}></div>
            Why Choose Us
            <div className="w-8 h-px ml-3 bg-green-500" style={{ backgroundColor: '#7ed957' }}></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 relative tracking-tight">
            Why Choose Nifty?
            <svg className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-4" viewBox="0 0 192 16">
              <path d="M8 12 Q96 4 184 12" stroke="#7ed957" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
            We're not just another agency. We're your premium strategic partner in digital transformation and business excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`transition-all duration-700 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="group relative">
                <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200/50 hover:border-red-200/50 relative overflow-hidden">
                  <div className="absolute top-6 right-6 opacity-5">
                    <i className={`${reason.icon} text-6xl`}></i>
                  </div>
                  
                  <div className={`inline-flex items-center px-6 py-3 rounded-2xl border ${reason.color} font-medium mb-6 relative`}>
                    <i className={`${reason.icon} mr-3 text-lg`} style={{ color: reason.textColor }}></i>
                    <span className="text-base uppercase tracking-wide" style={{ color: reason.textColor }}>{reason.badge}</span>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{ backgroundColor: '#ff5757' }}></div>
                  </div>
                  
                  <p className="text-gray-700 text-xl leading-relaxed font-light">
                    {reason.description}
                  </p>
                  
                  <div className="absolute -bottom-3 -left-3 w-20 h-20 opacity-5">
                    <svg viewBox="0 0 80 80" className="w-full h-full">
                      <path d="M40 10 L70 25 L70 55 L40 70 L10 55 L10 25 Z" fill="currentColor" style={{ color: '#ff5757' }}/>
                    </svg>
                  </div>
                </div>
                
                <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-green-500 opacity-0 group-hover:opacity-20 transition-all duration-300 animate-pulse" style={{ backgroundColor: '#7ed957' }}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <div className="inline-block relative">
            <div className="text-white p-10 rounded-3xl shadow-2xl border border-red-500/50 bg-red-500" style={{ backgroundColor: '#ff5757' }}>
              <p className="text-2xl font-bold mb-3">Ready to experience premium excellence?</p>
              <p className="text-red-100 font-light text-xl">Let's transform your vision into extraordinary reality</p>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full animate-bounce" style={{ backgroundColor: '#ffbd59' }}></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-500 rounded-full animate-pulse" style={{ backgroundColor: '#0cc0df' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
