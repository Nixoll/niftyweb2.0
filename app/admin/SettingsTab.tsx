
'use client';

import { useState, useEffect } from 'react';

export default function SettingsTab() {
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      autoResponse: true,
      emailNotifications: true,
      dataRetention: true,
      maintenanceMode: false,
      analyticsTracking: true,
      liveChatWidget: true
    },
    ai: {
      selectedAI: 'gpt-4',
      openaiApiKey: '',
      anthropicApiKey: '',
      googleApiKey: '',
      context: `You are a professional AI assistant for Nifty Digital Solutions, a premium digital solutions company. Always be helpful, professional, and focus on understanding customer needs. Ask relevant questions about their project requirements, budget, timeline, and contact information. Be concise but thorough in your responses.`,
      temperature: 0.7,
      maxTokens: 1000,
      responseStyle: 'professional',
      autoCollectInfo: true,
      followUpEnabled: true
    },
    communications: {
      whatsappNumber: '+1 (555) 123-4567',
      supportEmail: 'support@niftysolutions.com',
      salesEmail: 'sales@niftysolutions.com',
      phoneNumber: '+1 (555) 123-4567',
      businessHours: '9:00 AM - 6:00 PM EST',
      timezone: 'EST'
    },
    integrations: {
      emailService: 'sendgrid',
      emailApiKey: '',
      whatsappApiKey: '',
      notionApiKey: '',
      notionDatabaseId: ''
    },
    notifications: {
      newInquiry: true,
      dailyReport: true,
      weeklyReport: true,
      errorAlerts: true,
      maintenanceAlerts: true,
      systemUpdates: false
    },
    security: {
      sessionTimeout: 24, // hours
      maxLoginAttempts: 5,
      requireStrongPassword: true,
      twoFactorAuth: false,
      loginNotifications: true
    }
  });

  const [credentials, setCredentials] = useState({
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('niftyAdminSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        setEditedSettings(parsed);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const settingsTabs = [
    { id: 'general', label: 'General', icon: 'ri-settings-line' },
    { id: 'ai', label: 'AI Configuration', icon: 'ri-robot-line' },
    { id: 'communications', label: 'Communications', icon: 'ri-phone-line' },
    { id: 'integrations', label: 'Integrations', icon: 'ri-plug-line' },
    { id: 'notifications', label: 'Notifications', icon: 'ri-notification-line' },
    { id: 'security', label: 'Security', icon: 'ri-shield-line' }
  ];

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSettings(editedSettings);
      setIsEditing(false);
      localStorage.setItem('niftyAdminSettings', JSON.stringify(editedSettings));

      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedSettings(settings);
    setIsEditing(false);
  };

  const handleBooleanToggle = (section, key) => {
    if (isEditing) {
      setEditedSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: !prev[section][key]
        }
      }));
    }
  };

  const handleInputChange = (section, key, value) => {
    if (isEditing) {
      setEditedSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    }
  };

  const handleUpdateCredentials = async () => {
    if (!credentials.currentPassword || !credentials.newUsername || !credentials.newPassword) {
      alert('Please fill in all required fields');
      return;
    }

    if (credentials.newPassword !== credentials.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      // Verify current password
      const storedCredentials = localStorage.getItem('adminCredentials');
      const currentCreds = storedCredentials ? JSON.parse(storedCredentials) : { username: 'admin', password: 'admin123' };

      if (credentials.currentPassword !== currentCreds.password) {
        alert('Current password is incorrect');
        return;
      }

      // Update credentials
      const newCredentials = {
        username: credentials.newUsername,
        password: credentials.newPassword
      };

      localStorage.setItem('adminCredentials', JSON.stringify(newCredentials));

      // Update session
      const session = localStorage.getItem('adminSession');
      if (session) {
        const sessionData = JSON.parse(session);
        sessionData.username = credentials.newUsername;
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
      }

      alert('Credentials updated successfully!');
      setCredentials({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error updating credentials:', error);
      alert('Failed to update credentials. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">System Settings</h2>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line mr-2"></i>Save All
                  </>
                )}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
            >
              <i className="ri-edit-line mr-2"></i>Edit Settings
            </button>
          )}
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex overflow-x-auto p-1">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSettingsTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeSettingsTab === tab.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
              }`}
            >
              <i className={tab.icon}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* General Settings */}
      {activeSettingsTab === 'general' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h3>
          <div className="space-y-4">
            {Object.entries(settings.general).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {key === 'autoResponse' && 'Automatically respond to new inquiries'}
                    {key === 'emailNotifications' && 'Receive email alerts for new inquiries'}
                    {key === 'dataRetention' && 'Keep conversation data for 90 days'}
                    {key === 'maintenanceMode' && 'Put website in maintenance mode'}
                    {key === 'analyticsTracking' && 'Track website visitor analytics'}
                    {key === 'liveChatWidget' && 'Display AI chat widget on website'}
                  </p>
                </div>
                <button
                  onClick={() => handleBooleanToggle('general', key)}
                  disabled={!isEditing}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    (isEditing ? editedSettings : settings).general[key] ? 'bg-green-500' : 'bg-gray-300'
                  } ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      (isEditing ? editedSettings : settings).general[key] ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Configuration */}
      {activeSettingsTab === 'ai' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">AI Configuration</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Model Selection</label>
              <select
                value={(isEditing ? editedSettings : settings).ai.selectedAI}
                onChange={(e) => handleInputChange('ai', 'selectedAI', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed pr-8"
              >
                <option value="gpt-4">GPT-4 (OpenAI)</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo (OpenAI)</option>
                <option value="claude-3">Claude 3 (Anthropic)</option>
                <option value="gemini-pro">Gemini Pro (Google)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI API Key</label>
              <input
                type="password"
                value={(isEditing ? editedSettings : settings).ai.openaiApiKey}
                onChange={(e) => handleInputChange('ai', 'openaiApiKey', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="sk-..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anthropic API Key</label>
              <input
                type="password"
                value={(isEditing ? editedSettings : settings).ai.anthropicApiKey}
                onChange={(e) => handleInputChange('ai', 'anthropicApiKey', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="sk-ant-..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Google AI API Key</label>
              <input
                type="password"
                value={(isEditing ? editedSettings : settings).ai.googleApiKey}
                onChange={(e) => handleInputChange('ai', 'googleApiKey', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="AIza..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">AI Context & Instructions</label>
              <textarea
                value={(isEditing ? editedSettings : settings).ai.context}
                onChange={(e) => handleInputChange('ai', 'context', e.target.value)}
                disabled={!isEditing}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter AI context and instructions..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={(isEditing ? editedSettings : settings).ai.temperature}
                  onChange={(e) => handleInputChange('ai', 'temperature', parseFloat(e.target.value))}
                  disabled={!isEditing}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Conservative</span>
                  <span>{(isEditing ? editedSettings : settings).ai.temperature}</span>
                  <span>Creative</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Tokens</label>
                <input
                  type="number"
                  min="100"
                  max="4000"
                  value={(isEditing ? editedSettings : settings).ai.maxTokens}
                  onChange={(e) => handleInputChange('ai', 'maxTokens', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Response Style</label>
              <select
                value={(isEditing ? editedSettings : settings).ai.responseStyle}
                onChange={(e) => handleInputChange('ai', 'responseStyle', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed pr-8"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Auto-collect Customer Info</h4>
                  <p className="text-sm text-gray-600">Automatically ask for customer details</p>
                </div>
                <button
                  onClick={() => handleBooleanToggle('ai', 'autoCollectInfo')}
                  disabled={!isEditing}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    (isEditing ? editedSettings : settings).ai.autoCollectInfo ? 'bg-green-500' : 'bg-gray-300'
                  } ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      (isEditing ? editedSettings : settings).ai.autoCollectInfo ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Follow-up Enabled</h4>
                  <p className="text-sm text-gray-600">Send follow-up messages to prospects</p>
                </div>
                <button
                  onClick={() => handleBooleanToggle('ai', 'followUpEnabled')}
                  disabled={!isEditing}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    (isEditing ? editedSettings : settings).ai.followUpEnabled ? 'bg-green-500' : 'bg-gray-300'
                  } ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      (isEditing ? editedSettings : settings).ai.followUpEnabled ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communications */}
      {activeSettingsTab === 'communications' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Communication Settings</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Business Number</label>
                <input
                  type="text"
                  value={(isEditing ? editedSettings : settings).communications.whatsappNumber}
                  onChange={(e) => handleInputChange('communications', 'whatsappNumber', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Phone Number</label>
                <input
                  type="text"
                  value={(isEditing ? editedSettings : settings).communications.phoneNumber}
                  onChange={(e) => handleInputChange('communications', 'phoneNumber', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                <input
                  type="email"
                  value={(isEditing ? editedSettings : settings).communications.supportEmail}
                  onChange={(e) => handleInputChange('communications', 'supportEmail', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="support@niftysolutions.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sales Email</label>
                <input
                  type="email"
                  value={(isEditing ? editedSettings : settings).communications.salesEmail}
                  onChange={(e) => handleInputChange('communications', 'salesEmail', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="sales@niftysolutions.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
                <input
                  type="text"
                  value={(isEditing ? editedSettings : settings).communications.businessHours}
                  onChange={(e) => handleInputChange('communications', 'businessHours', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="9:00 AM - 6:00 PM EST"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                <select
                  value={(isEditing ? editedSettings : settings).communications.timezone}
                  onChange={(e) => handleInputChange('communications', 'timezone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed pr-8"
                >
                  <option value="EST">Eastern Standard Time</option>
                  <option value="CST">Central Standard Time</option>
                  <option value="MST">Mountain Standard Time</option>
                  <option value="PST">Pacific Standard Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations */}
      {activeSettingsTab === 'integrations' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">External Service Integrations</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Service</label>
                <select
                  value={(isEditing ? editedSettings : settings).integrations.emailService}
                  onChange={(e) => handleInputChange('integrations', 'emailService', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed pr-8"
                >
                  <option value="sendgrid">SendGrid</option>
                  <option value="mailgun">Mailgun</option>
                  <option value="ses">Amazon SES</option>
                  <option value="mailchimp">Mailchimp</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email API Key</label>
                <input
                  type="password"
                  value={(isEditing ? editedSettings : settings).integrations.emailApiKey}
                  onChange={(e) => handleInputChange('integrations', 'emailApiKey', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Enter API key"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp API Key</label>
              <input
                type="password"
                value={(isEditing ? editedSettings : settings).integrations.whatsappApiKey}
                onChange={(e) => handleInputChange('integrations', 'whatsappApiKey', e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter WhatsApp API key"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notion API Key</label>
                <input
                  type="password"
                  value={(isEditing ? editedSettings : settings).integrations.notionApiKey}
                  onChange={(e) => handleInputChange('integrations', 'notionApiKey', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="secret_..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notion Database ID</label>
                <input
                  type="text"
                  value={(isEditing ? editedSettings : settings).integrations.notionDatabaseId}
                  onChange={(e) => handleInputChange('integrations', 'notionDatabaseId', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Database ID from Notion"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeSettingsTab === 'notifications' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {key === 'newInquiry' && 'Receive alerts when new inquiries arrive'}
                    {key === 'dailyReport' && 'Daily summary of inquiries and activities'}
                    {key === 'weeklyReport' && 'Weekly performance and analytics summary'}
                    {key === 'errorAlerts' && 'Notifications for system errors and issues'}
                    {key === 'maintenanceAlerts' && 'Scheduled maintenance and downtime notifications'}
                    {key === 'systemUpdates' && 'Notifications about system updates and new features'}
                  </p>
                </div>
                <button
                  onClick={() => handleBooleanToggle('notifications', key)}
                  disabled={!isEditing}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    (isEditing ? editedSettings : settings).notifications[key] ? 'bg-green-500' : 'bg-gray-300'
                  } ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      (isEditing ? editedSettings : settings).notifications[key] ? 'right-0.5' : 'left-0.5'
                    }`}
                  ></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Settings */}
      {activeSettingsTab === 'security' && (
        <div className="space-y-6">
          {/* Change Credentials */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Login Credentials</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={credentials.currentPassword}
                  onChange={(e) => setCredentials({ ...credentials, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Username</label>
                  <input
                    type="text"
                    value={credentials.newUsername}
                    onChange={(e) => setCredentials({ ...credentials, newUsername: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter new username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={credentials.newPassword}
                    onChange={(e) => setCredentials({ ...credentials, newPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={credentials.confirmPassword}
                  onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={handleUpdateCredentials}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
              >
                <i className="ri-key-line mr-2"></i>Update Credentials
              </button>
            </div>
          </div>

          {/* Security Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
                <input
                  type="number"
                  min="1"
                  max="168"
                  value={(isEditing ? editedSettings : settings).security?.sessionTimeout || 24}
                  onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                <input
                  type="number"
                  min="3"
                  max="10"
                  value={(isEditing ? editedSettings : settings).security?.maxLoginAttempts || 5}
                  onChange={(e) => handleInputChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Require Strong Password</h4>
                    <p className="text-sm text-gray-600">Enforce password complexity requirements</p>
                  </div>
                  <button
                    onClick={() => handleBooleanToggle('security', 'requireStrongPassword')}
                    disabled={!isEditing}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      (isEditing ? editedSettings : settings).security?.requireStrongPassword ? 'bg-green-500' : 'bg-gray-300'
                    } ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        (isEditing ? editedSettings : settings).security?.requireStrongPassword ? 'right-0.5' : 'left-0.5'
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">Login Notifications</h4>
                    <p className="text-sm text-gray-600">Receive alerts for admin login attempts</p>
                  </div>
                  <button
                    onClick={() => handleBooleanToggle('security', 'loginNotifications')}
                    disabled={!isEditing}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      (isEditing ? editedSettings : settings).security?.loginNotifications ? 'bg-green-500' : 'bg-gray-300'
                    } ${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        (isEditing ? editedSettings : settings).security?.loginNotifications ? 'right-0.5' : 'left-0.5'
                      }`}
                    ></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Logout from All Devices */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Management</h3>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Logout from All Devices</h4>
                <p className="text-sm text-gray-600">Invalidate all active sessions</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('adminSession');
                  window.location.reload();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap"
              >
                <i className="ri-logout-circle-line mr-2"></i>Logout All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
