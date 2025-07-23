
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function FinalCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showEstimateForm, setShowEstimateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [estimateData, setEstimateData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    serviceType: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    features: [],
    techPreferences: [],
    designStyle: '',
    targetAudience: '',
    platforms: [],
    integrations: [],
    contentManagement: '',
    maintenance: '',
    hosting: '',
    urgency: '',
    references: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const saveFormSubmission = (type: string, data: any) => {
    try {
      const submissionData = {
        id: Date.now(),
        type: type,
        data: data,
        timestamp: new Date().toISOString(),
        status: 'new',
        source: 'website_form'
      };

      // Save to inquiries
      const existingInquiries = localStorage.getItem('niftyInquiries');
      let inquiries = [];
      
      if (existingInquiries) {
        inquiries = JSON.parse(existingInquiries);
      }

      inquiries.push({
        id: Date.now(),
        source: type === 'contact' ? 'Contact Form' : 'Project Estimate Form',
        collectedBy: 'Website Form Handler',
        timestamp: new Date().toISOString(),
        customerName: data.name || 'Not provided',
        customerEmail: data.email || 'Not provided',
        customerPhone: data.phone || 'Not provided',
        customerCompany: data.company || 'Not provided',
        projectType: data.serviceType || data.projectType || 'Not specified',
        budget: data.budget || 'Not specified',
        urgency: data.urgency || 'Medium',
        status: 'New',
        notionStatus: 'Pending',
        emailSent: false,
        assignedTo: 'Sales Team',
        notes: type === 'contact' ? data.message : JSON.stringify(data),
        leadScore: calculateLeadScore(data),
        formType: type
      });

      localStorage.setItem('niftyInquiries', JSON.stringify(inquiries));

      // Save to form submissions
      const existingSubmissions = localStorage.getItem('niftyFormSubmissions');
      let submissions = [];
      
      if (existingSubmissions) {
        submissions = JSON.parse(existingSubmissions);
      }

      submissions.push(submissionData);
      localStorage.setItem('niftyFormSubmissions', JSON.stringify(submissions));

      return true;
    } catch (error) {
      console.error('Error saving form submission:', error);
      return false;
    }
  };

  const calculateLeadScore = (data: any): number => {
    let score = 0;
    
    if (data.email) score += 30;
    if (data.name) score += 20;
    if (data.company) score += 15;
    if (data.phone) score += 25;
    if (data.serviceType || data.projectType) score += 20;
    if (data.budget) score += 30;
    if (data.timeline) score += 15;
    if (data.message || data.description) score += 10;
    
    return Math.min(score, 100);
  };

  const openWhatsApp = () => {
    const settings = localStorage.getItem('niftyAdminSettings');
    let phoneNumber = '15551234567';
    
    if (settings) {
      try {
        const parsed = JSON.parse(settings);
        phoneNumber = parsed.communications?.whatsappNumber?.replace(/[^\d]/g, '') || phoneNumber;
      } catch (error) {
        console.error('Error loading WhatsApp settings:', error);
      }
    }
    
    const message = encodeURIComponent("Hi! I'm interested in your premium services and would like to discuss my project.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEstimateChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEstimateData(prev => ({
        ...prev,
        [name]: checked 
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setEstimateData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        setSubmitStatus('error');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save form data
      const saved = saveFormSubmission('contact', formData);
      
      if (saved) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });

        setTimeout(() => {
          setShowContactForm(false);
          setSubmitStatus('');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEstimateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Validate form
      if (!estimateData.name || !estimateData.email || !estimateData.serviceType || !estimateData.description) {
        setSubmitStatus('error');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save estimate data
      const saved = saveFormSubmission('estimate', estimateData);
      
      if (saved) {
        setSubmitStatus('success');
        setEstimateData({
          name: '',
          email: '',
          company: '',
          phone: '',
          serviceType: '',
          projectType: '',
          budget: '',
          timeline: '',
          description: '',
          features: [],
          techPreferences: [],
          designStyle: '',
          targetAudience: '',
          platforms: [],
          integrations: [],
          contentManagement: '',
          maintenance: '',
          hosting: '',
          urgency: '',
          references: '',
          additionalInfo: ''
        });
        setCurrentStep(1);

        setTimeout(() => {
          setShowEstimateForm(false);
          setSubmitStatus('');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getProjectTypeOptions = () => {
    const options = {
      'web-development': [
        'E-commerce Website',
        'Corporate Website',
        'Landing Page',
        'Web Application',
        'SaaS Platform',
        'Portfolio Website',
        'Blog/News Site',
        'Custom CMS',
        'API Development',
        'Database Design'
      ],
      'mobile-apps': [
        'iOS App',
        'Android App',
        'Cross-platform App',
        'Web App (PWA)',
        'E-commerce App',
        'Social Media App',
        'Gaming App',
        'Educational App',
        'Health & Fitness App',
        'Business App'
      ],
      'ai-solutions': [
        'Chatbot Development',
        'Machine Learning Model',
        'Data Analytics Platform',
        'Recommendation System',
        'Computer Vision',
        'Natural Language Processing',
        'Predictive Analytics',
        'AI Integration',
        'Automation Tools',
        'Custom AI Solution'
      ],
      'design-services': [
        'UI/UX Design',
        'Logo Design',
        'Brand Identity',
        'Website Design',
        'App Design',
        'Print Design',
        'Marketing Materials',
        'Design System',
        'Wireframing',
        'Prototyping'
      ],
      'outsourced-services': [
        'Virtual Assistant',
        'Admin Support',
        'Customer Service',
        'Content Writing',
        'Social Media Management',
        'Data Entry',
        'Research Services',
        'Project Management',
        'CAD Services',
        'Technical Support'
      ]
    };
    return options[estimateData.serviceType] || [];
  };

  const getRelevantFeatures = () => {
    const features = {
      'web-development': [
        'User Authentication',
        'Payment Integration',
        'Search Functionality',
        'Admin Dashboard',
        'Content Management',
        'Multi-language Support',
        'SEO Optimization',
        'Analytics Integration',
        'Third-party APIs',
        'Real-time Updates',
        'Email Integration',
        'Social Media Integration',
        'Mobile Responsive',
        'Performance Optimization',
        'Security Features'
      ],
      'mobile-apps': [
        'Push Notifications',
        'In-app Purchases',
        'Social Login',
        'Offline Functionality',
        'GPS/Location Services',
        'Camera Integration',
        'Biometric Authentication',
        'Real-time Chat',
        'File Upload/Download',
        'Payment Gateway',
        'Analytics Tracking',
        'Admin Panel',
        'Multi-platform Support',
        'Cloud Storage',
        'Custom UI/UX'
      ],
      'ai-solutions': [
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics',
        'Recommendation Engine',
        'Automated Workflows',
        'Data Visualization',
        'Machine Learning Models',
        'Deep Learning',
        'Speech Recognition',
        'Sentiment Analysis',
        'Fraud Detection',
        'Personalization',
        'Real-time Processing',
        'Cloud AI Services',
        'Custom Algorithms'
      ],
      'design-services': [
        'Responsive Design',
        'Brand Guidelines',
        'Design System',
        'Prototyping',
        'User Research',
        'Wireframing',
        'Icon Design',
        'Illustration',
        'Animation',
        'Print Design',
        'Packaging Design',
        'Marketing Materials',
        'Social Media Graphics',
        'Presentation Design',
        'Logo Variations'
      ],
      'outsourced-services': [
        'Email Management',
        'Calendar Scheduling',
        'Data Entry',
        'Research Tasks',
        'Content Creation',
        'Social Media Posting',
        'Customer Support',
        'Lead Generation',
        'Project Coordination',
        'Document Management',
        'Quality Assurance',
        'Translation Services',
        'Virtual Meetings',
        'Process Automation',
        'Reporting & Analytics'
      ]
    };
    return features[estimateData.serviceType] || [];
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-700 via-gray-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://readdy.ai/api/search-image?query=Premium%20modern%20abstract%20digital%20pattern%20background%20with%20geometric%20shapes%2C%20clean%20minimalist%20design%2C%20sophisticated%20muted%20pastel%20tones%20in%20soft%20coral%20pink%20and%20gentle%20peach%2C%20professional%20business%20aesthetic%2C%20subtle%20texture%20overlay%2C%20elegant%20gradient%20from%20light%20gray%20to%20soft%20pink&width=1200&height=800&seq=premium-cta-bg-muted&orientation=landscape" 
          alt="Premium overlay pattern" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center">
          <div className="text-base uppercase tracking-widest text-red-300 font-medium mb-8 flex items-center justify-center">
            <div className="w-8 h-px mr-3 bg-red-300"></div>
            Let's Connect
            <div className="w-8 h-px ml-3 bg-red-300"></div>
          </div>

          <h2 className="text-6xl lg:text-7xl font-bold text-white mb-10 relative tracking-tight">
            Let's Build Something
            <br />
            <span className="text-red-400">
              Extraordinary.
            </span>
            <svg className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-5" viewBox="0 0 256 20">
              <path d="M10 15 Q128 5 246 15" stroke="#f87171" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </h2>

          <p className="text-2xl text-red-100 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            Ready to transform your business with premium solutions? We're excited to hear about your project and demonstrate how Nifty Solutions can elevate your vision to extraordinary heights.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <Link
              href="#"
              className="group relative bg-white/95 backdrop-blur-sm text-gray-900 px-12 py-6 rounded-2xl hover:bg-white transition-all duration-300 transform hover:scale-105 text-xl font-bold whitespace-nowrap shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={(e) => {
                e.preventDefault();
                setShowEstimateForm(true);
              }}
            >
              <span className="relative z-10 flex items-center uppercase tracking-wide">
                Get Project Estimate
                <i className={`ri-calculator-line ml-4 transform transition-transform duration-300 ${isHovered ? 'translate-x-3' : ''}`}></i>
              </span>
              <div className="absolute inset-0 bg-red-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div 
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
              onClick={() => setShowContactForm(true)}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                <i className="ri-mail-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-3 text-xl uppercase tracking-wide">Email Us</h3>
              <p className="text-red-100 font-light text-lg">Send us a message</p>
            </div>

            <div 
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
              onClick={openWhatsApp}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                <i className="ri-whatsapp-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-3 text-xl uppercase tracking-wide">WhatsApp Us</h3>
              <p className="text-red-100 font-light text-lg">Start WhatsApp conversation</p>
            </div>

            <div 
              className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
              onClick={() => setShowCalendly(true)}
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                <i className="ri-calendar-line text-white text-2xl"></i>
              </div>
              <h3 className="text-white font-bold mb-3 text-xl uppercase tracking-wide">Schedule Call</h3>
              <p className="text-red-100 font-light text-lg">Book a premium consultation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Estimate Form Modal */}
      {showEstimateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-bold text-gray-900">Get Project Estimate</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                  <div className={`w-8 h-1 ${currentStep >= 2 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                  <div className={`w-8 h-1 ${currentStep >= 3 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                </div>
              </div>
              <button
                onClick={() => setShowEstimateForm(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>

            <form id="project-estimate-form" onSubmit={handleEstimateSubmit} className="p-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Step 1: Basic Information</h4>
                    <p className="text-gray-600">Tell us about yourself and your project</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={estimateData.name}
                        onChange={handleEstimateChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={estimateData.email}
                        onChange={handleEstimateChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={estimateData.company}
                        onChange={handleEstimateChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={estimateData.phone}
                        onChange={handleEstimateChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type *
                    </label>
                    <select
                      name="serviceType"
                      value={estimateData.serviceType}
                      onChange={handleEstimateChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-apps">Mobile Apps</option>
                      <option value="ai-solutions">AI Solutions</option>
                      <option value="design-services">Design Services</option>
                      <option value="outsourced-services">Outsourced Services</option>
                    </select>
                  </div>

                  {estimateData.serviceType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        name="projectType"
                        value={estimateData.projectType}
                        onChange={handleEstimateChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                      >
                        <option value="">Select project type</option>
                        {getProjectTypeOptions().map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      name="description"
                      value={estimateData.description}
                      onChange={handleEstimateChange}
                      required
                      rows={4}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
                      placeholder="Please describe your project in detail..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {estimateData.description.length}/500 characters
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Step 2: Project Details</h4>
                    <p className="text-gray-600">Help us understand your specific requirements</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range *
                      </label>
                      <select
                        name="budget"
                        value={estimateData.budget}
                        onChange={handleEstimateChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-50k">$15,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-250k">$100,000 - $250,000</option>
                        <option value="250k-plus">$250,000+</option>
                        <option value="discuss">Prefer to discuss</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline *
                      </label>
                      <select
                        name="timeline"
                        value={estimateData.timeline}
                        onChange={handleEstimateChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-12-months">6-12 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {estimateData.serviceType && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Required Features/Services
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                        {getRelevantFeatures().map(feature => (
                          <label key={feature} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="features"
                              value={feature}
                              checked={estimateData.features.includes(feature)}
                              onChange={handleEstimateChange}
                              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <input
                      type="text"
                      name="targetAudience"
                      value={estimateData.targetAudience}
                      onChange={handleEstimateChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="Who is your target audience?"
                    />
                  </div>

                  {(estimateData.serviceType === 'web-development' || estimateData.serviceType === 'mobile-apps') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Platforms/Devices
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Desktop', 'Mobile', 'Tablet', 'iOS', 'Android', 'Web Browser'].map(platform => (
                          <label key={platform} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              name="platforms"
                              value={platform}
                              checked={estimateData.platforms.includes(platform)}
                              onChange={handleEstimateChange}
                              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <span className="text-sm text-gray-700">{platform}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Step 3: Additional Requirements</h4>
                    <p className="text-gray-600">Final details to provide accurate estimate</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Urgency
                    </label>
                    <select
                      name="urgency"
                      value={estimateData.urgency}
                      onChange={handleEstimateChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                    >
                      <option value="">Select urgency level</option>
                      <option value="low">Low - No rush</option>
                      <option value="medium">Medium - Standard timeline</option>
                      <option value="high">High - Expedited delivery</option>
                      <option value="urgent">Urgent - Rush project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      References/Inspiration
                    </label>
                    <textarea
                      name="references"
                      value={estimateData.references}
                      onChange={handleEstimateChange}
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
                      placeholder="Share any reference websites, competitors, or inspiration..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      value={estimateData.additionalInfo}
                      onChange={handleEstimateChange}
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
                      placeholder="Any other details that might help us provide a better estimate..."
                    />
                  </div>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-circle-line text-green-500 text-2xl"></i>
                  </div>
                  <h5 className="text-green-800 font-semibold text-lg mb-2">Estimate Request Submitted!</h5>
                  <p className="text-green-700">
                    Thank you for providing detailed information. Our team will review your requirements and send you a comprehensive project estimate within 24 hours.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <i className="ri-error-warning-line text-red-500 text-xl mr-3"></i>
                    <p className="text-red-800 font-medium">
                      Please fill in all required fields and try again.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t">
                <div className="flex items-center space-x-2">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
                    >
                      Previous
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEstimateForm(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
                  >
                    Cancel
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (currentStep === 1 && (!estimateData.name || !estimateData.email || !estimateData.serviceType || !estimateData.description)) ||
                        (currentStep === 2 && (!estimateData.budget || !estimateData.timeline))
                      }
                      className="px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap flex items-center"
                    >
                      Next Step
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Get Estimate
                          <i className="ri-send-plane-line ml-2"></i>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>

            <form id="contact-form" onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
                  placeholder="Tell us about your project..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.message.length}/500 characters
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <i className="ri-check-circle-line text-green-500 text-xl mr-3"></i>
                    <p className="text-green-800 font-medium">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <i className="ri-error-warning-line text-red-500 text-xl mr-3"></i>
                    <p className="text-red-800 font-medium">
                      Please fill in all required fields and try again.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium whitespace-nowrap flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <i className="ri-send-plane-line ml-2"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">Schedule Your Consultation</h3>
              <button
                onClick={() => setShowCalendly(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>
            <div className="h-full">
              <iframe
                src="https://calendly.com/your-calendly-link"
                width="100%"
                height="100%"
                frameBorder="0"
                className="rounded-b-2xl"
                title="Schedule a consultation"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-16 left-16 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-16 right-16 w-20 h-20 bg-red-300 rounded-full animate-bounce opacity-20"></div>
      <div className="absolute top-1/2 left-16 w-12 h-12 bg-orange-300 rounded-full animate-ping opacity-30"></div>
      <div className="absolute top-24 right-24 w-16 h-16 bg-red-300 rounded-full animate-pulse opacity-20"></div>
    </section>
  );
}
