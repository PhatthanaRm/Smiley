"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, Users, Award, Leaf } from 'lucide-react'

const BrandStory = () => {
  const stats = [
    { icon: Users, number: '50K+', label: 'Happy Customers', color: 'text-smiley-mango' },
    { icon: Award, number: '100%', label: 'Dentist Approved', color: 'text-smiley-strawberry' },
    { icon: Leaf, number: '100%', label: 'Natural Ingredients', color: 'text-smiley-mint' },
    { icon: Heart, number: '4.8★', label: 'Average Rating', color: 'text-smiley-yuzu' },
  ]

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

  return (
    <section className="py-20 bg-gradient-to-br from-smiley-mint/10 via-smiley-blueberry/10 to-smiley-lavender/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-sunset">Story</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                SMILEY was born from a simple idea: oral care doesn't have to be boring! 
                As parents, we struggled to get our kids excited about brushing their teeth. 
                That's when we decided to create something different.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We combined the expertise of dental professionals with the creativity of flavor scientists 
                to develop toothpaste that kids actually want to use. The result? A collection of 
                delicious, effective, and fun oral care products that make everyone smile.
              </p>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-smiley-mango"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                "To transform daily oral care from a chore into a delightful experience, 
                making healthy smiles accessible to everyone through innovative, fun, and effective products."
              </p>
            </motion.div>

                         {/* CTA Button */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 0.8 }}
               viewport={{ once: true }}
             >
               <Link href="/about">
                 <Button variant="smiley" size="lg" className="group">
                   Learn More About Us
                   <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
             </motion.div>
          </motion.div>

          {/* Right Content - Stats & Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Our Values</h3>
              <div className="grid gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-colors duration-200"
                  >
                    <span className="text-3xl">{value.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section - Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Fun <span className="text-rainbow">Facts</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                fact: "Did you know?",
                detail: "The average person spends 38.5 days of their life brushing their teeth!",
                emoji: "⏰"
              },
              {
                fact: "Flavor Science",
                detail: "Our mango flavor took 47 iterations to perfect the tropical taste!",
                emoji: "🔬"
              },
              {
                fact: "Smile Power",
                detail: "A genuine smile can boost your mood and reduce stress levels!",
                emoji: "😊"
              }
            ].map((item, index) => (
              <motion.div
                key={item.fact}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.fact}</h4>
                <p className="text-gray-600">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandStory








