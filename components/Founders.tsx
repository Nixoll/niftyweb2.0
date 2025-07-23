
'use client';

import { useState, useEffect } from 'react';

export default function Founders() {
  const [activeFounder, setActiveFounder] = useState(0);
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

    const section = document.getElementById('team');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const founders = [
    {
      id: 'ryan',
      name: 'Ryan Mitchell',
      role: 'CEO & Co-Founder',
      location: 'San Francisco, CA',
      bio: 'Visionary leader with 15+ years of experience in scaling tech companies. Ryan has led multiple successful exits and is passionate about building innovative solutions that transform businesses.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20executive%20CEO%20portrait%2C%20confident%20American%20businessman%20in%20his%2030s%2C%20clean%20shaven%2C%20modern%20corporate%20headshot%2C%20professional%20lighting%2C%20clean%20white%20background%2C%20premium%20business%20photography%2C%20sophisticated%20appearance%2C%20leadership%20presence&width=400&height=400&seq=ryan1&orientation=squarish',
      achievements: [
        'Led 3 successful company exits',
        'Raised $50M+ in venture capital',
        'Built teams of 100+ employees',
        'Featured in Forbes 30 Under 30'
      ],
      skills: ['Strategic Leadership', 'Business Development', 'Venture Capital', 'Team Building'],
      expertise: ['SaaS Platforms', 'E-commerce', 'Fintech', 'AI Solutions'],
      quote: 'Innovation distinguishes between a leader and a follower. We believe in pushing boundaries to create exceptional value.',
      social: {
        linkedin: 'https://linkedin.com/in/ryanmitchell',
        twitter: 'https://twitter.com/ryanmitchell'
      },
      gradient: 'from-red-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-red-50 to-orange-50',
      skillsGradient: 'from-red-500 to-orange-500'
    },
    {
      id: 'akash',
      name: 'Akash Patel',
      role: 'CTO & Co-Founder',
      location: 'Austin, TX',
      bio: 'Technical architect and full-stack developer with expertise in building scalable systems. Akash leads our engineering team and ensures we deliver cutting-edge solutions with exceptional quality.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20tech%20executive%20CTO%20portrait%2C%20confident%20Indian%20American%20software%20engineer%20in%20his%2030s%2C%20modern%20corporate%20headshot%2C%20professional%20lighting%2C%20clean%20white%20background%2C%20premium%20business%20photography%2C%20sophisticated%20technical%20leader%20appearance&width=400&height=400&seq=akash1&orientation=squarish',
      achievements: [
        'Architected systems serving 10M+ users',
        'Published 25+ technical papers',
        'Holds 8 technology patents',
        'Led engineering teams of 50+ devs'
      ],
      skills: ['System Architecture', 'Full-Stack Development', 'Cloud Computing', 'AI/ML'],
      expertise: ['React/Node.js', 'Python/Django', 'AWS/Azure', 'Machine Learning'],
      quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      social: {
        linkedin: 'https://linkedin.com/in/akashpatel',
        github: 'https://github.com/akashpatel'
      },
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      skillsGradient: 'from-green-500 to-emerald-500'
    }
  ];

  const currentFounder = founders[activeFounder];

  return (
    <section id="team" className="py-24 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="team-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#10B981"/>
              <circle cx="0" cy="0" r="1" fill="#EF4444"/>
              <circle cx="40" cy="40" r="1" fill="#3B82F6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#team-pattern)"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="text-sm uppercase tracking-widest text-green-600 font-medium mb-6 flex items-center justify-center">
            <div className="w-8 h-px bg-gradient-to-r from-green-600 to-blue-600 mr-3"></div>
            Meet Our Team
            <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-green-600 ml-3"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 relative tracking-tight">
            Our Founders
            <svg className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-4" viewBox="0 0 160 16">
              <path d="M8 12 Q80 4 152 12" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Meet the visionary leaders behind Nifty Solutions who bring decades of experience and passion for innovation
          </p>
        </div>

        {/* Founder Selection */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-gray-200/50 flex">
            {founders.map((founder, index) => (
              <button
                key={founder.id}
                onClick={() => setActiveFounder(index)}
                className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex items-center space-x-3 ${
                  activeFounder === index
                    ? `text-white shadow-lg bg-gradient-to-r ${founder.gradient}`
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{founder.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Founder Profile */}
        <div className={`transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className={`absolute -inset-8 ${currentFounder.bgColor} rounded-3xl transform rotate-3 opacity-50`}></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-200/50">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                    <img
                      src={currentFounder.image}
                      alt={currentFounder.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentFounder.name}</h3>
                    <p className="text-lg text-gray-600 mb-2">{currentFounder.role}</p>
                    <p className="text-sm text-gray-500 mb-6 flex items-center justify-center">
                      <i className="ri-map-pin-line mr-2"></i>
                      {currentFounder.location}
                    </p>
                    
                    <div className="flex justify-center space-x-4">
                      {currentFounder.social.linkedin && (
                        <a
                          href={currentFounder.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                        >
                          <i className="ri-linkedin-fill"></i>
                        </a>
                      )}
                      {currentFounder.social.twitter && (
                        <a
                          href={currentFounder.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors"
                        >
                          <i className="ri-twitter-fill"></i>
                        </a>
                      )}
                      {currentFounder.social.github && (
                        <a
                          href={currentFounder.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition-colors"
                        >
                          <i className="ri-github-fill"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                {/* Quote */}
                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-6xl text-gray-200">
                    <i className="ri-double-quotes-l"></i>
                  </div>
                  <blockquote className="text-2xl font-light text-gray-800 italic leading-relaxed pl-8">
                    {currentFounder.quote}
                  </blockquote>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">About</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">{currentFounder.bio}</p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Core Skills</h4>
                  <div className="flex flex-wrap gap-3">
                    {currentFounder.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r ${currentFounder.skillsGradient} transition-all duration-300 hover:scale-105`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Technical Expertise</h4>
                  <div className="flex flex-wrap gap-3">
                    {currentFounder.expertise.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h4>
                  <ul className="space-y-3">
                    {currentFounder.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mt-3 mr-3 bg-gradient-to-r ${currentFounder.gradient} flex-shrink-0`}></div>
                        <span className="text-gray-700 leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl font-bold text-red-500 mb-2">15+</div>
            <div className="text-gray-600">Years Combined Experience</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl font-bold text-green-500 mb-2">100+</div>
            <div className="text-gray-600">Team Members Globally</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
            <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
            <div className="text-gray-600">Projects Delivered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
