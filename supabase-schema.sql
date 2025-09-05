-- SMILEY E-commerce Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS public.cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlist_items table
CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_id ON public.wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update product rating when review is added/updated/deleted
CREATE OR REPLACE FUNCTION public.update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE public.products
    SET 
      rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM public.reviews
        WHERE product_id = OLD.product_id
      ),
      review_count = (
        SELECT COUNT(*)
        FROM public.reviews
        WHERE product_id = OLD.product_id
      )
    WHERE id = OLD.product_id;
    RETURN OLD;
  ELSE
    UPDATE public.products
    SET 
      rating = (
        SELECT COALESCE(AVG(rating), 0)
        FROM public.reviews
        WHERE product_id = NEW.product_id
      ),
      review_count = (
        SELECT COUNT(*)
        FROM public.reviews
        WHERE product_id = NEW.product_id
      )
    WHERE id = NEW.product_id;
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for product rating updates
CREATE TRIGGER update_product_rating_on_review_insert
  AFTER INSERT ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_product_rating();

CREATE TRIGGER update_product_rating_on_review_update
  AFTER UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_product_rating();

CREATE TRIGGER update_product_rating_on_review_delete
  AFTER DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_product_rating();

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Cart items: Users can only see and modify their own cart
CREATE POLICY "Users can view own cart" ON public.cart_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items" ON public.cart_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items" ON public.cart_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items" ON public.cart_items
  FOR DELETE USING (auth.uid() = user_id);

-- Orders: Users can only see their own orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: Users can only see order items for their orders
CREATE POLICY "Users can view own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own order items" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Wishlist: Users can only see and modify their own wishlist
CREATE POLICY "Users can view own wishlist" ON public.wishlist_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wishlist items" ON public.wishlist_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own wishlist items" ON public.wishlist_items
  FOR DELETE USING (auth.uid() = user_id);

-- Reviews: Users can see all reviews, but only modify their own
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON public.reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Products: Anyone can view products
CREATE POLICY "Anyone can view products" ON public.products
  FOR SELECT USING (true);

-- Newsletter subscribers: Anyone can subscribe/unsubscribe
CREATE POLICY "Anyone can manage newsletter subscription" ON public.newsletter_subscribers
  FOR ALL USING (true);

-- Insert some sample products
INSERT INTO public.products (name, description, price, original_price, images, category, tags, in_stock, stock_quantity, featured, slug) VALUES
('Strawberry Fresh Toothpaste', 'Delicious strawberry-flavored toothpaste that makes brushing fun for kids and adults alike!', 8.99, 12.99, ARRAY['/images/strawberry-toothpaste.jpg'], 'Toothpaste', ARRAY['strawberry', 'kids', 'fruity'], true, 100, true, 'strawberry-fresh-toothpaste'),
('Minty Fresh Toothbrush', 'Soft-bristled toothbrush with ergonomic handle for comfortable brushing', 6.99, 9.99, ARRAY['/images/minty-toothbrush.jpg'], 'Toothbrush', ARRAY['mint', 'soft', 'ergonomic'], true, 150, true, 'minty-fresh-toothbrush'),
('Berry Blast Mouthwash', 'Refreshing berry-flavored mouthwash that leaves your mouth feeling clean and fresh', 7.99, 11.99, ARRAY['/images/berry-mouthwash.jpg'], 'Mouthwash', ARRAY['berry', 'fresh', 'refreshing'], true, 80, true, 'berry-blast-mouthwash'),
('Complete Oral Care Bundle', 'Everything you need for a complete oral care routine', 24.99, 34.99, ARRAY['/images/oral-care-bundle.jpg'], 'Bundle', ARRAY['bundle', 'complete', 'savings'], true, 50, true, 'complete-oral-care-bundle');

-- Update the products with proper ratings and review counts
UPDATE public.products SET rating = 4.5, review_count = 23 WHERE slug = 'strawberry-fresh-toothpaste';
UPDATE public.products SET rating = 4.8, review_count = 45 WHERE slug = 'minty-fresh-toothbrush';
UPDATE public.products SET rating = 4.3, review_count = 18 WHERE slug = 'berry-blast-mouthwash';
UPDATE public.products SET rating = 4.7, review_count = 67 WHERE slug = 'complete-oral-care-bundle';
