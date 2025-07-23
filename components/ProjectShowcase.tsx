
'use client';

import { useState, useEffect } from 'react';
import ProjectDialog from './ProjectDialog';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  duration: string;
  client: string;
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('work');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A sophisticated e-commerce platform built with modern technology stack, featuring advanced product management, secure payment processing, and intelligent inventory tracking. The platform includes a powerful admin dashboard, real-time analytics, and seamless user experience across all devices.',
      image: 'https://readdy.ai/api/search-image?query=modern%20luxury%20e-commerce%20website%20interface%20with%20clean%20design%2C%20premium%20product%20displays%2C%20shopping%20cart%20functionality%2C%20elegant%20checkout%20process%2C%20professional%20business%20setting%2C%20minimalist%20aesthetic%2C%20high-quality%20product%20photography%2C%20sophisticated%20layout%20with%20white%20background%20and%20subtle%20shadows&width=800&height=600&seq=ecommerce1&orientation=landscape',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'TypeScript'],
      features: [
        'Advanced product catalog',
        'Secure payment processing',
        'Real-time inventory tracking',
        'Customer management system',
        'Analytics dashboard',
        'Mobile-responsive design'
      ],
      duration: '4 months',
      client: 'Luxury Fashion Brand',
      results: [
        '300% increase in online sales',
        '50% reduction in cart abandonment',
        '40% improvement in page load speed',
        '95% customer satisfaction rate'
      ],
      liveUrl: 'https://demo-ecommerce.com',
      githubUrl: 'https://github.com/demo/ecommerce'
    },
    {
      id: '2',
      title: 'AI-Powered Analytics',
      category: 'AI Solutions',
      description: 'An intelligent analytics platform that leverages machine learning to provide actionable business insights. The system processes large datasets, identifies patterns, and generates predictive models to help businesses make data-driven decisions with confidence.',
      image: 'https://readdy.ai/api/search-image?query=sophisticated%20AI%20analytics%20dashboard%20with%20data%20visualization%2C%20machine%20learning%20charts%2C%20predictive%20analytics%20graphs%2C%20modern%20interface%20design%2C%20professional%20business%20intelligence%20platform%2C%20clean%20minimalist%20layout%2C%20blue%20and%20purple%20color%20scheme%2C%20futuristic%20technology%20aesthetic&width=800&height=600&seq=ai1&orientation=landscape',
      technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'Docker', 'AWS'],
      features: [
        'Machine learning algorithms',
        'Real-time data processing',
        'Predictive analytics',
        'Interactive dashboards',
        'Custom reporting tools',
        'API integration'
      ],
      duration: '6 months',
      client: 'Tech Startup',
      results: [
        '85% accuracy in predictions',
        '60% faster data processing',
        '200% ROI improvement',
        '90% user adoption rate'
      ],
      liveUrl: 'https://demo-analytics.com'
    },
    {
      id: '3',
      title: 'Mobile Banking App',
      category: 'Mobile Apps',
      description: 'A secure and user-friendly mobile banking application with advanced security features, seamless transactions, and intuitive user interface. The app includes biometric authentication, real-time notifications, and comprehensive financial management tools.',
      image: 'https://readdy.ai/api/search-image?query=premium%20mobile%20banking%20app%20interface%20design%2C%20secure%20financial%20dashboard%2C%20elegant%20transaction%20screens%2C%20modern%20smartphone%20mockup%2C%20professional%20fintech%20application%2C%20clean%20user%20interface%2C%20trust-inspiring%20design%2C%20banking%20security%20features%2C%20minimalist%20aesthetic%20with%20blue%20and%20white%20colors&width=800&height=600&seq=mobile1&orientation=landscape',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Plaid API'],
      features: [
        'Biometric authentication',
        'Real-time transactions',
        'Budget tracking',
        'Bill payment system',
        'Investment portfolio',
        'Security monitoring'
      ],
      duration: '5 months',
      client: 'Regional Bank',
      results: [
        '1M+ app downloads',
        '4.8/5 app store rating',
        '30% increase in digital engagement',
        '99.9% uptime reliability'
      ],
      liveUrl: 'https://demo-banking.com'
    },
    {
      id: '4',
      title: 'Corporate Website',
      category: 'Web Development',
      description: 'A premium corporate website designed to showcase company values, services, and achievements. The site features stunning visual design, smooth animations, and optimized performance to create an impressive digital presence for the brand.',
      image: 'https://readdy.ai/api/search-image?query=luxury%20corporate%20website%20design%2C%20premium%20business%20homepage%2C%20professional%20company%20presentation%2C%20modern%20web%20interface%2C%20elegant%20layout%20with%20hero%20section%2C%20sophisticated%20typography%2C%20corporate%20branding%20elements%2C%20clean%20minimalist%20design%20with%20white%20background%20and%20premium%20aesthetics&width=800&height=600&seq=corporate1&orientation=landscape',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Contentful'],
      features: [
        'Responsive design',
        'SEO optimization',
        'Content management',
        'Contact forms',
        'Team profiles',
        'Service showcase'
      ],
      duration: '3 months',
      client: 'Fortune 500 Company',
      results: [
        '150% increase in leads',
        '45% longer session duration',
        '25% improvement in conversion',
        '100% mobile compatibility'
      ],
      liveUrl: 'https://demo-corporate.com'
    },
    {
      id: '5',
      title: 'Design System',
      category: 'Design Services',
      description: 'A comprehensive design system created to ensure consistent branding across all digital touchpoints. The system includes UI components, design tokens, guidelines, and documentation to streamline the design and development process.',
      image: 'https://readdy.ai/api/search-image?query=modern%20design%20system%20showcase%2C%20UI%20component%20library%2C%20design%20tokens%20visualization%2C%20brand%20guidelines%20presentation%2C%20professional%20design%20documentation%2C%20consistent%20visual%20elements%2C%20design%20system%20patterns%2C%20elegant%20layout%20with%20organized%20components%2C%20minimalist%20aesthetic&width=800&height=600&seq=design1&orientation=landscape',
      technologies: ['Figma', 'Storybook', 'React', 'CSS Variables', 'Design Tokens'],
      features: [
        'UI component library',
        'Design tokens system',
        'Brand guidelines',
        'Documentation portal',
        'Version control',
        'Design patterns'
      ],
      duration: '4 months',
      client: 'SaaS Platform',
      results: [
        '70% faster design process',
        '50% reduction in inconsistencies',
        '90% developer satisfaction',
        '100% brand compliance'
      ]
    },
    {
      id: '6',
      title: 'Virtual Assistant',
      category: 'Outsourced Services',
      description: 'Premium virtual assistant services providing comprehensive administrative support, project management, and customer service. Our skilled professionals handle complex tasks with precision and professionalism to help businesses scale efficiently.',
      image: 'https://readdy.ai/api/search-image?query=professional%20virtual%20assistant%20workspace%2C%20modern%20home%20office%20setup%2C%20organized%20desk%20with%20computer%2C%20productive%20work%20environment%2C%20remote%20work%20setup%2C%20professional%20business%20support%2C%20elegant%20workspace%20design%2C%20clean%20minimalist%20aesthetic%2C%20productivity%20tools%20and%20technology&width=800&height=600&seq=va1&orientation=landscape',
      technologies: ['CRM Systems', 'Project Management Tools', 'Communication Platforms', 'Automation Tools'],
      features: [
        'Administrative support',
        'Project coordination',
        'Customer service',
        'Data management',
        'Scheduling assistance',
        'Research services'
      ],
      duration: 'Ongoing',
      client: 'Multiple Clients',
      results: [
        '80% increase in productivity',
        '60% cost savings',
        '95% task completion rate',
        '24/7 support availability'
      ]
    }
  ];

  const categories = ['all', 'Web Development', 'AI Solutions', 'Mobile Apps', 'Design Services', 'Outsourced Services'];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="work" className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="work-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="#16A34A"/>
              <circle cx="0" cy="0" r="1" fill="#2563EB"/>
              <circle cx="50" cy="50" r="1" fill="#EF4444"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#work-pattern)"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="text-sm uppercase tracking-widest text-green-600 font-medium mb-6 flex items-center justify-center">
            <div className="w-8 h-px bg-gradient-to-r from-green-600 to-blue-600 mr-3"></div>
            Our Portfolio
            <div className="w-8 h-px bg-gradient-to-r from-blue-600 to-green-600 ml-3"></div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 relative tracking-tight">
            Featured Work
            <svg className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-4" viewBox="0 0 160 16">
              <path d="M8 12 Q80 4 152 12" stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Explore our premium projects showcasing innovative solutions and exceptional results across various industries
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 hover:shadow-md'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group cursor-pointer transition-all duration-700 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => openDialog(project)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-200/50 hover:border-green-200/50">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover object-top transition-transform duration-700 ${
                      hoveredProject === project.id ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 transition-all duration-300">
                      {project.category}
                    </span>
                  </div>
                  <div className={`absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredProject === project.id ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                  }`}>
                    <i className="ri-arrow-right-up-line text-gray-700"></i>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 transition-all duration-300 hover:bg-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{project.client}</span>
                    <span className="text-sm font-medium text-green-600 transition-all duration-300 group-hover:translate-x-1">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Results Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-red-500 mb-2 transition-all duration-300">
                {filteredProjects.length}
              </div>
              <div className="text-gray-600">Active Projects</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-green-500 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-blue-500 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Service Categories</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-4xl font-bold text-purple-500 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
      
      <ProjectDialog
        project={selectedProject}
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </section>
  );
}
