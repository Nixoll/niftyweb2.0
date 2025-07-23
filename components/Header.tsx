
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'why-nifty', 'how-it-works', 'work', 'team', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? 'hero' : section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId === 'home' ? 'hero' : sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navigation = [
    { id: 'home', label: 'Home', icon: 'ri-home-line' },
    { id: 'services', label: 'Services', icon: 'ri-service-line' },
    { id: 'why-nifty', label: 'Why Nifty', icon: 'ri-star-line' },
    { id: 'how-it-works', label: 'Process', icon: 'ri-flow-chart' },
    { id: 'work', label: 'Portfolio', icon: 'ri-folder-line' },
    { id: 'team', label: 'Team', icon: 'ri-team-line' },
    { id: 'contact', label: 'Contact', icon: 'ri-contacts-line' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="text-2xl font-bold text-gray-900 font-pacifico">
              <span className="text-red-500">Nifty</span> Solutions
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                  activeSection === item.id
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <i className={`${item.icon} text-sm`}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg whitespace-nowrap"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
          >
            <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl text-gray-600`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
            <nav className="p-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-red-500 text-white'
                      : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <i className={`${item.icon} text-sm`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-red-500 text-white px-4 py-3 rounded-xl hover:bg-red-600 transition-colors font-medium mt-4"
              >
                Get Started
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}