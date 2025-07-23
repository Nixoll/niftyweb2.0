
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MiroBoard from './MiroBoard';

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showMiroBoard, setShowMiroBoard] = useState(false);
  const [heroContent, setHeroContent] = useState({
    title: "Premium Digital Solutions",
    subtitle: "Transform your business with cutting-edge technology and exceptional design",
    description: "We deliver exceptional results through innovative technology and dedicated expertise, helping businesses scale efficiently while maintaining premium quality standards.",
    ctaText: "Explore Services",
    ctaSecondary: "Try Interactive Board"
  });

  // Initialize heroTexts after heroContent is set
  const [heroTexts, setHeroTexts] = useState([]);

  useEffect(() => {
    // Load hero content from localStorage
    const savedContent = localStorage.getItem('niftyWebsiteContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        if (parsedContent.hero) {
          setHeroContent(parsedContent.hero);
        }
      } catch (error) {
        console.error('Error loading hero content:', error);
      }
    }
  }, []);

  // Update heroTexts when heroContent changes
  useEffect(() => {
    if (heroContent && heroContent.title) {
      setHeroTexts([
        {
          title: heroContent.title,
          subtitle: heroContent.subtitle,
          accent: "Solutions"
        },
        {
          title: "Elite Development Teams",
          subtitle: "World-class developers and designers ready to bring your vision to life",
          accent: "Teams"
        },
        {
          title: "Strategic Innovation",
          subtitle: "Comprehensive strategies that drive growth and competitive advantage",
          accent: "Innovation"
        }
      ]);
    }
  }, [heroContent]);

  useEffect(() => {
    if (heroTexts.length > 0) {
      setIsVisible(true);
      const interval = setInterval(() => {
        setCurrentText((prev) => (prev + 1) % heroTexts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [heroTexts]);

  // Listen for content updates
  useEffect(() => {
    const handleStorageChange = () => {
      const savedContent = localStorage.getItem('niftyWebsiteContent');
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          if (parsedContent.hero) {
            setHeroContent(parsedContent.hero);
          }
        } catch (error) {
          console.error('Error loading updated hero content:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Don't render until heroContent is properly initialized
  if (!heroContent || !heroContent.title) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-24">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pt-24">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://readdy.ai/api/search-image?query=Premium%20modern%20abstract%20digital%20workspace%20background%20with%20geometric%20patterns%2C%20clean%20minimalist%20design%2C%20sophisticated%20technology%20aesthetic%2C%20subtle%20grid%20overlay%2C%20professional%20business%20environment%2C%20soft%20gradient%20from%20light%20gray%20to%20white%20with%20subtle%20blue%20accents%2C%20elegant%20and%20contemporary&width=1920&height=1080&seq=hero-dynamic-bg&orientation=landscape"
          alt="Premium digital workspace"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Animated Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-8">
              <div className="text-lg uppercase tracking-wider text-red-500 font-medium mb-4 flex items-center">
                <div className="w-12 h-px bg-red-500 mr-4"></div>
                Welcome to Nifty Solutions
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                {heroContent.title.split(' ').map((word, index) => (
                  <span key={index} className="inline-block">
                    {word === "Solutions" ? (
                      <span className="text-red-500 relative">
                        {word}
                        <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 12">
                          <path d="M5 8 Q50 2 95 8" stroke="#ef4444" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        </svg>
                      </span>
                    ) : (
                      word
                    )}
                    {index < heroContent.title.split(' ').length - 1 && ' '}
                  </span>
                ))}
              </h1>
              
              <p className="text-2xl text-gray-700 mb-12 leading-relaxed font-light max-w-2xl">
                {heroContent.subtitle}
              </p>
              
              {heroContent.description && (
                <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl">
                  {heroContent.description}
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <button
                onClick={() => scrollToSection('services')}
                className="group bg-red-500 text-white px-10 py-5 rounded-2xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 text-lg font-semibold shadow-2xl whitespace-nowrap"
              >
                <span className="flex items-center justify-center">
                  {heroContent.ctaText || 'Explore Services'}
                  <i className="ri-arrow-right-line ml-3 group-hover:translate-x-2 transition-transform duration-300"></i>
                </span>
              </button>
              
              <button
                onClick={() => setShowMiroBoard(!showMiroBoard)}
                className="group bg-white/90 backdrop-blur-sm text-gray-900 px-10 py-5 rounded-2xl hover:bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 text-lg font-semibold shadow-lg whitespace-nowrap"
              >
                <span className="flex items-center justify-center">
                  {heroContent.ctaSecondary || 'Try Interactive Board'}
                  <i className="ri-palette-line ml-3 group-hover:rotate-12 transition-transform duration-300"></i>
                </span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">50+</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">98%</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Board */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/10 to-green-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Project Board</h3>
                  <p className="text-gray-600">Collaborate with us in real-time</p>
                </div>
                
                {showMiroBoard ? (
                  <MiroBoard />
                ) : (
                  <div className="h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-palette-line text-red-500 text-3xl"></i>
                      </div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Ready to Collaborate?</h4>
                      <p className="text-gray-600 mb-6">Click the button above to start planning your project</p>
                      <button
                        onClick={() => setShowMiroBoard(true)}
                        className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors font-medium whitespace-nowrap"
                      >
                        Launch Board
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection('services')}
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
        >
          <i className="ri-arrow-down-line text-xl"></i>
        </button>
      </div>
    </section>
  );
}
