
'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface CustomerData {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
  features?: string[];
  industry?: string;
  targetAudience?: string;
  additionalInfo?: string;
  conversationId: string;
  sessionStart: Date;
  status: 'active' | 'completed' | 'abandoned';
  leadScore: number;
  source: string;
  followUpRequired: boolean;
}

export default function AILiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [customerData, setCustomerData] = useState<CustomerData>({
    conversationId: Date.now().toString(),
    sessionStart: new Date(),
    status: 'active',
    leadScore: 0,
    source: 'website',
    followUpRequired: false
  });
  const [currentStep, setCurrentStep] = useState('greeting');
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [chatSettings, setChatSettings] = useState({
    enabled: true,
    collectData: true,
    autoResponse: true,
    followUpEnabled: true
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load settings and chat data on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('niftyAdminSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setChatSettings({
          enabled: parsed.general?.liveChatWidget ?? true,
          collectData: parsed.ai?.autoCollectInfo ?? true,
          autoResponse: parsed.general?.autoResponse ?? true,
          followUpEnabled: parsed.ai?.followUpEnabled ?? true
        });
      } catch (error) {
        console.error('Error loading chat settings:', error);
      }
    }

    // Load existing chat data
    const savedChats = localStorage.getItem('niftyAIChats');
    if (savedChats) {
      try {
        const chats = JSON.parse(savedChats);
        const existingChat = chats.find((chat: any) => chat.conversationId === customerData.conversationId);
        if (existingChat) {
          setMessages(existingChat.messages || []);
          setCustomerData(existingChat.customerData || customerData);
        }
      } catch (error) {
        console.error('Error loading chat data:', error);
      }
    }
  }, []);

  // Save chat data whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      saveChatData();
    }
  }, [messages, customerData]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const saveChatData = () => {
    try {
      const chatData = {
        conversationId: customerData.conversationId,
        customerData: customerData,
        messages: messages,
        timestamp: new Date().toISOString(),
        status: customerData.status
      };

      const savedChats = localStorage.getItem('niftyAIChats');
      let chats = [];

      if (savedChats) {
        chats = JSON.parse(savedChats);
      }

      const existingIndex = chats.findIndex((chat: any) => chat.conversationId === customerData.conversationId);
      if (existingIndex !== -1) {
        chats[existingIndex] = chatData;
      } else {
        chats.push(chatData);
      }

      localStorage.setItem('niftyAIChats', JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chat data:', error);
    }
  };

  const calculateLeadScore = (data: CustomerData): number => {
    let score = 0;

    if (data.email) score += 30;
    if (data.name) score += 20;
    if (data.company) score += 15;
    if (data.phone) score += 25;
    if (data.projectType) score += 20;
    if (data.budget) score += 30;
    if (data.timeline) score += 15;
    if (data.requirements) score += 10;

    return Math.min(score, 100);
  };

  const aiQuestions = {
    greeting: [
      "Hello! I'm Nifty AI Assistant from Nifty Digital Solutions. I'm here to help you bring your project ideas to life! ",
      "I'd love to learn more about what you're looking to build. What kind of project are you considering?",
      "Are you thinking about web development, mobile apps, AI solutions, design services, or something else entirely?"
    ],
    projectType: [
      "That sounds exciting! Can you tell me more about your specific requirements?",
      "What's the main goal you want to achieve with this project?",
      "Who is your target audience or who will be using this solution?"
    ],
    details: [
      "Great! Now I'd like to understand your project better. What key features are most important to you?",
      "Do you have any specific technical requirements or preferences?",
      "Have you worked on similar projects before, or is this your first time?"
    ],
    budget: [
      "To help me provide the best recommendations, what's your estimated budget range?",
      "When would you ideally like to start this project?",
      "Do you have a preferred timeline for completion?"
    ],
    contact: [
      "I'd love to connect you with our team to discuss this further!",
      "Could you please share your name and email so we can follow up?",
      "Is there a phone number where we can reach you for a quick consultation?"
    ],
    company: [
      "What's the name of your company or organization?",
      "What industry are you in?",
      "How large is your team or organization?"
    ],
    finalization: [
      "Thank you for all the details! Is there anything else about your project that you'd like to share?",
      "Do you have any specific questions about our services or process?",
      "I'll make sure our team gets all this information and follows up with you shortly!"
    ]
  };

  const extractProjectType = (message: string): string => {
    const projectTypes = {
      'web': 'Web Development',
      'website': 'Web Development',
      'ecommerce': 'E-commerce Development',
      'mobile': 'Mobile App Development',
      'app': 'Mobile App Development',
      'ai': 'AI Solutions',
      'artificial intelligence': 'AI Solutions',
      'machine learning': 'AI Solutions',
      'design': 'Design Services',
      'branding': 'Design Services',
      'logo': 'Design Services',
      'assistant': 'Virtual Assistant Services',
      'support': 'Virtual Assistant Services',
      'outsourcing': 'Outsourced Services'
    };

    const lowerMessage = message.toLowerCase();
    for (const [key, value] of Object.entries(projectTypes)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    return 'Custom Solution';
  };

  const extractBudget = (message: string): string => {
    const budgetRanges = {
      'under 5': 'Under $5,000',
      'less than 5': 'Under $5,000',
      '5k': '$5,000 - $15,000',
      '15k': '$15,000 - $50,000',
      '50k': '$50,000 - $100,000',
      '100k': '$100,000 - $250,000',
      'over 250': '$250,000+',
      'not sure': 'To be discussed',
      'discuss': 'To be discussed'
    };

    const lowerMessage = message.toLowerCase();
    for (const [key, value] of Object.entries(budgetRanges)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }
    return message;
  };

  const extractEmail = (message: string): string | null => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const match = message.match(emailRegex);
    return match ? match[0] : null;
  };

  const extractPhone = (message: string): string | null => {
    const phoneRegex = /(?:\+?1[-.\\\s]?)?\(?([0-9]{3})\)?[-.\\\s]?([0-9]{3})[-.\\\s]?([0-9]{4})/;
    const match = message.match(phoneRegex);
    return match ? match[0] : null;
  };

  const getAIResponse = (userMessage: string, step: string): string[] => {
    const responses = {
      greeting: [
        "Thank you for sharing that! Let me ask a few questions to better understand your needs.",
        "I'd love to learn more about your project requirements."
      ],
      projectType: [
        "That's very helpful! Now I have a better understanding of what you're looking for.",
        "Excellent! Let me gather some more details about your specific needs."
      ],
      details: [
        "Great insights! This information will help our team provide you with the best solution.",
        "Perfect! You're giving me a clear picture of what you want to achieve."
      ],
      budget: [
        "Thank you for that information! It helps me understand the scope better.",
        "That's very helpful for planning the right approach for your project."
      ],
      contact: [
        "Perfect! I have your contact details now.",
        "Thank you! Our team will be able to reach you directly."
      ],
      company: [
        "Great! This context about your business is very valuable.",
        "Thank you for providing that background information."
      ],
      finalization: [
        "Excellent! I have all the information I need to connect you with our team.",
        "Perfect! Our experts will review your requirements and get back to you soon."
      ]
    };

    return responses[step as keyof typeof responses] || ["Thank you for that information!"];
  };

  const processUserMessage = (message: string) => {
    let updatedData = { ...customerData };
    let nextStep = currentStep;

    switch (currentStep) {
      case 'greeting':
        updatedData.projectType = extractProjectType(message);
        updatedData.requirements = message;
        nextStep = 'projectType';
        break;
      case 'projectType':
        updatedData.additionalInfo = (updatedData.additionalInfo || '') + ' ' + message;
        nextStep = 'details';
        break;
      case 'details':
        const features = message.split(',').map(f => f.trim()).filter(f => f.length > 0);
        updatedData.features = features;
        updatedData.additionalInfo = (updatedData.additionalInfo || '') + ' Features: ' + message;
        nextStep = 'budget';
        break;
      case 'budget':
        updatedData.budget = extractBudget(message);
        if (message.toLowerCase().includes('month') || message.toLowerCase().includes('week')) {
          updatedData.timeline = message;
        }
        nextStep = 'contact';
        break;
      case 'contact':
        const email = extractEmail(message);
        const phone = extractPhone(message);
        if (email) updatedData.email = email;
        if (phone) updatedData.phone = phone;
        if (message.toLowerCase().includes('name') || (!email && !phone)) {
          updatedData.name = message;
        }
        nextStep = updatedData.email ? 'company' : 'contact';
        break;
      case 'company':
        updatedData.company = message;
        if (message.toLowerCase().includes('industry')) {
          updatedData.industry = message;
        }
        nextStep = 'finalization';
        break;
      case 'finalization':
        updatedData.additionalInfo = (updatedData.additionalInfo || '') + ' Final notes: ' + message;
        updatedData.status = 'completed';
        updatedData.followUpRequired = true;
        break;
    }

    // Calculate lead score
    updatedData.leadScore = calculateLeadScore(updatedData);

    setCustomerData(updatedData);
    setCurrentStep(nextStep);

    return nextStep;
  };

  const sendDataToTeam = async (data: CustomerData) => {
    try {
      const formattedData = {
        ...data,
        conversationHistory: messages,
        timestamp: new Date().toISOString(),
        source: 'AI Live Chat',
        collectedBy: 'Nifty AI Assistant'
      };

      // Save to inquiries list in admin panel
      const existingInquiries = localStorage.getItem('niftyInquiries');
      let inquiries = [];

      if (existingInquiries) {
        inquiries = JSON.parse(existingInquiries);
      }

      inquiries.push({
        id: Date.now(),
        source: 'AI Live Chat',
        collectedBy: 'Nifty AI Assistant',
        timestamp: new Date().toISOString(),
        customerName: data.name || 'Anonymous',
        customerEmail: data.email || '',
        customerPhone: data.phone || '',
        customerCompany: data.company || '',
        projectType: data.projectType || 'Not specified',
        budget: data.budget || 'Not specified',
        urgency: data.leadScore > 70 ? 'High' : data.leadScore > 40 ? 'Medium' : 'Low',
        status: 'New',
        notionStatus: 'Pending',
        emailSent: false,
        assignedTo: 'AI Team',
        notes: data.additionalInfo || '',
        leadScore: data.leadScore || 0,
        conversationId: data.conversationId
      });

      localStorage.setItem('niftyInquiries', JSON.stringify(inquiries));

      // Send email notification if enabled
      const settings = localStorage.getItem('niftyAdminSettings');
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        if (parsedSettings.notifications?.newInquiry) {
          // In production, this would send an actual email
          console.log('Email notification sent to admin');
        }
      }

      // Update chat data status
      const savedChats = localStorage.getItem('niftyAIChats');
      let chats = [];

      if (savedChats) {
        chats = JSON.parse(savedChats);
      }

      const existingIndex = chats.findIndex((chat: any) => chat.conversationId === data.conversationId);
      if (existingIndex !== -1) {
        chats[existingIndex].customerData = { ...data, status: 'completed' };
      } else {
        chats.push({
          conversationId: data.conversationId,
          customerData: { ...data, status: 'completed' },
          messages: messages,
          timestamp: new Date().toISOString(),
          status: 'completed'
        });
      }

      localStorage.setItem('niftyAIChats', JSON.stringify(chats));

      return true;
    } catch (error) {
      console.error('Error sending data to team:', error);
      return false;
    }
  };

  const addMessage = (content: string, type: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    if (type === 'ai' && !isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    addMessage(userMessage, 'user');

    const nextStep = processUserMessage(userMessage);

    setShowTypingIndicator(true);

    setTimeout(() => {
      setShowTypingIndicator(false);

      const aiResponse = getAIResponse(userMessage, currentStep);
      aiResponse.forEach((response, index) => {
        setTimeout(() => {
          addMessage(response, 'ai');
        }, index * 1000);
      });

      setTimeout(() => {
        const nextQuestions = aiQuestions[nextStep as keyof typeof aiQuestions];
        if (nextQuestions) {
          nextQuestions.forEach((question, index) => {
            setTimeout(() => {
              addMessage(question, 'ai');
            }, (index + aiResponse.length) * 1000);
          });
        }

        if (nextStep === 'finalization' && customerData.email) {
          setTimeout(() => {
            sendDataToTeam(customerData);
            addMessage("", 'ai');
          }, (aiResponse.length + (nextQuestions?.length || 0)) * 1000 + 2000);
        }
      }, aiResponse.length * 1000 + 500);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const initializeChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        aiQuestions.greeting.forEach((message, index) => {
          setTimeout(() => {
            addMessage(message, 'ai');
          }, index * 1000);
        });
      }, 500);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleEndChat = () => {
    const updatedData = { ...customerData, status: 'completed' as const };
    setCustomerData(updatedData);
    addMessage("Thank you for chatting with us! If you have any more questions, feel free to start a new conversation.", 'ai');
  };

  // Don't render if chat is disabled
  if (!chatSettings.enabled) {
    return null;
  }

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'w-96 h-[600px]' : 'w-16 h-16'}`}>
        {!isOpen ? (
          <div className="relative">
            <button
              onClick={initializeChat}
              className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
            >
              <i className="ri-chat-3-line text-white text-2xl group-hover:scale-110 transition-transform duration-300"></i>
            </button>

            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>

            {unreadCount > 0 && (
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{unreadCount}</span>
              </div>
            )}

            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Chat with our AI assistant
              <div className="absolute top-full right-4 w-2 h-2 bg-gray-900 rotate-45 transform -translate-y-1"></div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden h-full flex flex-col">
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <i className="ri-robot-line text-white text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Nifty AI Assistant</h3>
                    <div className="flex items-center space-x-2 text-sm opacity-90">
                      <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                      <span>Online & Ready to Help</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <i className={`ri-${isMinimized ? 'add' : 'subtract'}-line text-white`}></i>
                  </button>
                  <button
                    onClick={handleEndChat}
                    className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    title="End Chat"
                  >
                    <i className="ri-check-line text-white"></i>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                  >
                    <i className="ri-close-line text-white"></i>
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                              <i className="ri-robot-line text-white text-xs"></i>
                            </div>
                            <span className="text-xs text-gray-500">Nifty AI</span>
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <div className={`text-xs text-gray-400 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}

                  {showTypingIndicator && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%]">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                            <i className="ri-robot-line text-white text-xs"></i>
                          </div>
                          <span className="text-xs text-gray-500">Nifty AI is typing...</span>
                        </div>
                        <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="ri-send-plane-fill text-white text-lg"></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <i className="ri-shield-check-line"></i>
                      <span>Secure & Confidential</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>AI Powered</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
