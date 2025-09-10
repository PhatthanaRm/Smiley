"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/components/auth-provider'
import { Mail, Lock, User, ShoppingBag, Heart, Settings, LogOut, ArrowRight, CheckCircle, Star, Package, CreditCard, Phone, Globe, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function AccountPage() {
  const { user, loading, signingIn, signIn, signUp, signOut } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('+66')
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false)
  const [emailSuggestions] = useState([
    '@gmail.com',
    '@hotmail.com',
    '@yahoo.com',
    '@outlook.com',
    '@icloud.com',
    '@live.com',
    '@msn.com',
    '@aol.com'
  ])
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null)

  // Country phone number length mapping
  const countryPhoneLengths: { [key: string]: number } = {
    '+376': 6,   // Andorra
    '+971': 9,   // UAE
    '+93': 9,    // Afghanistan
    '+355': 9,   // Albania
    '+374': 8,   // Armenia
    '+297': 7,   // Aruba
    '+61': 9,    // Australia (10 digits total, 9 after removing 0)
    '+43': 10,   // Austria
    '+994': 9,   // Azerbaijan
    '+1': 10,    // USA/Canada/Bahamas/Barbados/Bermuda/Dominica/Dominican Republic/Cayman Islands/Jamaica/Montserrat/Northern Mariana Islands/Puerto Rico/St. Kitts & Nevis/St. Lucia/St. Vincent/Turks & Caicos/US Virgin Islands/Virgin Islands/Guam/Grenada
    '+973': 8,   // Bahrain
    '+880': 10,  // Bangladesh
    '+375': 9,   // Belarus
    '+32': 9,    // Belgium
    '+501': 7,   // Belize
    '+229': 8,   // Benin
    '+975': 8,   // Bhutan
    '+591': 8,   // Bolivia
    '+387': 8,   // Bosnia
    '+267': 7,   // Botswana
    '+55': 11,   // Brazil
    '+246': 7,   // British Indian Ocean
    '+673': 7,   // Brunei
    '+359': 9,   // Bulgaria
    '+226': 8,   // Burkina Faso
    '+257': 8,   // Burundi
    '+855': 9,   // Cambodia
    '+237': 9,   // Cameroon
    '+238': 7,   // Cape Verde
    '+236': 8,   // Central African Republic
    '+235': 8,   // Chad
    '+56': 9,    // Chile
    '+86': 11,   // China (12 digits total, 11 after removing 0)
    '+57': 10,   // Colombia
    '+269': 7,   // Comoros
    '+242': 9,   // Congo
    '+243': 9,   // DR Congo
    '+682': 5,   // Cook Islands
    '+506': 8,   // Costa Rica
    '+225': 10,  // Ivory Coast
    '+385': 9,   // Croatia
    '+53': 8,    // Cuba
    '+357': 8,   // Cyprus
    '+420': 9,   // Czech Republic
    '+45': 8,    // Denmark
    '+253': 8,   // Djibouti
    '+593': 9,   // Ecuador
    '+20': 10,   // Egypt
    '+503': 8,   // El Salvador
    '+240': 9,   // Equatorial Guinea
    '+291': 7,   // Eritrea
    '+372': 8,   // Estonia
    '+251': 9,   // Ethiopia
    '+298': 6,   // Faroe Islands
    '+679': 7,   // Fiji
    '+358': 9,   // Finland
    '+33': 9,    // France (10 digits total, 9 after removing 0)
    '+594': 9,   // French Guiana
    '+689': 8,   // French Polynesia
    '+241': 8,   // Gabon
    '+220': 7,   // Gambia
    '+995': 9,   // Georgia
    '+49': 10,   // Germany (11 digits total, 10 after removing 0)
    '+233': 9,   // Ghana
    '+350': 8,   // Gibraltar
    '+30': 10,   // Greece
    '+299': 6,   // Greenland
    '+590': 9,   // Guadeloupe
    '+502': 8,   // Guatemala
    '+224': 9,   // Guinea
    '+245': 7,   // Guinea-Bissau
    '+592': 7,   // Guyana
    '+509': 8,   // Haiti
    '+504': 8,   // Honduras
    '+852': 8,   // Hong Kong
    '+36': 9,    // Hungary
    '+354': 7,   // Iceland
    '+91': 10,   // India (11 digits total, 10 after removing 0)
    '+62': 10,   // Indonesia
    '+98': 10,   // Iran
    '+964': 10,  // Iraq
    '+353': 9,   // Ireland
    '+972': 9,   // Israel
    '+39': 10,   // Italy
    '+81': 10,   // Japan (11 digits total, 10 after removing 0)
    '+962': 9,   // Jordan
    '+7': 10,    // Kazakhstan/Russia
    '+254': 9,   // Kenya
    '+686': 8,   // Kiribati
    '+850': 10,  // North Korea
    '+82': 10,   // South Korea (11 digits total, 10 after removing 0)
    '+965': 8,   // Kuwait
    '+996': 9,   // Kyrgyzstan
    '+856': 10,  // Laos
    '+371': 8,   // Latvia
    '+961': 8,   // Lebanon
    '+266': 8,   // Lesotho
    '+231': 8,   // Liberia
    '+218': 10,  // Libya
    '+423': 7,   // Liechtenstein
    '+370': 8,   // Lithuania
    '+352': 9,   // Luxembourg
    '+853': 8,   // Macau
    '+389': 9,   // Macedonia
    '+261': 9,   // Madagascar
    '+265': 9,   // Malawi
    '+60': 9,    // Malaysia
    '+960': 7,   // Maldives
    '+223': 8,   // Mali
    '+356': 8,   // Malta
    '+692': 7,   // Marshall Islands
    '+596': 9,   // Martinique
    '+222': 8,   // Mauritania
    '+230': 7,   // Mauritius
    '+262': 9,   // Mayotte/Réunion
    '+52': 10,   // Mexico
    '+691': 7,   // Micronesia
    '+373': 8,   // Moldova
    '+377': 8,   // Monaco
    '+976': 8,   // Mongolia
    '+212': 9,   // Morocco
    '+258': 9,   // Mozambique
    '+95': 9,    // Myanmar
    '+264': 9,   // Namibia
    '+674': 7,   // Nauru
    '+977': 10,  // Nepal
    '+31': 9,    // Netherlands
    '+599': 7,   // Netherlands Antilles
    '+687': 6,   // New Caledonia
    '+64': 9,    // New Zealand
    '+505': 8,   // Nicaragua
    '+227': 8,   // Niger
    '+234': 10,  // Nigeria
    '+683': 4,   // Niue
    '+672': 5,   // Norfolk Island
    '+47': 8,    // Norway
    '+968': 8,   // Oman
    '+92': 10,   // Pakistan
    '+680': 7,   // Palau
    '+970': 9,   // Palestine
    '+507': 8,   // Panama
    '+675': 8,   // Papua New Guinea
    '+595': 9,   // Paraguay
    '+51': 9,    // Peru
    '+63': 10,   // Philippines
    '+48': 9,    // Poland
    '+351': 9,   // Portugal
    '+974': 8,   // Qatar
    '+40': 9,    // Romania
    '+250': 9,   // Rwanda
    '+290': 4,   // St. Helena
    '+508': 6,   // St. Pierre & Miquelon
    '+685': 7,   // Samoa
    '+378': 10,  // San Marino
    '+239': 7,   // São Tomé
    '+966': 9,   // Saudi Arabia
    '+221': 9,   // Senegal
    '+381': 9,   // Serbia
    '+248': 7,   // Seychelles
    '+232': 8,   // Sierra Leone
    '+65': 8,    // Singapore
    '+421': 9,   // Slovakia
    '+386': 8,   // Slovenia
    '+677': 7,   // Solomon Islands
    '+252': 8,   // Somalia
    '+27': 9,    // South Africa
    '+34': 9,    // Spain
    '+94': 9,    // Sri Lanka
    '+249': 9,   // Sudan
    '+597': 7,   // Suriname
    '+268': 8,   // Swaziland
    '+46': 9,    // Sweden
    '+41': 9,    // Switzerland
    '+963': 9,   // Syria
    '+886': 9,   // Taiwan
    '+992': 9,   // Tajikistan
    '+255': 9,   // Tanzania
    '+66': 9,    // Thailand
    '+228': 8,   // Togo
    '+690': 4,   // Tokelau
    '+676': 7,   // Tonga
    '+216': 8,   // Tunisia
    '+90': 10,   // Turkey
    '+993': 8,   // Turkmenistan
    '+688': 6,   // Tuvalu
    '+256': 9,   // Uganda
    '+380': 9,   // Ukraine
    '+44': 10,   // UK (11 digits total, 10 after removing 0)
    '+598': 8,   // Uruguay
    '+998': 9,   // Uzbekistan
    '+678': 7,   // Vanuatu
    '+58': 10,   // Venezuela
    '+84': 9,    // Vietnam
    '+967': 9,   // Yemen
    '+260': 9,   // Zambia
    '+263': 9,   // Zimbabwe
  }

  // Validate phone number based on country
  const validatePhoneNumber = (phone: string, country: string) => {
    const expectedLength = countryPhoneLengths[country]
    if (!expectedLength) return { isValid: true, message: null }
    
    if (phone.length === 0) return { isValid: true, message: null }
    if (phone.length < expectedLength) return { isValid: false, message: null }
    if (phone.length > expectedLength) return { isValid: false, message: null }
    
    return { isValid: true, message: null }
  }

  // Handle phone number change with validation and formatting
  const handlePhoneNumberChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '')
    const expectedLength = countryPhoneLengths[countryCode]
    
    // Country-specific formatting rules
    let formattedValue = numericValue
    
    // Thailand: Remove leading 0 and add 8 if needed
    if (countryCode === '+66' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // USA/Canada: Remove leading 1 if present
    if (countryCode === '+1' && numericValue.startsWith('1') && numericValue.length > 10) {
      formattedValue = numericValue.substring(1)
    }
    
    // UK: Remove leading 0 if present
    if (countryCode === '+44' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // Australia: Remove leading 0 if present
    if (countryCode === '+61' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // Germany: Remove leading 0 if present
    if (countryCode === '+49' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // France: Remove leading 0 if present
    if (countryCode === '+33' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // Japan: Remove leading 0 if present
    if (countryCode === '+81' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // South Korea: Remove leading 0 if present
    if (countryCode === '+82' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // India: Remove leading 0 if present
    if (countryCode === '+91' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // China: Remove leading 0 if present
    if (countryCode === '+86' && numericValue.startsWith('0')) {
      formattedValue = numericValue.substring(1)
    }
    
    // Limit input to expected length
    const limitedValue = expectedLength ? formattedValue.slice(0, expectedLength) : formattedValue
    
    setPhoneNumber(limitedValue)
    
    // Validate and set error
    const validation = validatePhoneNumber(limitedValue, countryCode)
    setPhoneError(validation.isValid ? null : validation.message)
  }

  // Handle country code change
  const handleCountryCodeChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode)
    setPhoneError(null) // Clear error when country changes
    
    // Re-validate current phone number with new country
    const validation = validatePhoneNumber(phoneNumber, newCountryCode)
    setPhoneError(validation.isValid ? null : validation.message)
  }

  // Handle first name change with auto-capitalization
  const handleFirstNameChange = (value: string) => {
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    setFirstName(capitalized)
  }

  // Handle last name change with auto-capitalization
  const handleLastNameChange = (value: string) => {
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    setLastName(capitalized)
  }

  // Handle email change with suggestions
  const handleEmailChange = (value: string) => {
    setEmail(value)
    // Show suggestions when user starts typing (has at least 1 character)
    setShowEmailSuggestions(value.length > 0 && !value.includes('@'))
  }

  // Handle email suggestion selection
  const handleEmailSuggestionClick = (suggestion: string) => {
    const emailParts = email.split('@')
    const username = emailParts[0]
    setEmail(username + suggestion)
    setShowEmailSuggestions(false)
  }

  // Handle confirm password change with validation
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    if (value.length > 0) {
      setPasswordMatch(password === value)
    } else {
      setPasswordMatch(null)
    }
  }

  // Handle password change and re-check match
  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (confirmPassword.length > 0) {
      setPasswordMatch(confirmPassword === value)
    }
  }


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const { error } = await signIn(email, password)
    if (error) {
      setError(error)
    } else {
      setSuccess('Welcome back! 🎉')
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setPhoneError(null)
    
    // Check for missing required fields
    const missingFields = []
    if (!firstName.trim()) missingFields.push('First Name')
    if (!lastName.trim()) missingFields.push('Last Name')
    if (!email.trim()) missingFields.push('Email')
    if (!password.trim()) missingFields.push('Password')
    if (!confirmPassword.trim()) missingFields.push('Confirm Password')
    if (!phoneNumber.trim()) missingFields.push('Phone Number')
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }
    
    // Validate phone number before submission
    if (phoneNumber) {
      const validation = validatePhoneNumber(phoneNumber, countryCode)
      if (!validation.isValid) {
        setError('Phone number is invalid. Please check the number of digits matches the selected country.')
        return
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Invalid email format. Please check and try again.')
      return
    }
    
    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    
    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check and try again.')
      return
    }
    
    const fullName = `${firstName} ${lastName}`.trim()
    const { error, message } = await signUp(email, password, fullName)
    if (error) {
      setError(error)
    } else if (message) {
      setSuccess(message)
      // Redirect to OTP verification page after successful signup
      setTimeout(() => {
        router.push('/auth/verify-otp')
      }, 2000)
    } else {
      setSuccess('Account created successfully! Welcome to SMILEY! 🎉')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50">
      <Header />
      <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            My <span className="text-rainbow">Account</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {!user ? 'Sign in to your account or create a new one to start your SMILEY journey!' : 'Welcome back! Manage your account, orders, and preferences.'}
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md mx-auto text-center"
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">😊</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Loading...</h2>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : !user ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md mx-auto"
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-8">
                {/* Toggle between Sign In and Sign Up */}
                <div className="flex bg-gray-100 rounded-full p-1 mb-8">
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                      !isSignUp 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                      isSignUp 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-6">
                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => handleFirstNameChange(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          required={isSignUp}
                        />
                      </div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => handleLastNameChange(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                          required={isSignUp}
                        />
                      </div>
                    </motion.div>
                  )}

                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {/* Phone Number */}
                      <div className="flex gap-2">
                        <div className="relative w-24">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={countryCode}
                            onChange={(e) => handleCountryCodeChange(e.target.value)}
                            placeholder="+66"
                            className="w-full pl-10 pr-2 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
                          />
                          <select
                            value={countryCode}
                            onChange={(e) => handleCountryCodeChange(e.target.value)}
                            className="absolute inset-0 w-full pl-10 pr-2 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 appearance-none bg-transparent opacity-0 cursor-pointer"
                          >
                            <option value="+376">🇦🇩 +376 (Andorra)</option>
                            <option value="+971">🇦🇪 +971 (UAE)</option>
                            <option value="+93">🇦🇫 +93 (Afghanistan)</option>
                            <option value="+355">🇦🇱 +355 (Albania)</option>
                            <option value="+374">🇦🇲 +374 (Armenia)</option>
                            <option value="+297">🇦🇼 +297 (Aruba)</option>
                            <option value="+61">🇦🇺 +61 (Australia)</option>
                            <option value="+43">🇦🇹 +43 (Austria)</option>
                            <option value="+994">🇦🇿 +994 (Azerbaijan)</option>
                            <option value="+1">🇧🇸 +1 (Bahamas)</option>
                            <option value="+973">🇧🇭 +973 (Bahrain)</option>
                            <option value="+880">🇧🇩 +880 (Bangladesh)</option>
                            <option value="+1">🇧🇧 +1 (Barbados)</option>
                            <option value="+375">🇧🇾 +375 (Belarus)</option>
                            <option value="+32">🇧🇪 +32 (Belgium)</option>
                            <option value="+501">🇧🇿 +501 (Belize)</option>
                            <option value="+229">🇧🇯 +229 (Benin)</option>
                            <option value="+1">🇧🇲 +1 (Bermuda)</option>
                            <option value="+975">🇧🇹 +975 (Bhutan)</option>
                            <option value="+591">🇧🇴 +591 (Bolivia)</option>
                            <option value="+387">🇧🇦 +387 (Bosnia)</option>
                            <option value="+267">🇧🇼 +267 (Botswana)</option>
                            <option value="+55">🇧🇷 +55 (Brazil)</option>
                            <option value="+246">🇮🇴 +246 (British Indian Ocean)</option>
                            <option value="+673">🇧🇳 +673 (Brunei)</option>
                            <option value="+359">🇧🇬 +359 (Bulgaria)</option>
                            <option value="+226">🇧🇫 +226 (Burkina Faso)</option>
                            <option value="+257">🇧🇮 +257 (Burundi)</option>
                            <option value="+855">🇰🇭 +855 (Cambodia)</option>
                            <option value="+237">🇨🇲 +237 (Cameroon)</option>
                            <option value="+1">🇨🇦 +1 (Canada)</option>
                            <option value="+238">🇨🇻 +238 (Cape Verde)</option>
                            <option value="+1">🇰🇾 +1 (Cayman Islands)</option>
                            <option value="+236">🇨🇫 +236 (Central African Republic)</option>
                            <option value="+235">🇹🇩 +235 (Chad)</option>
                            <option value="+56">🇨🇱 +56 (Chile)</option>
                            <option value="+86">🇨🇳 +86 (China)</option>
                            <option value="+57">🇨🇴 +57 (Colombia)</option>
                            <option value="+269">🇰🇲 +269 (Comoros)</option>
                            <option value="+242">🇨🇬 +242 (Congo)</option>
                            <option value="+243">🇨🇩 +243 (DR Congo)</option>
                            <option value="+682">🇨🇰 +682 (Cook Islands)</option>
                            <option value="+506">🇨🇷 +506 (Costa Rica)</option>
                            <option value="+225">🇨🇮 +225 (Ivory Coast)</option>
                            <option value="+385">🇭🇷 +385 (Croatia)</option>
                            <option value="+53">🇨🇺 +53 (Cuba)</option>
                            <option value="+357">🇨🇾 +357 (Cyprus)</option>
                            <option value="+420">🇨🇿 +420 (Czech Republic)</option>
                            <option value="+45">🇩🇰 +45 (Denmark)</option>
                            <option value="+253">🇩🇯 +253 (Djibouti)</option>
                            <option value="+1">🇩🇲 +1 (Dominica)</option>
                            <option value="+1">🇩🇴 +1 (Dominican Republic)</option>
                            <option value="+593">🇪🇨 +593 (Ecuador)</option>
                            <option value="+20">🇪🇬 +20 (Egypt)</option>
                            <option value="+503">🇸🇻 +503 (El Salvador)</option>
                            <option value="+240">🇬🇶 +240 (Equatorial Guinea)</option>
                            <option value="+291">🇪🇷 +291 (Eritrea)</option>
                            <option value="+372">🇪🇪 +372 (Estonia)</option>
                            <option value="+251">🇪🇹 +251 (Ethiopia)</option>
                            <option value="+298">🇫🇴 +298 (Faroe Islands)</option>
                            <option value="+679">🇫🇯 +679 (Fiji)</option>
                            <option value="+358">🇫🇮 +358 (Finland)</option>
                            <option value="+33">🇫🇷 +33 (France)</option>
                            <option value="+594">🇬🇫 +594 (French Guiana)</option>
                            <option value="+689">🇵🇫 +689 (French Polynesia)</option>
                            <option value="+241">🇬🇦 +241 (Gabon)</option>
                            <option value="+220">🇬🇲 +220 (Gambia)</option>
                            <option value="+995">🇬🇪 +995 (Georgia)</option>
                            <option value="+49">🇩🇪 +49 (Germany)</option>
                            <option value="+233">🇬🇭 +233 (Ghana)</option>
                            <option value="+350">🇬🇮 +350 (Gibraltar)</option>
                            <option value="+30">🇬🇷 +30 (Greece)</option>
                            <option value="+299">🇬🇱 +299 (Greenland)</option>
                            <option value="+1">🇬🇩 +1 (Grenada)</option>
                            <option value="+590">🇬🇵 +590 (Guadeloupe)</option>
                            <option value="+1">🇬🇺 +1 (Guam)</option>
                            <option value="+502">🇬🇹 +502 (Guatemala)</option>
                            <option value="+224">🇬🇳 +224 (Guinea)</option>
                            <option value="+245">🇬🇼 +245 (Guinea-Bissau)</option>
                            <option value="+592">🇬🇾 +592 (Guyana)</option>
                            <option value="+509">🇭🇹 +509 (Haiti)</option>
                            <option value="+504">🇭🇳 +504 (Honduras)</option>
                            <option value="+852">🇭🇰 +852 (Hong Kong)</option>
                            <option value="+36">🇭🇺 +36 (Hungary)</option>
                            <option value="+354">🇮🇸 +354 (Iceland)</option>
                            <option value="+91">🇮🇳 +91 (India)</option>
                            <option value="+62">🇮🇩 +62 (Indonesia)</option>
                            <option value="+98">🇮🇷 +98 (Iran)</option>
                            <option value="+964">🇮🇶 +964 (Iraq)</option>
                            <option value="+353">🇮🇪 +353 (Ireland)</option>
                            <option value="+972">🇮🇱 +972 (Israel)</option>
                            <option value="+39">🇮🇹 +39 (Italy)</option>
                            <option value="+1">🇯🇲 +1 (Jamaica)</option>
                            <option value="+81">🇯🇵 +81 (Japan)</option>
                            <option value="+962">🇯🇴 +962 (Jordan)</option>
                            <option value="+7">🇰🇿 +7 (Kazakhstan)</option>
                            <option value="+254">🇰🇪 +254 (Kenya)</option>
                            <option value="+686">🇰🇮 +686 (Kiribati)</option>
                            <option value="+850">🇰🇵 +850 (North Korea)</option>
                            <option value="+82">🇰🇷 +82 (South Korea)</option>
                            <option value="+965">🇰🇼 +965 (Kuwait)</option>
                            <option value="+996">🇰🇬 +996 (Kyrgyzstan)</option>
                            <option value="+856">🇱🇦 +856 (Laos)</option>
                            <option value="+371">🇱🇻 +371 (Latvia)</option>
                            <option value="+961">🇱🇧 +961 (Lebanon)</option>
                            <option value="+266">🇱🇸 +266 (Lesotho)</option>
                            <option value="+231">🇱🇷 +231 (Liberia)</option>
                            <option value="+218">🇱🇾 +218 (Libya)</option>
                            <option value="+423">🇱🇮 +423 (Liechtenstein)</option>
                            <option value="+370">🇱🇹 +370 (Lithuania)</option>
                            <option value="+352">🇱🇺 +352 (Luxembourg)</option>
                            <option value="+853">🇲🇴 +853 (Macau)</option>
                            <option value="+389">🇲🇰 +389 (Macedonia)</option>
                            <option value="+261">🇲🇬 +261 (Madagascar)</option>
                            <option value="+265">🇲🇼 +265 (Malawi)</option>
                            <option value="+60">🇲🇾 +60 (Malaysia)</option>
                            <option value="+960">🇲🇻 +960 (Maldives)</option>
                            <option value="+223">🇲🇱 +223 (Mali)</option>
                            <option value="+356">🇲🇹 +356 (Malta)</option>
                            <option value="+692">🇲🇭 +692 (Marshall Islands)</option>
                            <option value="+596">🇲🇶 +596 (Martinique)</option>
                            <option value="+222">🇲🇷 +222 (Mauritania)</option>
                            <option value="+230">🇲🇺 +230 (Mauritius)</option>
                            <option value="+262">🇾🇹 +262 (Mayotte)</option>
                            <option value="+52">🇲🇽 +52 (Mexico)</option>
                            <option value="+691">🇫🇲 +691 (Micronesia)</option>
                            <option value="+373">🇲🇩 +373 (Moldova)</option>
                            <option value="+377">🇲🇨 +377 (Monaco)</option>
                            <option value="+976">🇲🇳 +976 (Mongolia)</option>
                            <option value="+1">🇲🇸 +1 (Montserrat)</option>
                            <option value="+212">🇲🇦 +212 (Morocco)</option>
                            <option value="+258">🇲🇿 +258 (Mozambique)</option>
                            <option value="+95">🇲🇲 +95 (Myanmar)</option>
                            <option value="+264">🇳🇦 +264 (Namibia)</option>
                            <option value="+674">🇳🇷 +674 (Nauru)</option>
                            <option value="+977">🇳🇵 +977 (Nepal)</option>
                            <option value="+31">🇳🇱 +31 (Netherlands)</option>
                            <option value="+599">🇦🇳 +599 (Netherlands Antilles)</option>
                            <option value="+687">🇳🇨 +687 (New Caledonia)</option>
                            <option value="+64">🇳🇿 +64 (New Zealand)</option>
                            <option value="+505">🇳🇮 +505 (Nicaragua)</option>
                            <option value="+227">🇳🇪 +227 (Niger)</option>
                            <option value="+234">🇳🇬 +234 (Nigeria)</option>
                            <option value="+683">🇳🇺 +683 (Niue)</option>
                            <option value="+672">🇳🇫 +672 (Norfolk Island)</option>
                            <option value="+1">🇲🇵 +1 (Northern Mariana Islands)</option>
                            <option value="+47">🇳🇴 +47 (Norway)</option>
                            <option value="+968">🇴🇲 +968 (Oman)</option>
                            <option value="+92">🇵🇰 +92 (Pakistan)</option>
                            <option value="+680">🇵🇼 +680 (Palau)</option>
                            <option value="+970">🇵🇸 +970 (Palestine)</option>
                            <option value="+507">🇵🇦 +507 (Panama)</option>
                            <option value="+675">🇵🇬 +675 (Papua New Guinea)</option>
                            <option value="+595">🇵🇾 +595 (Paraguay)</option>
                            <option value="+51">🇵🇪 +51 (Peru)</option>
                            <option value="+63">🇵🇭 +63 (Philippines)</option>
                            <option value="+48">🇵🇱 +48 (Poland)</option>
                            <option value="+351">🇵🇹 +351 (Portugal)</option>
                            <option value="+1">🇵🇷 +1 (Puerto Rico)</option>
                            <option value="+974">🇶🇦 +974 (Qatar)</option>
                            <option value="+262">🇷🇪 +262 (Réunion)</option>
                            <option value="+40">🇷🇴 +40 (Romania)</option>
                            <option value="+7">🇷🇺 +7 (Russia)</option>
                            <option value="+250">🇷🇼 +250 (Rwanda)</option>
                            <option value="+290">🇸🇭 +290 (St. Helena)</option>
                            <option value="+1">🇰🇳 +1 (St. Kitts & Nevis)</option>
                            <option value="+1">🇱🇨 +1 (St. Lucia)</option>
                            <option value="+508">🇵🇲 +508 (St. Pierre & Miquelon)</option>
                            <option value="+1">🇻🇨 +1 (St. Vincent)</option>
                            <option value="+685">🇼🇸 +685 (Samoa)</option>
                            <option value="+378">🇸🇲 +378 (San Marino)</option>
                            <option value="+239">🇸🇹 +239 (São Tomé)</option>
                            <option value="+966">🇸🇦 +966 (Saudi Arabia)</option>
                            <option value="+221">🇸🇳 +221 (Senegal)</option>
                            <option value="+381">🇷🇸 +381 (Serbia)</option>
                            <option value="+248">🇸🇨 +248 (Seychelles)</option>
                            <option value="+232">🇸🇱 +232 (Sierra Leone)</option>
                            <option value="+65">🇸🇬 +65 (Singapore)</option>
                            <option value="+421">🇸🇰 +421 (Slovakia)</option>
                            <option value="+386">🇸🇮 +386 (Slovenia)</option>
                            <option value="+677">🇸🇧 +677 (Solomon Islands)</option>
                            <option value="+252">🇸🇴 +252 (Somalia)</option>
                            <option value="+27">🇿🇦 +27 (South Africa)</option>
                            <option value="+34">🇪🇸 +34 (Spain)</option>
                            <option value="+94">🇱🇰 +94 (Sri Lanka)</option>
                            <option value="+249">🇸🇩 +249 (Sudan)</option>
                            <option value="+597">🇸🇷 +597 (Suriname)</option>
                            <option value="+268">🇸🇿 +268 (Swaziland)</option>
                            <option value="+46">🇸🇪 +46 (Sweden)</option>
                            <option value="+41">🇨🇭 +41 (Switzerland)</option>
                            <option value="+963">🇸🇾 +963 (Syria)</option>
                            <option value="+886">🇹🇼 +886 (Taiwan)</option>
                            <option value="+992">🇹🇯 +992 (Tajikistan)</option>
                            <option value="+255">🇹🇿 +255 (Tanzania)</option>
                            <option value="+66">🇹🇭 +66 (Thailand)</option>
                            <option value="+228">🇹🇬 +228 (Togo)</option>
                            <option value="+690">🇹🇰 +690 (Tokelau)</option>
                            <option value="+676">🇹🇴 +676 (Tonga)</option>
                            <option value="+1">🇹🇹 +1 (Trinidad & Tobago)</option>
                            <option value="+216">🇹🇳 +216 (Tunisia)</option>
                            <option value="+90">🇹🇷 +90 (Turkey)</option>
                            <option value="+993">🇹🇲 +993 (Turkmenistan)</option>
                            <option value="+1">🇹🇨 +1 (Turks & Caicos)</option>
                            <option value="+688">🇹🇻 +688 (Tuvalu)</option>
                            <option value="+256">🇺🇬 +256 (Uganda)</option>
                            <option value="+380">🇺🇦 +380 (Ukraine)</option>
                            <option value="+971">🇦🇪 +971 (UAE)</option>
                            <option value="+44">🇬🇧 +44 (UK)</option>
                            <option value="+1">🇺🇸 +1 (USA)</option>
                            <option value="+598">🇺🇾 +598 (Uruguay)</option>
                            <option value="+998">🇺🇿 +998 (Uzbekistan)</option>
                            <option value="+678">🇻🇺 +678 (Vanuatu)</option>
                            <option value="+39">🇻🇦 +39 (Vatican)</option>
                            <option value="+58">🇻🇪 +58 (Venezuela)</option>
                            <option value="+84">🇻🇳 +84 (Vietnam)</option>
                            <option value="+1">🇻🇬 +1 (Virgin Islands)</option>
                            <option value="+1">🇻🇮 +1 (US Virgin Islands)</option>
                            <option value="+681">🇼🇫 +681 (Wallis & Futuna)</option>
                            <option value="+212">🇪🇭 +212 (Western Sahara)</option>
                            <option value="+967">🇾🇪 +967 (Yemen)</option>
                            <option value="+260">🇿🇲 +260 (Zambia)</option>
                            <option value="+263">🇿🇼 +263 (Zimbabwe)</option>
                          </select>
                        </div>
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="tel"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(e.target.value)}
                            className={`w-full pl-10 pr-10 py-3 rounded-full border transition-all duration-200 ${
                              phoneError 
                                ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent' 
                                : phoneNumber.length === countryPhoneLengths[countryCode] && phoneNumber.length > 0
                                ? 'border-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                                : 'border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                            }`}
                            required={isSignUp}
                            maxLength={countryPhoneLengths[countryCode] || undefined}
                          />
                          {phoneNumber.length === countryPhoneLengths[countryCode] && phoneNumber.length > 0 && (
                            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                          )}
                        </div>
                      </div>
                      {phoneError && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-full text-sm"
                        >
                          {phoneError}
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onFocus={() => setShowEmailSuggestions(email.length > 0 && !email.includes('@'))}
                      onBlur={() => setTimeout(() => setShowEmailSuggestions(false), 200)}
                      className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    {showEmailSuggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto"
                      >
                        {emailSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleEmailSuggestionClick(suggestion)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                          >
                            {email.split('@')[0]}{suggestion}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>

                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative"
                    >
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        className={`w-full pl-10 pr-12 py-3 rounded-full border transition-all duration-200 ${
                          passwordMatch === false && confirmPassword.length > 0
                            ? 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'
                            : passwordMatch === true
                            ? 'border-green-300 focus:ring-2 focus:ring-green-500 focus:border-transparent'
                            : 'border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent'
                        }`}
                        required={isSignUp}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        {passwordMatch === true && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {passwordMatch === false && confirmPassword.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-full text-sm"
                    >
                      Passwords do not match
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-full text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-full text-sm flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {success}
                    </motion.div>
                  )}

                  <Button 
                    type="submit" 
                    variant="smiley" 
                    className="w-full py-3 text-lg font-semibold" 
                    disabled={signingIn || loading || (isSignUp && !!phoneError)}
                  >
                    {signingIn ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Signing In...
                      </div>
                    ) : loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Loading...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Benefits */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">Why create an account?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Save your favorite products
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Track your orders
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      Get exclusive offers
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* User Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                      😊
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button
                      variant="smileyOutline"
                      className="w-full justify-start"
                      onClick={async () => {
                        try {
                          await signOut()
                        } catch (error) {
                          setError('Failed to sign out. Please try again.')
                        }
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
                        <p className="text-sm text-gray-600">Track your purchases</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">No orders yet. Start shopping to see your order history here!</p>
                    <Link href="/shop">
                      <Button variant="smileyOutline" size="sm" className="group-hover:bg-orange-500 group-hover:text-white transition-all duration-200">
                        Start Shopping
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Wishlist</h3>
                        <p className="text-sm text-gray-600">Your favorite products</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Save products you love for later purchase!</p>
                    <Link href="/shop">
                      <Button variant="smileyOutline" size="sm" className="group-hover:bg-pink-500 group-hover:text-white transition-all duration-200">
                        Browse Products
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Subscriptions */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mr-4">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Subscriptions</h3>
                      <p className="text-sm text-gray-600">Manage your recurring orders</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">No active subscriptions</p>
                        <p className="text-sm text-gray-600">Start a subscription from any product page</p>
                      </div>
                      <div className="text-2xl">📦</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="smiley"
                      size="sm"
                      onClick={async () => {
                        const res = await fetch('/api/portal', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: user.email }),
                        })
                        const data = await res.json()
                        if (data.url) window.location.href = data.url
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Manage Billing
                    </Button>
                    <Link href="/shop">
                      <Button variant="smileyOutline" size="sm">
                        Browse Products
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
      </div>
      <Footer />
    </main>
  )
}


