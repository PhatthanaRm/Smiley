# SMILEY E-commerce Setup Guide

## 🚨 Shopping Not Working? Here's How to Fix It!

Your SMILEY e-commerce site needs proper API configuration to enable shopping functionality. Follow these steps:

## 1. Create Environment File

Create a `.env.local` file in your project root with the following content:

```bash
# SMILEY E-commerce Environment Variablesx
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# STRIPE CONFIGURATION (Required for payments)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_SUB_PRICE_ID=price_1234567890
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# SUPABASE CONFIGURATION (Required for user auth & data)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# DEVELOPMENT
NEXT_PUBLIC_DEBUG=true
```

## 2. Set Up Stripe (Required for Payments)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create a free account if you don't have one
3. Go to **Developers > API Keys**
4. Copy your **Publishable key** and **Secret key** (test mode)
5. Replace the placeholder values in `.env.local`

## 3. Set Up Supabase (Required for User Auth & Data)

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to **Settings > API**
4. Copy your **Project URL** and **anon public** key
5. Copy your **service_role** key (keep this secret!)
6. Replace the placeholder values in `.env.local`

## 4. Initialize Database

Run this command to set up your database tables:

```bash
# If you have Supabase CLI installed
supabase db reset

# Or manually run the SQL from supabase-schema.sql in your Supabase dashboard
```

## 5. Restart Development Server

After setting up your environment variables:

```bash
npm run dev
```

## 6. Test Shopping Functionality

1. Go to http://localhost:3000/shop
2. Try adding products to cart
3. Go to cart page
4. Try checkout process

## Common Issues & Solutions

### ❌ "Add to Cart" button not working
- Check browser console for errors
- Ensure CartProvider is properly wrapped around your app
- Verify localStorage is available

### ❌ Checkout redirects to error page
- Verify Stripe API keys are correct
- Check Stripe dashboard for any errors
- Ensure NEXT_PUBLIC_APP_URL is set correctly

### ❌ User authentication not working
- Verify Supabase configuration
- Check if database tables are created
- Ensure Supabase project is active

### ❌ Cart items disappear on page refresh
- This is normal - cart is stored in localStorage
- Items will persist across browser sessions
- For user-specific carts, sign in is required

## Need Help?

1. Check the browser console (F12) for error messages
2. Verify all environment variables are set correctly
3. Make sure your Stripe and Supabase accounts are active
4. Check the terminal for any server errors

## Quick Test

Once everything is set up, you should be able to:
- ✅ Browse products on /shop
- ✅ Add items to cart
- ✅ View cart on /cart
- ✅ Proceed to checkout
- ✅ Complete payment (test mode)

---

**Note**: The shopping functionality requires both Stripe and Supabase to be properly configured. Without these services, the cart will work locally but checkout and user features won't function.
