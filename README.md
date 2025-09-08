# SMILEY E-commerce Website 🦷✨

A complete, modern e-commerce website for the SMILEY oral care brand built with Next.js 14, featuring playful fruit-inspired designs, smooth animations, and comprehensive e-commerce functionality with advanced admin management.

## 🌟 Features

### Core E-commerce
- **Product Catalog**: Complete product management with categories, filters, and search
- **Shopping Cart**: Full cart functionality with quantity management and promo codes
- **Checkout Process**: Secure checkout with Stripe integration
- **Subscription System**: Recurring orders with subscription management
- **Order Management**: Complete order tracking and history
- **Wishlist System**: Save favorite products with user authentication
- **Product Reviews**: Rating and review system for products

### Admin Management System
- **Role-Based Access Control**: Admin and Super Admin roles with granular permissions
- **User Management**: Complete user account management and role assignment
- **Product Management**: Full CRUD operations for products with advanced features
- **Order Management**: Comprehensive order tracking and status updates
- **Analytics Dashboard**: Real-time insights and reporting
- **Content Management**: Blog posts, pages, and marketing content
- **Settings Management**: System configuration and preferences

### Design & UX
- **Playful Brand Identity**: Bright fruit-inspired colors (mango, strawberry, yuzu, blueberry, lavender)
- **Smooth Animations**: Framer Motion powered micro-interactions and page transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Consistent Light Theme**: Clean, bright design optimized for readability
- **Accessibility**: WCAG compliant with keyboard navigation
- **Interactive Elements**: Hover effects, loading states, and feedback animations

### Content Management
- **Blog System**: Content management for flavor drops and oral care tips
- **Product Pages**: Detailed product information with reviews and specifications
- **Newsletter Integration**: Email capture with discount codes and popup management
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Dynamic Content**: Real-time content updates and management

### Authentication & Security
- **User Authentication**: Email/password with OTP verification
- **Admin Authentication**: Secure admin login with session management
- **Role-Based Permissions**: Granular permission system for different user types
- **Session Management**: Secure session handling with automatic refresh
- **Data Protection**: Row-level security and API protection

### Technical Features
- **Next.js 14**: Latest React framework with App Router and Server Components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom design system
- **Shadcn/ui**: Beautiful, accessible component library
- **Framer Motion**: Smooth animations and transitions
- **Stripe Integration**: Secure payment processing with webhooks
- **Supabase**: Complete database and authentication solution
- **Vercel Analytics**: Built-in performance monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stripe account (for payments)
- Supabase account (required for database and authentication)

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
   # Core Application
   NODE_ENV=development
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Supabase (Required)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   STRIPE_SUB_PRICE_ID=price_your_subscription_price_id
   
   # Optional Integrations
   NEXT_PUBLIC_GA_ID=your_google_analytics_id
   NEXT_PUBLIC_CRISP_WEBSITE_ID=your_crisp_website_id
   ```

4. **Set up the database**
   ```bash
   # Run the SQL schema in your Supabase dashboard
   # See supabase-schema.sql for the complete schema
   ```

5. **Create admin user**
   ```bash
   # Use the provided script to create your first admin user
   node scripts/create-admin.js
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication & User Management

### User Authentication

1. **User Registration**
   - Go to `/auth` page or click "Sign Up" in header
   - Sign up with your email address
   - Verify your email with OTP code
   - Access your account dashboard

2. **User Account Features**
   - **Order History**: Track your purchases and order status
   - **Wishlist**: Save favorite products for later
   - **Subscriptions**: Manage recurring orders and delivery schedules
   - **Profile Management**: Update personal information and preferences
   - **Address Book**: Manage shipping and billing addresses

### Admin System Setup

1. **Admin Access**
   - Navigate to `/admin/login`
   - Use admin credentials created during setup
   - Access role-based admin dashboard

2. **Admin Features**
   - **Dashboard**: Overview of sales, orders, and user activity
   - **User Management**: View, edit, and manage user accounts
   - **Product Management**: Add, edit, and manage product catalog
   - **Order Management**: Process orders and update status
   - **Content Management**: Manage blog posts and site content
   - **Analytics**: View detailed reports and insights
   - **Settings**: Configure system preferences and integrations

3. **Role-Based Permissions**
   - **Admin**: Basic management permissions
   - **Super Admin**: Full system access and user management
   - Granular permission system for different features

## 📁 Project Structure

```
smiley-ecommerce/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── account/           # User account dashboard
│   ├── admin/             # Admin management system
│   │   └── products/      # Admin product management
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── cart/          # Shopping cart API
│   │   ├── checkout/      # Checkout processing
│   │   ├── orders/        # Order management
│   │   └── products/      # Product API
│   ├── auth/              # Authentication pages
│   │   ├── callback/      # OAuth callback
│   │   ├── confirm-email/ # Email verification
│   │   └── verify-otp/    # OTP verification
│   ├── blog/              # Blog pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── contact/           # Contact form
│   ├── faq/               # FAQ page
│   ├── product/           # Product detail pages
│   ├── shop/              # Product catalog
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── admin/             # Admin-specific components
│   ├── ui/               # Shadcn/ui components
│   ├── auth-provider.tsx # Authentication context
│   ├── cart-provider.tsx # Shopping cart context
│   ├── header.tsx        # Site header
│   ├── footer.tsx        # Site footer
│   ├── hero.tsx          # Homepage hero
│   ├── product-card.tsx  # Product display
│   └── ...
├── lib/                  # Utilities and data
│   ├── auth.ts          # Authentication utilities
│   ├── database.ts      # Database connection
│   ├── supabase-client.ts # Supabase client
│   ├── supabase-server.ts # Server-side Supabase
│   ├── types.ts         # TypeScript types
│   ├── utils.ts         # Helper functions
│   └── wishlist.ts      # Wishlist functionality
├── hooks/               # Custom React hooks
├── scripts/             # Utility scripts
│   └── create-admin.js  # Admin user creation
└── public/              # Static assets
```

## 🛍️ E-commerce Setup

### Product Management

1. **Database-Driven Products**
   - Products are stored in Supabase database
   - Use admin panel at `/admin/products` to manage products
   - Or insert directly into the `products` table

2. **Product Schema**
   ```sql
   -- See supabase-schema.sql for complete schema
   CREATE TABLE products (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     slug TEXT UNIQUE NOT NULL,
     name TEXT NOT NULL,
     flavor TEXT NOT NULL,
     type TEXT NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     description TEXT NOT NULL,
     image_emoji TEXT,
     gradient_from TEXT,
     gradient_to TEXT,
     badges TEXT[],
     features TEXT[],
     in_stock BOOLEAN DEFAULT true,
     featured BOOLEAN DEFAULT false,
     -- ... more fields
   );
   ```

3. **Product Categories**
   - **Types**: Toothpaste, Toothbrush, Mouthwash, Accessory, Bundle
   - **Flavors**: Mango, Strawberry, Yuzu, Blueberry, Lavender, Mint
   - **Age Groups**: Kids, Adults, All

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

### ✅ Ready for Production

The SMILEY e-commerce website is fully ready for deployment with all critical features implemented and tested.

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add all required environment variables in Vercel dashboard
3. Deploy automatically on push
4. Configure custom domain and SSL

### Other Platforms
- **Railway**: Full-stack deployment with database
- **Netlify**: Static site deployment (requires build optimization)
- **AWS**: EC2 or Amplify deployment
- **DigitalOcean**: App Platform deployment

### Required Environment Variables
See `DEPLOYMENT.md` for complete deployment guide with all required environment variables and setup instructions.

## 📊 Analytics & Monitoring

### Google Analytics
Add your GA4 tracking ID:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Performance Monitoring
- Built-in Next.js analytics
- Vercel Analytics integration
- Web Vitals tracking
- Error monitoring ready

## 🔧 Admin System

### Quick Admin Setup
1. **Create Admin User**
   ```bash
   node scripts/create-admin.js
   ```

2. **Access Admin Panel**
   - Navigate to `/admin/login`
   - Use admin credentials
   - Access full management dashboard

### Admin Features
- **User Management**: Complete user account administration
- **Product Management**: Full CRUD operations for products
- **Order Management**: Process and track orders
- **Content Management**: Manage blog posts and site content
- **Analytics Dashboard**: Real-time insights and reporting
- **Role-Based Access**: Granular permission system

### Documentation
- See `ADMIN_SETUP.md` for detailed admin setup guide
- See `SUPABASE_SETUP.md` for database configuration
- See `DEPLOYMENT.md` for production deployment guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: 
  - This README for general setup
  - `ADMIN_SETUP.md` for admin configuration
  - `SUPABASE_SETUP.md` for database setup
  - `DEPLOYMENT.md` for production deployment
- **Issues**: Open an issue on GitHub
- **Email**: hello@smiley.com

## 📋 Version Information

- **Current Version**: 0.1.0
- **Next.js**: 14.2.32
- **React**: 18
- **TypeScript**: 5
- **Supabase**: 2.57.2
- **Stripe**: 14.5.0
- **Framer Motion**: 10.16.4

## 🎉 Acknowledgments

- **Shadcn/ui** for beautiful, accessible components
- **Framer Motion** for smooth animations and transitions
- **Tailwind CSS** for utility-first styling
- **Next.js** team for the amazing framework
- **Supabase** for the complete backend solution
- **Stripe** for secure payment processing

---

Made with ❤️ for healthy smiles everywhere! 🦷✨