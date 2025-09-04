"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  Globe, 
  Palette, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Bell,
  Eye,
  EyeOff,
  Upload,
  Trash2
} from 'lucide-react'
import { AdminSettings } from '@/lib/admin-types'

export default function AdminSettings() {
  const [settings, setSettings] = useState<AdminSettings>({
    id: '1',
    siteName: 'SMILEY',
    siteDescription: 'Premium oral care products with a smile',
    logo: '',
    favicon: '',
    primaryColor: '#f97316',
    secondaryColor: '#ec4899',
    currency: 'USD',
    currencySymbol: '$',
    timezone: 'UTC',
    language: 'en',
    email: 'hello@smiley.com',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: ''
    },
    seo: {
      title: 'SMILEY - Premium Oral Care',
      description: 'Discover our premium oral care products designed to keep you smiling',
      keywords: ['oral care', 'toothpaste', 'toothbrush', 'dental hygiene']
    },
    maintenance: false,
    maintenanceMessage: 'We are currently performing maintenance. Please check back soon.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      // This would typically fetch from your API
      setLoading(false)
    } catch (error) {
      console.error('Error loading settings:', error)
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // API call to save settings
      const updatedSettings = { ...settings, updatedAt: new Date().toISOString() }
      setSettings(updatedSettings)
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Globe },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'contact', name: 'Contact', icon: Mail },
    { id: 'social', name: 'Social Media', icon: Bell },
    { id: 'seo', name: 'SEO', icon: Eye },
    { id: 'maintenance', name: 'Maintenance', icon: Shield }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        <div className="bg-white rounded-lg shadow animate-pulse p-6">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your store configuration and preferences
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      General Settings
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Site Name *
                        </label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <select
                          value={settings.currency}
                          onChange={(e) => setSettings({...settings, currency: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="THB">THB - Thai Baht</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Site Description
                        </label>
                        <textarea
                          rows={3}
                          value={settings.siteDescription}
                          onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Timezone
                        </label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Chicago">Central Time</option>
                          <option value="America/Denver">Mountain Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                          <option value="Asia/Bangkok">Bangkok</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Language
                        </label>
                        <select
                          value={settings.language}
                          onChange={(e) => setSettings({...settings, language: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="th">Thai</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Appearance Settings
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Primary Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={settings.primaryColor}
                            onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                            className="h-10 w-20 border border-gray-300 rounded-md"
                          />
                          <input
                            type="text"
                            value={settings.primaryColor}
                            onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Secondary Color
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={settings.secondaryColor}
                            onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                            className="h-10 w-20 border border-gray-300 rounded-md"
                          />
                          <input
                            type="text"
                            value={settings.secondaryColor}
                            onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Logo URL
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="url"
                            value={settings.logo}
                            onChange={(e) => setSettings({...settings, logo: e.target.value})}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="https://example.com/logo.png"
                          />
                          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                        {settings.logo && (
                          <div className="mt-2">
                            <img src={settings.logo} alt="Logo preview" className="h-16 w-auto" />
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Favicon URL
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="url"
                            value={settings.favicon}
                            onChange={(e) => setSettings({...settings, favicon: e.target.value})}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="https://example.com/favicon.ico"
                          />
                          <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({...settings, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={settings.phone}
                          onChange={(e) => setSettings({...settings, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          value={settings.address.street}
                          onChange={(e) => setSettings({...settings, address: {...settings.address, street: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={settings.address.city}
                          onChange={(e) => setSettings({...settings, address: {...settings.address, city: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={settings.address.state}
                          onChange={(e) => setSettings({...settings, address: {...settings.address, state: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP/Postal Code
                        </label>
                        <input
                          type="text"
                          value={settings.address.zipCode}
                          onChange={(e) => setSettings({...settings, address: {...settings.address, zipCode: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          value={settings.address.country}
                          onChange={(e) => setSettings({...settings, address: {...settings.address, country: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="United States">United States</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Social Media Links
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Facebook
                        </label>
                        <input
                          type="url"
                          value={settings.socialMedia.facebook}
                          onChange={(e) => setSettings({...settings, socialMedia: {...settings.socialMedia, facebook: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="https://facebook.com/yourpage"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instagram
                        </label>
                        <input
                          type="url"
                          value={settings.socialMedia.instagram}
                          onChange={(e) => setSettings({...settings, socialMedia: {...settings.socialMedia, instagram: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="https://instagram.com/yourpage"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Twitter
                        </label>
                        <input
                          type="url"
                          value={settings.socialMedia.twitter}
                          onChange={(e) => setSettings({...settings, socialMedia: {...settings.socialMedia, twitter: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="https://twitter.com/yourpage"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          YouTube
                        </label>
                        <input
                          type="url"
                          value={settings.socialMedia.youtube}
                          onChange={(e) => setSettings({...settings, socialMedia: {...settings.socialMedia, youtube: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="https://youtube.com/yourchannel"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      SEO Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Title
                        </label>
                        <input
                          type="text"
                          value={settings.seo.title}
                          onChange={(e) => setSettings({...settings, seo: {...settings.seo, title: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          maxLength={60}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {settings.seo.title.length}/60 characters
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Description
                        </label>
                        <textarea
                          rows={3}
                          value={settings.seo.description}
                          onChange={(e) => setSettings({...settings, seo: {...settings.seo, description: e.target.value}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          maxLength={160}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {settings.seo.description.length}/160 characters
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Keywords (comma separated)
                        </label>
                        <input
                          type="text"
                          value={settings.seo.keywords.join(', ')}
                          onChange={(e) => setSettings({...settings, seo: {...settings.seo, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)}})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="oral care, toothpaste, dental hygiene"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'maintenance' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Maintenance Mode
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.maintenance}
                          onChange={(e) => setSettings({...settings, maintenance: e.target.checked})}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          Enable maintenance mode
                        </label>
                      </div>
                      {settings.maintenance && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Maintenance Message
                          </label>
                          <textarea
                            rows={4}
                            value={settings.maintenanceMessage}
                            onChange={(e) => setSettings({...settings, maintenanceMessage: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="We are currently performing maintenance. Please check back soon."
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
