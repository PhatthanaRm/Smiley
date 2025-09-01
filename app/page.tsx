import Header from '@/components/header'
import Hero from '@/components/hero'
import FeaturedProducts from '@/components/featured-products'
import BrandStory from '@/components/brand-story'
import NewsletterSignup from '@/components/newsletter-signup'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProducts />
      <BrandStory />
      <NewsletterSignup />
      <Footer />
    </main>
  )
}








