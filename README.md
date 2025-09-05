# SMILEY E-commerce Website 🦷✨

A complete, modern e-commerce website for the SMILEY oral care brand built with Next.js, featuring playful fruit-inspired designs, smooth animations, and comprehensive e-commerce functionality.

## 🌟 Features

### Core E-commerce
- **Product Catalog**: Complete product management with categories, filters, and search
- **Shopping Cart**: Full cart functionality with quantity management and promo codes
- **Checkout Process**: Secure checkout with Stripe integration
- **Subscription System**: Recurring orders with subscription management
- **Order Management**: Complete order tracking and history

### Design & UX
- **Playful Brand Identity**: Bright fruit-inspired colors (mango, strawberry, yuzu)
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Accessibility**: WCAG compliant with keyboard navigation

### Content Management
- **Blog System**: Content management for flavor drops and tips
- **Product Pages**: Detailed product information with reviews
- **Newsletter Integration**: Email capture with discount codes
- **SEO Optimized**: Meta tags, structured data, and performance optimized


### Technical Features
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom design system
- **Shadcn/ui**: Beautiful, accessible component library
- **Framer Motion**: Smooth animations and transitions
- **Stripe Integration**: Secure payment processing
- **Supabase Ready**: Database and authentication setup

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account (for payments)
- Supabase account (optional, for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smiley-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your actual values:
   ```env
   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_key
   
   # Supabase (optional)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 User Authentication Setup

### Setting Up User Accounts

1. **Create User Account**
   - Go to `/account` page
   - Sign up with your email address
   - You'll be able to manage your account and orders

2. **Account Features**
   - **Order History**: Track your purchases
   - **Wishlist**: Save favorite products
   - **Subscriptions**: Manage recurring orders
   - **Profile Management**: Update your information

## 📁 Project Structure

```
smiley-ecommerce/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── contact/           # Contact form
│   ├── product/           # Product detail pages
│   ├── shop/              # Product catalog
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Shadcn/ui components
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   ├── hero.tsx          # Homepage hero
│   ├── product-card.tsx  # Product display
│   └── ...
├── lib/                  # Utilities and data
│   ├── data.ts          # Mock product data
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Helper functions
├── hooks/               # Custom React hooks
└── public/              # Static assets
```

## 🛍️ E-commerce Setup

### Adding Products

1. **Update product data** in `lib/data.ts`:
   ```typescript
   export const PRODUCTS: Product[] = [
     {
       id: 'unique-id',
       slug: 'product-slug',
       name: 'Product Name',
       flavor: 'Mango',
       type: 'Toothpaste',
       price: 8.99,
       // ... other properties
     }
   ]
   ```

2. **Product images**: Add emoji or image URLs to the `imageEmoji` or `images` property

3. **Categories**: Update `PRODUCT_TYPES` and `FLAVORS` arrays for filtering

### Stripe Integration

1. **Get Stripe keys** from your [Stripe Dashboard](https://dashboard.stripe.com)

2. **Update environment variables**:
   ```env
   STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   STRIPE_SECRET_KEY=sk_live_your_key
   ```

3. **Configure webhooks** (optional):
   - Add webhook endpoint in Stripe dashboard
   - Update `STRIPE_WEBHOOK_SECRET` in environment

### Subscription System

Products can have subscription options:
```typescript
subscription: {
  price: 7.99,        // Subscription price
  interval: 'monthly' // or 'quarterly'
}
```

## 🎨 Customization

### Brand Colors

Update colors in `tailwind.config.js`:
```javascript
smiley: {
  mango: "#FF8C42",
  strawberry: "#FF6B9D", 
  yuzu: "#FFD700",
  // ... other colors
}
```

### Animations

Customize animations in components using Framer Motion:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Content Management

For production, consider integrating with:
- **Sanity CMS**: For product and blog content
- **Contentful**: Alternative headless CMS
- **Strapi**: Self-hosted CMS option

## 📱 Mobile Optimization

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized images and performance
- Progressive Web App features

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting errors
npm run type-check   # Check TypeScript types
npm run clean        # Clean build artifacts
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **AWS**: EC2 or Amplify deployment

## 📊 Analytics & Monitoring

### Google Analytics
Add your GA4 tracking ID:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Performance Monitoring
- Built-in Next.js analytics
- Web Vitals tracking
- Error monitoring ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub
- **Email**: hello@smiley.com

## 🎉 Acknowledgments

- **Shadcn/ui** for beautiful components
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **Next.js** team for the amazing framework

---

Made with ❤️ for healthy smiles everywhere! 🦷✨