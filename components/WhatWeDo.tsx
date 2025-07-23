
'use client';

import { useState } from 'react';

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState('digital');

  const digitalSolutions = [
    {
      icon: 'ri-global-line',
      title: 'Web Development',
      description: 'Premium websites and web applications built with cutting-edge technology for performance and scalability',
      sketch: 'M10 20 Q30 10 50 20 Q70 30 90 20'
    },
    {
      icon: 'ri-shopping-cart-line',
      title: 'E-commerce',
      description: 'Luxury online stores with advanced payment integration and intelligent inventory management',
      sketch: 'M10 30 Q30 20 50 30 Q70 40 90 30'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications with premium user experience design',
      sketch: 'M10 40 Q30 30 50 40 Q70 50 90 40'
    },
    {
      icon: 'ri-robot-line',
      title: 'AI Solutions',
      description: 'Intelligent automation and AI-powered features with sophisticated machine learning capabilities',
      sketch: 'M10 50 Q30 40 50 50 Q70 60 90 50'
    },
    {
      icon: 'ri-settings-line',
      title: 'Automation',
      description: 'Advanced workflow automation and intelligent business process optimization',
      sketch: 'M10 60 Q30 50 50 60 Q70 70 90 60'
    }
  ];

  const outsourcedServices = [
    {
      icon: 'ri-palette-line',
      title: 'Design Services',
      description: 'Premium UI/UX design, sophisticated branding, and creative solutions with luxury aesthetics',
      sketch: 'M10 20 Q30 10 50 20 Q70 30 90 20'
    },
    {
      icon: 'ri-user-settings-line',
      title: 'Admin Support',
      description: 'Executive-level administrative support and premium back-office operations management',
      sketch: 'M10 30 Q30 20 50 30 Q70 40 90 30'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Virtual Assistants',
      description: 'Highly skilled virtual assistants with specialized expertise for complex business needs',
      sketch: 'M10 40 Q30 30 50 40 Q70 50 90 40'
    },
    {
      icon: 'ri-drafting-compass-line',
      title: 'CAD Services',
      description: 'Professional technical drawings, advanced 3D modeling, and precision engineering design',
      sketch: 'M10 50 Q30 40 50 50 Q70 60 90 50'
    },
    {
      icon: 'ri-article-line',
      title: 'Content Creation',
      description: 'Premium content writing, sophisticated copywriting, and strategic content development',
      sketch: 'M10 60 Q30 50 50 60 Q70 70 90 60'
    },
    {
      icon: 'ri-headphone-line',
      title: 'Customer Support',
      description: 'White-glove customer service and premium technical support solutions',
      sketch: 'M10 70 Q30 60 50 70 Q70 80 90 70'
    }
  ];

  const currentServices = activeTab === 'digital' ? digitalSolutions : outsourcedServices;

  return (
    <section id="services" className="pt-32 pb-24 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="premium-dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="#f87171"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#premium-dots)"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="text-base uppercase tracking-widest font-medium mb-6 flex items-center justify-center text-red-400">
            <div className="w-8 h-px mr-3 bg-red-300"></div>
            Our Services
            <div className="w-8 h-px ml-3 bg-red-300"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 relative tracking-tight">
            What We Do
            <svg className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-4" viewBox="0 0 160 16">
              <path d="M8 12 Q80 4 152 12" stroke="#f87171" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
            We offer comprehensive premium digital solutions and elite outsourced services to elevate your business to new heights
          </p>
        </div>
        
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-200/50 flex flex-col sm:flex-row w-full max-w-md sm:max-w-none">
            <button
              onClick={() => setActiveTab('digital')}
              className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 whitespace-nowrap mb-2 sm:mb-0 ${
                activeTab === 'digital'
                  ? 'text-white shadow-lg bg-sky-400'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <span className="uppercase tracking-wide text-sm sm:text-base">Digital Solutions</span>
            </button>
            <button
              onClick={() => setActiveTab('outsourced')}
              className={`px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === 'outsourced'
                  ? 'text-white shadow-lg bg-green-400'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <span className="uppercase tracking-wide text-sm sm:text-base">Outsourced Services</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentServices.map((service, index) => (
            <div key={index} className="group relative">
              <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200/50 hover:border-red-200/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d={service.sketch} stroke="currentColor" strokeWidth="2" fill="none" style={{ color: activeTab === 'digital' ? '#38bdf8' : '#f87171' }}/>
                  </svg>
                </div>
                
                <div className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-8 ${
                  activeTab === 'digital' ? 'bg-sky-50' : 'bg-green-50'
                }`}>
                  <i className={`${service.icon} text-3xl`} style={{ color: activeTab === 'digital' ? '#38bdf8' : '#84cc16' }}></i>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 relative tracking-tight">
                  {service.title}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: activeTab === 'digital' ? '#38bdf8' : '#f87171' }}></div>
                </h3>
                
                <p className="text-gray-700 leading-relaxed font-light text-lg">
                  {service.description}
                </p>
                
                <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-red-500 opacity-0 group-hover:opacity-10 transition-all duration-300 transform rotate-45" style={{ backgroundColor: activeTab === 'digital' ? '#38bdf8' : '#f87171' }}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <div className="inline-block p-8 rounded-2xl shadow-lg border border-red-200/50 bg-red-400 relative">
            <p className="text-2xl font-medium text-white mb-2">
              Need something custom?
            </p>
            <p className="text-red-100 font-light text-lg">
              We create bespoke solutions tailored to your unique requirements
            </p>
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
