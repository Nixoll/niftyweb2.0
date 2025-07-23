
'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId === 'home' ? 'hero' : sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="footer-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 5 L35 20 L20 35 L5 20 Z" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="block group">
              <div className="text-2xl font-bold text-white font-pacifico">
                <span className="text-red-500">Nifty</span> Solutions
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed font-light max-w-sm">
              Premium digital solutions and strategic consulting for businesses that demand excellence.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'linkedin', url: '#' },
                { name: 'twitter', url: '#' },
                { name: 'github', url: '#' },
                { name: 'instagram', url: '#' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-red-500 transition-all duration-300 group"
                >
                  <i className={`ri-${social.name}-fill text-lg group-hover:scale-110 transition-transform`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Services</h3>
            <div className="space-y-3">
              {[
                'Web Development',
                'Mobile Apps', 
                'AI Solutions',
                'E-commerce',
                'Design Services'
              ].map((service) => (
                <button
                  key={service}
                  onClick={() => scrollToSection('services')}
                  className="block text-gray-300 hover:text-white transition-colors font-light hover:translate-x-1 transform duration-200"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Company</h3>
            <div className="space-y-3">
              {[
                { name: 'About Us', section: 'why-nifty' },
                { name: 'Our Team', section: 'team' },
                { name: 'Portfolio', section: 'work' },
                { name: 'Process', section: 'how-it-works' },
                { name: 'Contact', section: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className="block text-gray-300 hover:text-white transition-colors font-light hover:translate-x-1 transform duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line text-red-500"></i>
                <a 
                  href="mailto:hello@nifty-digital.com"
                  className="text-gray-300 font-light hover:text-white transition-colors"
                >
                  hello@nifty-digital.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-red-500"></i>
                <a 
                  href="tel:+15551234567"
                  className="text-gray-300 font-light hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-whatsapp-line text-red-500"></i>
                <a 
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 font-light hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm font-light" suppressHydrationWarning={true}>
              © {new Date().getFullYear()} Nifty Digital Solutions. All rights reserved. Premium quality guaranteed.
            </p>
            <div className="flex space-x-6">
              {[
                { name: 'Privacy Policy', url: '#' },
                { name: 'Terms of Service', url: '#' },
                { name: 'Cookie Policy', url: '#' }
              ].map((policy) => (
                <a
                  key={policy.name}
                  href={policy.url}
                  className="text-gray-300 hover:text-white text-sm transition-colors font-light relative group"
                >
                  {policy.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-10 w-32 h-32 bg-red-500 rounded-full animate-pulse opacity-10"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-yellow-500 rounded-full animate-bounce opacity-10"></div>
    </footer>
  );
}