# Supabase Setup Guide for SMILEY E-commerce

This guide will help you set up Supabase for your SMILEY e-commerce site with complete authentication, database, and real-time features.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Your SMILEY project cloned locally

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `smiley-ecommerce` (or your preferred name)
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be created (usually takes 1-2 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql` from your project
4. Paste it into the SQL Editor
5. Click "Run" to execute the schema
6. You should see "Success. No rows returned" or similar success messages

This will create:
- User profiles table
- Products table with sample data
- Cart items table
- Orders and order items tables
- Wishlist items table
- Reviews table
- Newsletter subscribers table
- All necessary indexes, triggers, and RLS policies

## Step 3: Configure Authentication

1. In your Supabase dashboard, go to **Authentication** > **Settings**
2. Under **Site URL**, add your development URL: `http://localhost:3000`
3. Under **Redirect URLs**, add:
   - `http://localhost:3000/account`
   - `http://localhost:3000/account/reset-password`
   - `https://yourdomain.com/account` (for production)
   - `https://yourdomain.com/account/reset-password` (for production)
4. Under **Email Templates**, customize the confirmation and reset password emails if desired
5. Go to **Authentication** > **Providers** and ensure **Email** is enabled

## Step 4: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** (looks like `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`)

## Step 5: Configure Environment Variables

1. Copy `env.example` to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. Also update other required variables:
   ```env
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NODE_ENV=development
   
   # Stripe Configuration (get from stripe.com)
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

## Step 6: Install Dependencies

Make sure you have all required dependencies:

```bash
npm install
```

The Supabase client is already included in your `package.json`.

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open `http://localhost:3000` in your browser

3. Test the authentication:
   - Try signing up with a new email
   - Check your email for the confirmation link
   - Try signing in
   - Test the account page

4. Test the database:
   - Browse products (should show sample data)
   - Add items to cart
   - Add items to wishlist
   - Check the database in Supabase dashboard to see the data

## Step 8: Verify Database Setup

1. In your Supabase dashboard, go to **Table Editor**
2. You should see these tables:
   - `profiles`
   - `products` (with sample data)
   - `cart_items`
   - `orders`
   - `order_items`
   - `wishlist_items`
   - `reviews`
   - `newsletter_subscribers`

3. Check that the sample products are visible in your app

## Step 9: Configure Row Level Security (RLS)

The schema automatically sets up RLS policies, but you can verify them:

1. Go to **Authentication** > **Policies** in your Supabase dashboard
2. You should see policies for each table ensuring users can only access their own data

## Step 10: Set Up Storage (Optional)

If you want to store product images in Supabase:

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `product-images`
3. Set the bucket to public
4. Update your product image URLs to use Supabase storage

## Step 11: Configure Real-time (Optional)

The schema is set up for real-time updates. To enable:

1. Go to **Database** > **Replication** in your Supabase dashboard
2. Enable replication for tables you want real-time updates on (e.g., `cart_items`, `orders`)

## Step 12: Production Setup

When deploying to production:

1. Update your environment variables with production URLs
2. Add your production domain to Supabase authentication settings
3. Set up proper CORS policies
4. Configure email templates for production
5. Set up proper backup and monitoring

## Troubleshooting

### Common Issues

1. **"Supabase not configured" error**
   - Check your environment variables are set correctly
   - Restart your development server after changing `.env.local`

2. **Authentication not working**
   - Verify your Site URL and Redirect URLs in Supabase settings
   - Check that email confirmation is working

3. **Database errors**
   - Make sure you ran the complete schema SQL
   - Check the Supabase logs for specific error messages

4. **RLS policies blocking access**
   - Verify you're signed in
   - Check that the policies are set up correctly

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Look at the Supabase logs in your dashboard
- Check the browser console for client-side errors
- Verify your environment variables are loaded correctly

## Features Included

Your Supabase setup includes:

✅ **Authentication System**
- User signup/signin with email
- Password reset functionality
- User profiles with extended data
- Automatic profile creation on signup

✅ **Product Management**
- Full product catalog with categories
- Image support
- Stock management
- Featured products
- Search and filtering

✅ **Shopping Cart**
- Add/remove items
- Update quantities
- Persistent cart across sessions
- Real-time updates

✅ **Order Management**
- Order creation and tracking
- Order status updates
- Order history
- Integration with Stripe payments

✅ **Wishlist**
- Add/remove items from wishlist
- Persistent wishlist
- Quick add to cart from wishlist

✅ **Reviews System**
- Product reviews and ratings
- Automatic rating calculation
- User review management

✅ **Newsletter**
- Email subscription management
- Unsubscribe functionality

✅ **Security**
- Row Level Security (RLS) policies
- User data isolation
- Secure API endpoints

## Next Steps

1. Customize the product data for your specific needs
2. Set up email templates in Supabase
3. Configure Stripe for payments
4. Add more product categories and features
5. Set up analytics and monitoring
6. Deploy to production

Your SMILEY e-commerce site is now fully integrated with Supabase! 🎉
