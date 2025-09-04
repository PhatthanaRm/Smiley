"use client"

import { motion } from 'framer-motion'
import { Heart, Users, Award, Leaf, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  const values = [
    {
      icon: '🌱',
      title: 'Natural & Safe',
      description: 'We use only the finest natural ingredients, ensuring your family\'s safety comes first.'
    },
    {
      icon: '😊',
      title: 'Fun & Engaging',
      description: 'Oral care should be enjoyable! Our playful flavors make brushing a daily delight.'
    },
    {
      icon: '🦷',
      title: 'Dentist Approved',
      description: 'Every product is tested and approved by dental professionals for effectiveness.'
    },
    {
      icon: '🌍',
      title: 'Eco-Friendly',
      description: 'Committed to sustainability with recyclable packaging and eco-conscious practices.'
    }
  ]

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Dental Officer',
      image: '👩‍⚕️',
      description: 'Board-certified pediatric dentist with 15 years of experience.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Flavor Scientist',
      image: '👨‍🔬',
      description: 'Former food scientist who creates our amazing flavor profiles.'
    },
    {
      name: 'Emily Johnson',
      role: 'Founder & CEO',
      image: '👩‍💼',
      description: 'Mom of three who started SMILEY to make oral care fun for kids.'
    }
  ]

  return (
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-sunset">SMILEY</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to transform daily oral care from a chore into a delightful experience, 
            making healthy smiles accessible to everyone through innovative, fun, and effective products.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  SMILEY was born from a simple idea: oral care doesn't have to be boring! 
                  As parents, we struggled to get our kids excited about brushing their teeth. 
                  That's when we decided to create something different.
                </p>
                <p>
                  We combined the expertise of dental professionals with the creativity of flavor scientists 
                  to develop toothpaste that kids actually want to use. The result? A collection of 
                  delicious, effective, and fun oral care products that make everyone smile.
                </p>
                <p>
                  Today, we're proud to serve thousands of families worldwide, helping them 
                  establish healthy oral care habits that last a lifetime.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-smiely-mango/10 via-smiely-strawberry/10 to-smiely-yuzu/10 p-8 rounded-3xl">
              <div className="text-6xl mb-4">😊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                "To transform daily oral care from a chore into a delightful experience, 
                making healthy smiles accessible to everyone through innovative, fun, and effective products."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-smiely-mango font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-br from-smiely-mint/10 via-smiely-blueberry/10 to-smiely-lavender/10 p-12 rounded-3xl"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-smiely-mango mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-smiely-strawberry mb-2">100%</div>
              <div className="text-gray-600">Dentist Approved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-smiely-yuzu mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-smiely-mint mb-2">100%</div>
              <div className="text-gray-600">Natural Ingredients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}





