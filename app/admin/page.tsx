
'use client';

import { useState, useEffect } from 'react';
import SettingsTab from './SettingsTab';
import AdminAuthWrapper from '../../components/AdminAuthWrapper';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalInquiries: 0,
    pendingInquiries: 0,
    completedInquiries: 0,
    conversionRate: 0,
    totalRevenue: 0
  });

  const [inquiries, setInquiries] = useState([]);
  const [contentData, setContentData] = useState({
    hero: {
      title: "Transform Your Business with AI-Powered Digital Solutions",
      subtitle: "Nifty Digital Solutions",
      description: "We specialize in creating cutting-edge websites, mobile apps, and AI automation systems that drive real results for your business.",
      primaryButton: "Get Started",
      secondaryButton: "View Our Work"
    },
    services: {
      digital: [
        {
          title: "Web Development",
          description: "Custom websites built with modern technologies",
          icon: "ri-code-line"
        },
        {
          title: "Mobile Apps",
          description: "Native and cross-platform mobile applications",
          icon: "ri-smartphone-line"
        },
        {
          title: "AI Solutions",
          description: "Intelligent automation and AI-powered tools",
          icon: "ri-robot-line"
        },
        {
          title: "E-commerce",
          description: "Complete online store solutions",
          icon: "ri-shopping-cart-line"
        }
      ],
      outsourced: [
        {
          title: "Design Services",
          description: "Creative design and branding solutions",
          icon: "ri-palette-line"
        },
        {
          title: "Virtual Assistant",
          description: "Professional administrative support",
          icon: "ri-user-settings-line"
        },
        {
          title: "Content Creation",
          description: "High-quality content and copywriting",
          icon: "ri-file-text-line"
        },
        {
          title: "Digital Marketing",
          description: "Strategic marketing and promotion",
          icon: "ri-megaphone-line"
        }
      ]
    },
    portfolio: {
      title: "Our Portfolio",
      subtitle: "Showcasing Excellence",
      description: "Explore our diverse range of successful projects that demonstrate our expertise in digital solutions.",
      projects: [
        {
          id: 1,
          title: "E-commerce Platform",
          category: "Web Development",
          client: "TechCorp Inc.",
          description: "A comprehensive e-commerce solution with advanced features",
          image: "https://readdy.ai/api/search-image?query=modern%20e-commerce%20website%20interface%20with%20clean%20design%20and%20professional%20layout%20featuring%20product%20listings%20and%20shopping%20cart%20functionality%20on%20desktop%20screen&width=600&height=400&seq=ecommerce-001&orientation=landscape",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"],
          duration: "3 months",
          budget: "$15,000",
          results: ["300% increase in sales", "50% faster page load times", "Enhanced user experience"],
          status: "Completed",
          featured: true
        },
        {
          id: 2,
          title: "Mobile Banking App",
          category: "Mobile Development",
          client: "SecureBank Ltd.",
          description: "Secure mobile banking application with biometric authentication",
          image: "https://readdy.ai/api/search-image?query=modern%20mobile%20banking%20app%20interface%20showing%20account%20balance%20and%20transaction%20history%20with%20clean%20financial%20design%20and%20security%20features&width=600&height=400&seq=banking-002&orientation=landscape",
          technologies: ["React Native", "Firebase", "Biometric Auth"],
          duration: "4 months",
          budget: "$25,000",
          results: ["40% increase in user engagement", "99.9% uptime", "Enhanced security"],
          status: "Completed",
          featured: false
        },
        {
          id: 3,
          title: "AI Chatbot System",
          category: "AI Solutions",
          client: "CustomerFirst Corp.",
          description: "Intelligent customer service chatbot with natural language processing",
          image: "https://readdy.ai/api/search-image?query=AI%20chatbot%20interface%20with%20conversational%20bubbles%20and%20modern%20messaging%20design%20showing%20customer%20support%20automation%20and%20clean%20chat%20interface&width=600&height=400&seq=chatbot-003&orientation=landscape",
          technologies: ["Python", "TensorFlow", "NLP", "API"],
          duration: "2 months",
          budget: "$12,000",
          results: ["60% reduction in support tickets", "24/7 availability", "Improved customer satisfaction"],
          status: "Completed",
          featured: true
        }
      ]
    }
  });

  const [editingContent, setEditingContent] = useState({});
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    setMounted(true);

    // Load inquiries
    const savedInquiries = localStorage.getItem('niftyInquiries');
    if (savedInquiries) {
      try {
        const parsed = JSON.parse(savedInquiries);
        setInquiries(parsed);

        // Calculate stats
        const total = parsed.length;
        const pending = parsed.filter(i => i.status === 'new' || i.status === 'pending').length;
        const completed = parsed.filter(i => i.status === 'completed').length;
        const conversion = total > 0 ? (completed / total * 100).toFixed(1) : 0;

        setStats({
          totalInquiries: total,
          pendingInquiries: pending,
          completedInquiries: completed,
          conversionRate: parseFloat(conversion),
          totalRevenue: completed * 1500 // Estimate $1500 per completed project
        });
      } catch (error) {
        console.error('Error loading inquiries:', error);
      }
    }

    // Load content data
    const savedHero = localStorage.getItem('niftyHeroContent');
    const savedServices = localStorage.getItem('niftyServicesContent');
    const savedPortfolio = localStorage.getItem('niftyPortfolioContent');

    if (savedHero || savedServices || savedPortfolio) {
      setContentData(prev => ({
        ...prev,
        hero: savedHero ? JSON.parse(savedHero) : prev.hero,
        services: savedServices ? JSON.parse(savedServices) : prev.services,
        portfolio: savedPortfolio ? JSON.parse(savedPortfolio) : prev.portfolio
      }));
    }
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'inquiries', label: 'Inquiries', icon: 'ri-mail-line' },
    { id: 'content', label: 'Content Management', icon: 'ri-edit-box-line' },
    { id: 'settings', label: 'Settings', icon: 'ri-settings-line' }
  ];

  const contentTabs = [
    { id: 'hero', label: 'Hero Section', icon: 'ri-home-line' },
    { id: 'services', label: 'Services', icon: 'ri-service-line' },
    { id: 'portfolio', label: 'Portfolio', icon: 'ri-briefcase-line' }
  ];

  const [activeContentTab, setActiveContentTab] = useState('hero');

  const handleSaveContent = async (section, data) => {
    try {
      const updatedData = { ...contentData, [section]: data };
      setContentData(updatedData);

      // Save to localStorage
      localStorage.setItem(`nifty${section.charAt(0).toUpperCase() + section.slice(1)}Content`, JSON.stringify(data));

      // Dispatch storage event for real-time updates
      window.dispatchEvent(new StorageEvent('storage', {
        key: `nifty${section.charAt(0).toUpperCase() + section.slice(1)}Content`,
        newValue: JSON.stringify(data)
      }));

      setIsEditingContent(false);
      setEditingContent({});

      alert('Content updated successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content. Please try again.');
    }
  };

  const handleUpdateInquiryStatus = (inquiryId, newStatus) => {
    const updatedInquiries = inquiries.map(inquiry =>
      inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
    );
    setInquiries(updatedInquiries);
    localStorage.setItem('niftyInquiries', JSON.stringify(updatedInquiries));
  };

  const handleDeleteInquiry = (inquiryId) => {
    const updatedInquiries = inquiries.filter(inquiry => inquiry.id !== inquiryId);
    setInquiries(updatedInquiries);
    localStorage.setItem('niftyInquiries', JSON.stringify(updatedInquiries));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <div className="text-sm text-gray-600" suppressHydrationWarning={true}>
          Last updated: {mounted ? new Date().toLocaleDateString() : ''}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Inquiries</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalInquiries}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="ri-mail-line text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{stats.pendingInquiries}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="ri-time-line text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completedInquiries}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="ri-check-line text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="ri-line-chart-line text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-red-600">${stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="ri-money-dollar-circle-line text-red-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Inquiries</h3>
        </div>
        <div className="p-6">
          {inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.slice(0, 5).map(inquiry => (
                <div key={inquiry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{inquiry.name}</h4>
                      <p className="text-sm text-gray-600">{inquiry.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : inquiry.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {inquiry.status}
                    </span>
                    <span className="text-sm text-gray-500" suppressHydrationWarning={true}>
                      {mounted ? new Date(inquiry.timestamp).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="ri-inbox-line text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-600">No inquiries yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderInquiries = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Customer Inquiries</h2>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            {inquiries.length} total inquiries
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          {inquiries.length > 0 ? (
            <div className="space-y-4">
              {inquiries.map(inquiry => (
                <div key={inquiry.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <i className="ri-user-line text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{inquiry.name}</h3>
                        <p className="text-gray-600">{inquiry.email}</p>
                        <p className="text-sm text-gray-500" suppressHydrationWarning={true}>
                          {mounted ? new Date(inquiry.timestamp).toLocaleString() : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleUpdateInquiryStatus(inquiry.id, e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                      >
                        <option value="new">New</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        onClick={() => handleDeleteInquiry(inquiry.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>

                  {inquiry.phone && (
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="ri-phone-line text-gray-400"></i>
                      <span className="text-gray-600">{inquiry.phone}</span>
                    </div>
                  )}

                  {inquiry.company && (
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="ri-building-line text-gray-400"></i>
                      <span className="text-gray-600">{inquiry.company}</span>
                    </div>
                  )}

                  {inquiry.budget && (
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="ri-money-dollar-circle-line text-gray-400"></i>
                      <span className="text-gray-600">{inquiry.budget}</span>
                    </div>
                  )}

                  {inquiry.service && (
                    <div className="flex items-center space-x-2 mb-4">
                      <i className="ri-service-line text-gray-400"></i>
                      <span className="text-gray-600">{inquiry.service}</span>
                    </div>
                  )}

                  {inquiry.message && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{inquiry.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <i className="ri-inbox-line text-6xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No Inquiries Yet</h3>
              <p className="text-gray-600">Customer inquiries will appear here when they contact you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderHeroContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Hero Section Management</h3>
        <div className="flex items-center space-x-3">
          {isEditingContent ? (
            <>
              <button
                onClick={() => handleSaveContent('hero', editingContent)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                <i className="ri-save-line mr-2"></i>Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditingContent(false);
                  setEditingContent({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsEditingContent(true);
                setEditingContent(contentData.hero);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
            >
              <i className="ri-edit-line mr-2"></i>Edit Hero
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
            <i className="ri-eye-line mr-2 text-blue-500"></i>
            Current Live Content
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-800">{contentData.hero.subtitle}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-800">{contentData.hero.title}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-800">{contentData.hero.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-800">{contentData.hero.primaryButton}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button</label>
              <div className="p-3 bg-gray-50 rounded-lg border">
                <p className="text-gray-800">{contentData.hero.secondaryButton}</p>
              </div>
            </div>
          </div>
        </div>

        {isEditingContent && (
          <div className="border-t pt-6">
            <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
              <i className="ri-edit-line mr-2 text-red-500"></i>
              Edit Content
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={editingContent.subtitle || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, subtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter subtitle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingContent.title || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter main title"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingContent.description || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter description"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
                  <input
                    type="text"
                    value={editingContent.primaryButton || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, primaryButton: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter primary button text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
                  <input
                    type="text"
                    value={editingContent.secondaryButton || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, secondaryButton: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter secondary button text"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <i className="ri-information-line text-blue-600 mr-3"></i>
            <div>
              <h5 className="font-medium text-blue-800">Live Website Updates</h5>
              <p className="text-sm text-blue-700">
                Changes made here will immediately update your live website.
                <a href="/" target="_blank" className="underline ml-1">Preview changes</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Services Management</h3>
        <div className="flex items-center space-x-3">
          {isEditingContent ? (
            <>
              <button
                onClick={() => handleSaveContent('services', editingContent)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                <i className="ri-save-line mr-2"></i>Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditingContent(false);
                  setEditingContent({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsEditingContent(true);
                setEditingContent(contentData.services);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
            >
              <i className="ri-edit-line mr-2"></i>Edit Services
            </button>
          )}
        </div>
      </div>

      {/* Digital Solutions Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <i className="ri-code-line mr-2 text-blue-500"></i>
          Digital Solutions ({contentData.services.digital.length} services)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {contentData.services.digital.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className={`${service.icon} text-blue-600`}></i>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{service.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                </div>
                {isEditingContent && (
                  <button
                    onClick={() => {
                      const updated = { ...editingContent };
                      updated.digital.splice(index, 1);
                      setEditingContent(updated);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditingContent && (
          <div className="border-t pt-6">
            <h5 className="font-medium text-gray-800 mb-4">Edit Digital Solutions</h5>
            <div className="space-y-4">
              {editingContent.digital?.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.digital[index].title = e.target.value;
                          setEditingContent(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Remix Icon)</label>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.digital[index].icon = e.target.value;
                          setEditingContent(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="ri-code-line"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        type="text"
                        value={service.description}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.digital[index].description = e.target.value;
                          setEditingContent(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const updated = { ...editingContent };
                  updated.digital.push({
                    title: 'New Service',
                    description: 'Service description',
                    icon: 'ri-service-line'
                  });
                  setEditingContent(updated);
                }}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
              >
                <i className="ri-add-line mr-2"></i>Add New Digital Service
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Outsourced Services Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <i className="ri-team-line mr-2 text-green-500"></i>
          Outsourced Services ({contentData.services.outsourced.length} services)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {contentData.services.outsourced.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className={`${service.icon} text-green-600`}></i>
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-800">{service.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                </div>
                {isEditingContent && (
                  <button
                    onClick={() => {
                      const updated = { ...editingContent };
                      updated.outsourced.splice(index, 1);
                      setEditingContent(updated);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditingContent && (
          <div className="border-t pt-6">
            <h5 className="font-medium text-gray-800 mb-4">Edit Outsourced Services</h5>
            <div className="space-y-4">
              {editingContent.outsourced?.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.outsourced[index].title = e.target.value;
                          setEditingContent(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Remix Icon)</label>
                      <input
                        type="text"
                        value={service.icon}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.outsourced[index].icon = e.target.value;
                          setEditingContent(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="ri-palette-line"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        type="text"
                        value={service.description}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.outsourced[index].description = e.target.value;
                          setEditingContent(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const updated = { ...editingContent };
                  updated.outsourced.push({
                    title: 'New Service',
                    description: 'Service description',
                    icon: 'ri-service-line'
                  });
                  setEditingContent(updated);
                }}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
              >
                <i className="ri-add-line mr-2"></i>Add New Outsourced Service
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <i className="ri-information-line text-blue-600 mr-3"></i>
          <div>
            <h5 className="font-medium text-blue-800">Live Website Updates</h5>
            <p className="text-sm text-blue-700">
              Changes made here will immediately update your live website services section.
              <a href="/" target="_blank" className="underline ml-1">Preview changes</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortfolioContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Portfolio Management</h3>
        <div className="flex items-center space-x-3">
          {isEditingContent ? (
            <>
              <button
                onClick={() => handleSaveContent('portfolio', editingContent)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors whitespace-nowrap"
              >
                <i className="ri-save-line mr-2"></i>Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditingContent(false);
                  setEditingContent({});
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsEditingContent(true);
                setEditingContent(contentData.portfolio);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
            >
              <i className="ri-edit-line mr-2"></i>Edit Portfolio
            </button>
          )}
        </div>
      </div>

      {/* Portfolio Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <i className="ri-text mr-2 text-blue-500"></i>
          Portfolio Header
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-800">{contentData.portfolio.title}</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
            <div className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-gray-800">{contentData.portfolio.subtitle}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <div className="p-3 bg-gray-50 rounded-lg border">
            <p className="text-gray-800">{contentData.portfolio.description}</p>
          </div>
        </div>

        {isEditingContent && (
          <div className="border-t pt-6 mt-6">
            <h5 className="font-medium text-gray-800 mb-4">Edit Portfolio Header</h5>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingContent.title || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter portfolio title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={editingContent.subtitle || ''}
                    onChange={(e) => setEditingContent({ ...editingContent, subtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter subtitle"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingContent.description || ''}
                  onChange={(e) => setEditingContent({ ...editingContent, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter description"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <i className="ri-briefcase-line mr-2 text-green-500"></i>
          Portfolio Projects ({contentData.portfolio.projects.length} projects)
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {contentData.portfolio.projects.map((project, index) => (
            <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-gray-800">{project.title}</h5>
                  <span className={`px-2 py-1 text-xs rounded-full ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <i className="ri-building-line mr-1"></i>
                  <span>{project.client}</span>
                  <span className="mx-2">•</span>
                  <span>{project.category}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span>Duration: {project.duration}</span>
                  <span className="mx-2">•</span>
                  <span>Budget: {project.budget}</span>
                </div>
                {isEditingContent && (
                  <div className="mt-3 pt-3 border-t">
                    <button
                      onClick={() => {
                        const updated = { ...editingContent };
                        updated.projects.splice(index, 1);
                        setEditingContent(updated);
                      }}
                      className="w-full px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <i className="ri-delete-bin-line mr-2"></i>Remove Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditingContent && (
          <div className="border-t pt-6">
            <h5 className="font-medium text-gray-800 mb-4">Edit Portfolio Projects</h5>
            <div className="space-y-6">
              {editingContent.projects?.map((project, index) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => {
                            const updated = { ...editingContent };
                            updated.projects[index].title = e.target.value;
                            setEditingContent(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={project.category}
                          onChange={(e) => {
                            const updated = { ...editingContent };
                            updated.projects[index].category = e.target.value;
                            setEditingContent(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                        <input
                          type="text"
                          value={project.client}
                          onChange={(e) => {
                            const updated = { ...editingContent };
                            updated.projects[index].client = e.target.value;
                            setEditingContent(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                          value={project.status}
                          onChange={(e) => {
                            const updated = { ...editingContent };
                            updated.projects[index].status = e.target.value;
                            setEditingContent(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent pr-8"
                        >
                          <option value="Completed">Completed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Planning">Planning</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.projects[index].description = e.target.value;
                          setEditingContent(updated);
                        }}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          value={project.duration}
                          onChange={(e) => {
                            const updated = { ...editingContent };
                            updated.projects[index].duration = e.target.value;
                            setEditingContent(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                        <input
                          type="text"
                          value={project.budget}
                          onChange={(e) => {
                            const updated = { ...editingContent };
                            updated.projects[index].budget = e.target.value;
                            setEditingContent(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        value={project.technologies.join(', ')}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.projects[index].technologies = e.target.value.split(',').map(tech => tech.trim());
                          setEditingContent(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Results (comma-separated)</label>
                      <input
                        type="text"
                        value={project.results.join(', ')}
                        onChange={(e) => {
                          const updated = { ...editingContent };
                          updated.projects[index].results = e.target.value.split(',').map(result => result.trim());
                          setEditingContent(updated);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="300% increase in sales, 50% faster load times"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={project.featured}
                          onChange={(e) => {
                            const updated = { ...editingContent };
                            updated.projects[index].featured = e.target.checked;
                            setEditingContent(updated);
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Featured Project</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const updated = { ...editingContent };
                  const newProject = {
                    id: Date.now(),
                    title: 'New Project',
                    category: 'Web Development',
                    client: 'Client Name',
                    description: 'Project description',
                    image: 'https://readdy.ai/api/search-image?query=modern%20web%20application%20interface%20with%20clean%20professional%20design%20and%20user%20friendly%20layout%20showing%20dashboard%20or%20homepage%20with%20contemporary%20styling&width=600&height=400&seq=project-new&orientation=landscape',
                    technologies: ['React', 'Node.js'],
                    duration: '2 months',
                    budget: '$10,000',
                    results: ['Improved user experience', 'Increased efficiency'],
                    status: 'Completed',
                    featured: false
                  };
                  updated.projects.push(newProject);
                  setEditingContent(updated);
                }}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
              >
                <i className="ri-add-line mr-2"></i>Add New Project
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <i className="ri-information-line text-blue-600 mr-3"></i>
          <div>
            <h5 className="font-medium text-blue-800">Live Website Updates</h5>
            <p className="text-sm text-blue-700">
              Changes made here will immediately update your live website portfolio section.
              <a href="/" target="_blank" className="underline ml-1">Preview changes</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
        <div className="text-sm text-gray-600">
          Manage your website content in real-time
        </div>
      </div>

      {/* Content Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex overflow-x-auto p-1">
          {contentTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveContentTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${activeContentTab === tab.id ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'}`}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      {activeContentTab === 'hero' && renderHeroContent()}
      {activeContentTab === 'services' && renderServicesContent()}
      {activeContentTab === 'portfolio' && renderPortfolioContent()}
    </div>
  );

  function SettingsTabComponent() {
    return <SettingsTab />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'inquiries':
        return renderInquiries();
      case 'content':
        return renderContent();
      case 'settings':
        return <SettingsTabComponent />;
      default:
        return renderDashboard();
    }
  };

  const handleUpdateCredentials = (newCredentials) => {
    localStorage.setItem('adminCredentials', JSON.stringify(newCredentials));
    alert('Login credentials updated successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your business operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="/"
            target="_blank"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            <i className="ri-external-link-line mr-2"></i>View Website
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex overflow-x-auto p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'}`}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Add Account Management Tab */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Change Username</label>
              <input
                type="text"
                placeholder="Enter new username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            onClick={() => {
              // Add password change logic here
              alert('Password change functionality will be implemented');
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
          >
            <i className="ri-key-line mr-2"></i>Update Credentials
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminAuthWrapper>
      <AdminDashboard />
    </AdminAuthWrapper>
  );
}
