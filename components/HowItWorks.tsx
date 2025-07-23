
'use client';

import { useEffect, useState } from 'react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
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

    const section = document.getElementById('how-it-works');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      number: '01',
      title: 'Plan',
      description: 'We dive deep into your business goals and create a comprehensive strategy',
      icon: 'ri-lightbulb-line',
      bgColor: 'bg-red-50',
      iconBg: 'bg-red-500',
      borderColor: 'border-red-300',
      accentColor: '#ff5757',
      sketch: 'M10 30 Q30 10 50 30 Q70 50 90 30'
    },
    {
      number: '02',
      title: 'Assign',
      description: 'We carefully select and assign the perfect team for your project',
      icon: 'ri-team-line',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-500',
      borderColor: 'border-green-300',
      accentColor: '#7ed957',
      sketch: 'M10 20 Q30 40 50 20 Q70 40 90 20'
    },
    {
      number: '03',
      title: 'Build',
      description: 'Our expert team brings your vision to life with precision and creativity',
      icon: 'ri-hammer-line',
      bgColor: 'bg-cyan-50',
      iconBg: 'bg-cyan-500',
      borderColor: 'border-cyan-300',
      accentColor: '#0cc0df',
      sketch: 'M10 35 Q30 15 50 35 Q70 15 90 35'
    },
    {
      number: '04',
      title: 'Deliver',
      description: 'We ensure seamless delivery and provide ongoing support for your success',
      icon: 'ri-rocket-line',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-500',
      borderColor: 'border-yellow-300',
      accentColor: '#ffbd59',
      sketch: 'M10 25 Q30 45 50 25 Q70 45 90 25'
    }
  ];

  return (
    <section id="how-it-works" className="pt-32 pb-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="arrows" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M20 40 L60 40 M50 30 L60 40 L50 50" stroke="#ff5757" strokeWidth="2" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arrows)"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 relative">
            How It Works
            <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-3" viewBox="0 0 144 12">
              <path d="M5 8 Q72 2 139 8" stroke="#7ed957" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
            Our proven 4-step process ensures your project's success from start to finish
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`transition-all duration-700 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={`group relative ${activeStep === index ? 'scale-105' : ''} transition-all duration-500`}>
                <div className={`${step.bgColor} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border-2 ${activeStep === index ? step.borderColor : 'border-gray-100'}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d={step.sketch} stroke="currentColor" strokeWidth="3" fill="none"/>
                    </svg>
                  </div>
                  <div className={`w-16 h-16 ${step.iconBg} rounded-2xl flex items-center justify-center mb-6 relative`} style={{ backgroundColor: step.accentColor }}>
                    <i className={`${step.icon} text-2xl text-white`}></i>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                      <span className="text-xs font-bold text-gray-800">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative">
                    {step.title}
                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all ${activeStep === index ? 'w-full' : 'w-0'}`} style={{ backgroundColor: step.accentColor }}></div>
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {step.description}
                  </p>
                  {activeStep === index && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md animate-pulse">
                      <div className="w-full h-full bg-red-500 rounded-full opacity-75 animate-ping"></div>
                    </div>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-red-500" viewBox="0 0 32 32">
                      <path d="M8 16 L24 16 M20 12 L24 16 L20 20" stroke="#ff5757" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="inline-block bg-red-100 p-6 rounded-2xl transform rotate-1 shadow-lg relative">
            <p className="text-xl font-bold text-gray-900 mb-2">
              From idea to delivery in weeks, not months!
            </p>
            <p className="text-gray-800 text-lg">
              Ready to get started?
            </p>
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full animate-bounce" style={{ backgroundColor: '#7ed957' }}></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500 rounded-full" style={{ backgroundColor: '#ff5757' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
