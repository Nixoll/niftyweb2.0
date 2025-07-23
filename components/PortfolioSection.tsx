
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface PortfolioItem {
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
  budget: string;
  teamSize: string;
  industry: string;
  projectType: string;
  completionDate: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  gallery: string[];
  tags: string[];
  featured: boolean;
  status: 'completed' | 'in-progress' | 'maintenance';
}

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
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
      { threshold: 0.2 }
    );

    const section = document.getElementById('portfolio');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'E-Commerce Platform Revolution',
      category: 'Web Development',
      description: 'A cutting-edge e-commerce platform that transformed online retail with advanced AI-powered recommendations, seamless payment integration, and stunning user experience. Built with scalability and performance in mind.',
      image: 'https://readdy.ai/api/search-image?query=premium%20luxury%20e-commerce%20website%20interface%20with%20modern%20design%2C%20elegant%20product%20displays%2C%20sophisticated%20shopping%20cart%2C%20professional%20checkout%20process%2C%20clean%20minimalist%20aesthetic%2C%20high-end%20fashion%20brand%20layout%2C%20white%20background%20with%20subtle%20shadows%20and%20premium%20typography&width=800&height=600&seq=ecom1&orientation=landscape',
      technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'TypeScript', 'Tailwind CSS'],
      features: [
        'AI-powered product recommendations',
        'Advanced inventory management',
        'Multi-payment gateway integration',
        'Real-time analytics dashboard',
        'Mobile-responsive design',
        'SEO optimization',
        'Customer review system',
        'Multi-language support'
      ],
      duration: '4 months',
      client: 'Luxury Fashion Brand',
      results: [
        '300% increase in online sales',
        '50% reduction in cart abandonment',
        '40% improvement in page load speed',
        '95% customer satisfaction rate',
        '250% increase in mobile conversions'
      ],
      budget: '$75,000 - $100,000',
      teamSize: '6 developers, 2 designers, 1 PM',
      industry: 'Fashion & Retail',
      projectType: 'Full-stack Development',
      completionDate: '2024-01-15',
      testimonial: {
        quote: 'Nifty Solutions transformed our entire online presence. The results exceeded all expectations!',
        author: 'Sarah Johnson',
        position: 'CEO',
        company: 'Luxury Fashion Brand',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20woman%20CEO%20portrait%2C%20confident%20executive%2C%20luxury%20fashion%20industry%20leader%2C%20elegant%20appearance%2C%20modern%20corporate%20headshot%2C%20professional%20lighting%2C%20clean%20background&width=100&height=100&seq=ceo1&orientation=squarish'
      },
      liveUrl: 'https://demo-ecommerce.com',
      githubUrl: 'https://github.com/demo/ecommerce',
      caseStudyUrl: '/case-studies/ecommerce-platform',
      gallery: [
        'https://readdy.ai/api/search-image?query=e-commerce%20homepage%20design%20with%20hero%20section%2C%20product%20categories%2C%20featured%20items%2C%20modern%20layout%2C%20clean%20interface&width=600&height=400&seq=ecom2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=product%20detail%20page%20design%20with%20image%20gallery%2C%20specifications%2C%20add%20to%20cart%2C%20reviews%20section%2C%20premium%20layout&width=600&height=400&seq=ecom3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=shopping%20cart%20and%20checkout%20process%20design%2C%20payment%20forms%2C%20order%20summary%2C%20user-friendly%20interface&width=600&height=400&seq=ecom4&orientation=landscape'
      ],
      tags: ['React', 'E-commerce', 'AI', 'Mobile', 'Premium'],
      featured: true,
      status: 'completed'
    },
    {
      id: '2',
      title: 'AI-Powered Analytics Dashboard',
      category: 'AI Solutions',
      description: 'Revolutionary business intelligence platform leveraging machine learning to provide actionable insights, predictive analytics, and real-time data visualization for enterprise clients.',
      image: 'https://readdy.ai/api/search-image?query=sophisticated%20AI%20analytics%20dashboard%20interface%20with%20data%20visualization%20charts%2C%20machine%20learning%20graphs%2C%20predictive%20analytics%20displays%2C%20modern%20business%20intelligence%20platform%2C%20professional%20dark%20theme%20with%20blue%20accents%2C%20futuristic%20technology%20aesthetic&width=800&height=600&seq=ai1&orientation=landscape',
      technologies: ['Python', 'TensorFlow', 'React', 'D3.js', 'PostgreSQL', 'Docker', 'AWS', 'FastAPI'],
      features: [
        'Machine learning algorithms',
        'Real-time data processing',
        'Predictive analytics',
        'Interactive visualizations',
        'Custom KPI tracking',
        'Automated reporting',
        'API integration',
        'Role-based access control'
      ],
      duration: '6 months',
      client: 'Tech Enterprise',
      results: [
        '85% accuracy in predictions',
        '60% faster data processing',
        '200% ROI improvement',
        '90% user adoption rate',
        '40% reduction in manual reporting'
      ],
      budget: '$150,000 - $200,000',
      teamSize: '8 developers, 3 data scientists, 2 UI/UX designers',
      industry: 'Technology & Analytics',
      projectType: 'AI/ML Development',
      completionDate: '2024-02-28',
      testimonial: {
        quote: 'The AI insights have revolutionized our decision-making process. Incredible work!',
        author: 'Michael Chen',
        position: 'CTO',
        company: 'Tech Enterprise',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20Asian%20tech%20executive%20CTO%20portrait%2C%20confident%20technology%20leader%2C%20modern%20corporate%20headshot%2C%20professional%20lighting%2C%20clean%20background&width=100&height=100&seq=cto1&orientation=squarish'
      },
      liveUrl: 'https://demo-analytics.com',
      caseStudyUrl: '/case-studies/ai-analytics',
      gallery: [
        'https://readdy.ai/api/search-image?query=AI%20dashboard%20overview%20with%20multiple%20charts%2C%20KPI%20metrics%2C%20real-time%20data%20feeds%2C%20modern%20interface%20design&width=600&height=400&seq=ai2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=predictive%20analytics%20charts%20with%20trend%20lines%2C%20forecasting%20graphs%2C%20machine%20learning%20visualizations&width=600&height=400&seq=ai3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=data%20visualization%20reports%20with%20interactive%20elements%2C%20custom%20filters%2C%20export%20options&width=600&height=400&seq=ai4&orientation=landscape'
      ],
      tags: ['AI', 'Machine Learning', 'Analytics', 'Enterprise', 'Python'],
      featured: true,
      status: 'completed'
    },
    {
      id: '3',
      title: 'Secure Mobile Banking App',
      category: 'Mobile Apps',
      description: 'Next-generation mobile banking application with biometric security, seamless transactions, and comprehensive financial management tools designed for modern digital banking.',
      image: 'https://readdy.ai/api/search-image?query=premium%20mobile%20banking%20app%20interface%20design%20showcased%20on%20iPhone%20mockup%2C%20secure%20financial%20dashboard%2C%20elegant%20transaction%20screens%2C%20modern%20fintech%20application%2C%20professional%20banking%20UI%2C%20trust-inspiring%20design%20with%20blue%20and%20white%20color%20scheme&width=800&height=600&seq=mobile1&orientation=landscape',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'Plaid API', 'Stripe', 'JWT'],
      features: [
        'Biometric authentication',
        'Real-time transactions',
        'Budget tracking tools',
        'Bill payment system',
        'Investment portfolio',
        'Security monitoring',
        'Push notifications',
        'Multi-account management'
      ],
      duration: '5 months',
      client: 'Regional Bank',
      results: [
        '1M+ app downloads',
        '4.8/5 app store rating',
        '30% increase in digital engagement',
        '99.9% uptime reliability',
        '70% reduction in branch visits'
      ],
      budget: '$120,000 - $150,000',
      teamSize: '5 mobile developers, 2 backend developers, 2 designers',
      industry: 'Financial Services',
      projectType: 'Mobile App Development',
      completionDate: '2024-03-20',
      testimonial: {
        quote: 'Our customers love the new app. It has transformed how we serve our community.',
        author: 'Jennifer Davis',
        position: 'Digital Banking Director',
        company: 'Regional Bank',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20banking%20executive%20woman%20portrait%2C%20financial%20services%20leader%2C%20confident%20appearance%2C%20modern%20corporate%20headshot%2C%20professional%20lighting&width=100&height=100&seq=bank1&orientation=squarish'
      },
      liveUrl: 'https://demo-banking.com',
      caseStudyUrl: '/case-studies/mobile-banking',
      gallery: [
        'https://readdy.ai/api/search-image?query=mobile%20banking%20app%20login%20screen%20with%20biometric%20authentication%2C%20security%20features%2C%20modern%20design&width=600&height=400&seq=mobile2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=banking%20app%20dashboard%20with%20account%20balances%2C%20transaction%20history%2C%20quick%20actions%2C%20clean%20interface&width=600&height=400&seq=mobile3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=mobile%20payment%20and%20transfer%20screens%2C%20bill%20pay%20features%2C%20money%20management%20tools&width=600&height=400&seq=mobile4&orientation=landscape'
      ],
      tags: ['Mobile', 'React Native', 'Banking', 'Security', 'Fintech'],
      featured: true,
      status: 'completed'
    },
    {
      id: '4',
      title: 'Corporate Brand Website',
      category: 'Design Services',
      description: 'Premium corporate website showcasing company excellence through stunning visual design, seamless user experience, and strategic brand positioning for Fortune 500 presence.',
      image: 'https://readdy.ai/api/search-image?query=luxury%20corporate%20website%20design%20displayed%20on%20desktop%20screen%2C%20premium%20business%20homepage%20with%20hero%20section%2C%20professional%20company%20presentation%2C%20modern%20web%20interface%2C%20elegant%20layout%20with%20sophisticated%20typography%2C%20corporate%20branding%20elements%2C%20clean%20minimalist%20aesthetic&width=800&height=600&seq=corporate1&orientation=landscape',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Contentful', 'Vercel'],
      features: [
        'Responsive design system',
        'Advanced SEO optimization',
        'Content management integration',
        'Interactive animations',
        'Team member profiles',
        'Service showcases',
        'Contact forms',
        'Multi-language support'
      ],
      duration: '3 months',
      client: 'Fortune 500 Company',
      results: [
        '150% increase in leads',
        '45% longer session duration',
        '25% improvement in conversion rate',
        '100% mobile compatibility',
        '90% improvement in page speed'
      ],
      budget: '$50,000 - $75,000',
      teamSize: '3 designers, 2 developers, 1 content strategist',
      industry: 'Corporate Services',
      projectType: 'Web Design & Development',
      completionDate: '2024-04-10',
      testimonial: {
        quote: 'The new website perfectly represents our brand values and has generated exceptional results.',
        author: 'Robert Williams',
        position: 'Marketing Director',
        company: 'Fortune 500 Company',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20corporate%20marketing%20director%20portrait%2C%20business%20executive%2C%20confident%20appearance%2C%20modern%20corporate%20headshot%2C%20professional%20lighting&width=100&height=100&seq=corp1&orientation=squarish'
      },
      liveUrl: 'https://demo-corporate.com',
      caseStudyUrl: '/case-studies/corporate-website',
      gallery: [
        'https://readdy.ai/api/search-image?query=corporate%20website%20homepage%20with%20hero%20section%2C%20company%20overview%2C%20services%20preview%2C%20professional%20design&width=600&height=400&seq=corp2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=about%20us%20page%20with%20team%20photos%2C%20company%20history%2C%20values%20section%2C%20corporate%20layout&width=600&height=400&seq=corp3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=services%20page%20with%20detailed%20offerings%2C%20case%20studies%2C%20contact%20forms%2C%20professional%20presentation&width=600&height=400&seq=corp4&orientation=landscape'
      ],
      tags: ['Web Design', 'Corporate', 'Next.js', 'Branding', 'SEO'],
      featured: false,
      status: 'completed'
    },
    {
      id: '5',
      title: 'Premium Virtual Assistant Services',
      category: 'Outsourced Services',
      description: 'Comprehensive virtual assistant services providing world-class administrative support, project management, and customer service solutions for growing businesses.',
      image: 'https://readdy.ai/api/search-image?query=professional%20virtual%20assistant%20workspace%20setup%2C%20modern%20home%20office%20environment%2C%20organized%20desk%20with%20computer%20and%20productivity%20tools%2C%20remote%20work%20setting%2C%20professional%20business%20support%2C%20elegant%20workspace%20design%2C%20clean%20minimalist%20aesthetic%2C%20productivity-focused%20environment&width=800&height=600&seq=va1&orientation=landscape',
      technologies: ['CRM Systems', 'Project Management Tools', 'Communication Platforms', 'Automation Software'],
      features: [
        'Administrative support',
        'Project coordination',
        'Customer service',
        'Data management',
        'Scheduling assistance',
        'Research services',
        'Content creation',
        'Social media management'
      ],
      duration: 'Ongoing',
      client: 'Multiple Clients',
      results: [
        '80% increase in productivity',
        '60% cost savings',
        '95% task completion rate',
        '24/7 support availability',
        '98% client satisfaction'
      ],
      budget: '$2,000 - $5,000/month',
      teamSize: '10+ virtual assistants, 2 project managers',
      industry: 'Business Services',
      projectType: 'Virtual Assistant Services',
      completionDate: 'Ongoing',
      testimonial: {
        quote: 'The VA team has become an essential part of our operations. Exceptional service quality!',
        author: 'Amanda Thompson',
        position: 'Operations Manager',
        company: 'Growing Startup',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20business%20operations%20manager%20portrait%2C%20confident%20female%20executive%2C%20modern%20corporate%20headshot%2C%20professional%20lighting&width=100&height=100&seq=ops1&orientation=squarish'
      },
      caseStudyUrl: '/case-studies/virtual-assistant',
      gallery: [
        'https://readdy.ai/api/search-image?query=virtual%20assistant%20at%20work%2C%20professional%20remote%20workspace%2C%20productivity%20tools%2C%20organized%20environment&width=600&height=400&seq=va2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=project%20management%20dashboard%2C%20task%20tracking%2C%20team%20collaboration%20tools%2C%20professional%20interface&width=600&height=400&seq=va3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=customer%20service%20setup%2C%20communication%20tools%2C%20professional%20support%20environment&width=600&height=400&seq=va4&orientation=landscape'
      ],
      tags: ['Virtual Assistant', 'Support', 'Project Management', 'Remote', 'Business'],
      featured: false,
      status: 'in-progress'
    },
    {
      id: '6',
      title: 'SaaS Platform Development',
      category: 'Web Development',
      description: 'Enterprise-grade SaaS platform with advanced user management, subscription billing, and comprehensive analytics for B2B software solutions.',
      image: 'https://readdy.ai/api/search-image?query=modern%20SaaS%20platform%20interface%20design%2C%20enterprise%20software%20dashboard%2C%20subscription%20management%20system%2C%20B2B%20application%20interface%2C%20professional%20business%20software%2C%20clean%20modern%20UI%20with%20data%20tables%20and%20charts&width=800&height=600&seq=saas1&orientation=landscape',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS', 'Docker', 'GraphQL'],
      features: [
        'Multi-tenant architecture',
        'Subscription billing',
        'User role management',
        'API management',
        'Analytics dashboard',
        'White-label options',
        'Integration marketplace',
        'Advanced security'
      ],
      duration: '8 months',
      client: 'SaaS Startup',
      results: [
        '500+ enterprise clients',
        '99.5% uptime',
        '$2M+ ARR generated',
        '40% month-over-month growth',
        '95% customer retention'
      ],
      budget: '$200,000 - $300,000',
      teamSize: '10 developers, 3 DevOps, 2 designers',
      industry: 'Software as a Service',
      projectType: 'Full-stack SaaS Development',
      completionDate: '2024-05-15',
      testimonial: {
        quote: 'This platform has enabled us to scale rapidly and serve enterprise clients effectively.',
        author: 'David Kim',
        position: 'Founder & CEO',
        company: 'SaaS Startup',
        avatar: 'https://readdy.ai/api/search-image?query=young%20tech%20entrepreneur%20CEO%20portrait%2C%20startup%20founder%2C%20confident%20appearance%2C%20modern%20corporate%20headshot%2C%20professional%20lighting&width=100&height=100&seq=startup1&orientation=squarish'
      },
      liveUrl: 'https://demo-saas.com',
      githubUrl: 'https://github.com/demo/saas-platform',
      caseStudyUrl: '/case-studies/saas-platform',
      gallery: [
        'https://readdy.ai/api/search-image?query=SaaS%20dashboard%20with%20user%20management%2C%20subscription%20overview%2C%20analytics%20widgets%2C%20professional%20interface&width=600&height=400&seq=saas2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=billing%20and%20subscription%20management%20interface%2C%20payment%20processing%2C%20plan%20comparison%2C%20modern%20design&width=600&height=400&seq=saas3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=API%20documentation%20and%20integration%20tools%2C%20developer%20portal%2C%20technical%20documentation%20interface&width=600&height=400&seq=saas4&orientation=landscape'
      ],
      tags: ['SaaS', 'Enterprise', 'Subscription', 'B2B', 'Scalability'],
      featured: true,
      status: 'completed'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: portfolioItems.length },
    { id: 'Web Development', name: 'Web Development', count: portfolioItems.filter(item => item.category === 'Web Development').length },
    { id: 'AI Solutions', name: 'AI Solutions', count: portfolioItems.filter(item => item.category === 'AI Solutions').length },
    { id: 'Mobile Apps', name: 'Mobile Apps', count: portfolioItems.filter(item => item.category === 'Mobile Apps').length },
    { id: 'Design Services', name: 'Design Services', count: portfolioItems.filter(item => item.category === 'Design Services').length },
    { id: 'Outsourced Services', name: 'Outsourced Services', count: portfolioItems.filter(item => item.category === 'Outsourced Services').length }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const featuredItems = portfolioItems.filter(item => item.featured);

  return (
    <section id="portfolio" className="pt-32 pb-20 bg-gradient-to-b from-gray-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <pattern id="portfolio-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="none" stroke="#7ed957" strokeWidth="1"/>
              <circle cx="30" cy="30" r="2" fill="#ff5757"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portfolio-grid)"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-base uppercase tracking-widest text-red-500 font-medium mb-6 flex items-center justify-center">
            <div className="w-8 h-px bg-gradient-to-r from-red-500 to-green-500 mr-3"></div>
            Our Portfolio
            <div className="w-8 h-px bg-gradient-to-r from-green-500 to-red-500 ml-3"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 relative">
            Featured Work & Success Stories
            <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-4" viewBox="0 0 192 16">
              <path d="M8 12 Q96 4 184 12" stroke="#7ed957" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Discover how we've transformed businesses across industries with innovative solutions and exceptional results
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-red-500 to-green-500 text-white shadow-lg transform scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-900 hover:bg-white border border-gray-200 hover:border-gray-300'
              }`}
            >
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Projects Section */}
        {selectedCategory === 'all' && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h3>
              <p className="text-xl text-gray-600">Our most impactful and innovative solutions</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredItems.slice(0, 4).map((item, index) => (
                <div
                  key={item.id}
                  className={`group cursor-pointer transition-all duration-700 transform ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-200/50 hover:border-red-200/50">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 left-4 flex items-center space-x-2">
                        <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                          {item.category}
                        </span>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === 'completed' ? 'bg-green-500/90 text-white' :
                          item.status === 'in-progress' ? 'bg-yellow-500/90 text-white' :
                          'bg-blue-500/90 text-white'
                        }`}>
                          {item.status === 'completed' ? 'Completed' : 
                           item.status === 'in-progress' ? 'In Progress' : 'Maintenance'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i className="ri-arrow-right-up-line text-gray-700 text-lg"></i>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {item.liveUrl && (
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <i className="ri-external-link-line text-gray-600 text-sm"></i>
                            </div>
                          )}
                          {item.githubUrl && (
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <i className="ri-github-line text-gray-600 text-sm"></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                            +{item.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{item.client}</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{item.duration}</span>
                        </div>
                        <span className="text-sm font-medium text-red-600">View Details</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group cursor-pointer transition-all duration-700 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-200/50 hover:border-green-200/50">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="ri-arrow-right-up-line text-gray-700"></i>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className={`w-3 h-3 rounded-full ml-2 mt-1 flex-shrink-0 ${
                      item.status === 'completed' ? 'bg-green-500' :
                      item.status === 'in-progress' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                        +{item.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{item.client}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{item.duration}</span>
                    </div>
                    <span className="text-sm font-medium text-green-600">View Details</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl font-bold text-red-500 mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl font-bold text-green-500 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl font-bold text-blue-500 mb-2">25+</div>
              <div className="text-gray-600">Industries Served</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50">
              <div className="text-4xl font-bold text-purple-500 mb-2">100+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-500 to-green-500 p-12 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss how we can bring your vision to life with our proven expertise
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="bg-white text-red-500 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
                  Start Your Project
                </Link>
                <Link href="/case-studies" className="border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white hover:text-red-500 transition-colors whitespace-nowrap">
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
