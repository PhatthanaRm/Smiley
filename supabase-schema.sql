-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  address JSONB,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_sessions table for admin authentication
CREATE TABLE admin_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  permissions TEXT[] DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  flavor TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Toothpaste', 'Toothbrush', 'Mouthwash', 'Accessory', 'Bundle')),
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  long_description TEXT,
  image_emoji TEXT,
  gradient_from TEXT,
  gradient_to TEXT,
  badges TEXT[],
  features TEXT[],
  ingredients TEXT[],
  size TEXT,
  age_group TEXT CHECK (age_group IN ('Kids', 'Adults', 'All')),
  subscription_price DECIMAL(10,2),
  subscription_interval TEXT CHECK (subscription_interval IN ('monthly', 'quarterly')),
  in_stock BOOLEAN DEFAULT true,
  images TEXT[],
  category TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE cart_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE orders (
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
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlist_items table
CREATE TABLE wishlist_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author TEXT NOT NULL,
  cover_emoji TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  read_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_wishlist_items_user_id ON wishlist_items(user_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_date ON blog_posts(date);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);
CREATE INDEX idx_admin_sessions_user_id ON admin_sessions(user_id);
CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions(expires_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wishlist_items_updated_at BEFORE UPDATE ON wishlist_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_newsletter_subscribers_updated_at BEFORE UPDATE ON newsletter_subscribers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_sessions_updated_at BEFORE UPDATE ON admin_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Cart items policies
CREATE POLICY "Users can view own cart items" ON cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart items" ON cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart items" ON cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart items" ON cart_items FOR DELETE USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Wishlist items policies
CREATE POLICY "Users can view own wishlist items" ON wishlist_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wishlist items" ON wishlist_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist items" ON wishlist_items FOR DELETE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Admin sessions policies
CREATE POLICY "Admins can view own sessions" ON admin_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can insert own sessions" ON admin_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update own sessions" ON admin_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can delete own sessions" ON admin_sessions FOR DELETE USING (auth.uid() = user_id);

-- Admin policies for profiles
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Products and other tables are public read
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Anyone can view blog posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Anyone can view newsletter subscribers" ON newsletter_subscribers FOR SELECT USING (true);

-- Admin policies for products
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Admin policies for orders
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);
CREATE POLICY "Admins can update all orders" ON orders FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Insert sample data
-- Insert sample data
INSERT INTO products (slug, name, flavor, type, price, original_price, description, rating, reviews_count, featured, in_stock, category, tags, images) VALUES
('strawberry-fresh-toothpaste', 'Strawberry Fresh Toothpaste', 'Strawberry', 'Toothpaste', 8.99, 12.99, 'Delicious strawberry-flavored toothpaste that makes brushing fun for kids and adults alike!', 4.5, 23, true, true, 'Toothpaste', ARRAY['strawberry', 'kids', 'fruity'], ARRAY['/images/strawberry-toothpaste.jpg']),
('minty-fresh-toothbrush', 'Minty Fresh Toothbrush', 'Mint', 'Toothbrush', 6.99, 9.99, 'Soft-bristled toothbrush with ergonomic handle for comfortable brushing', 4.8, 45, true, true, 'Toothbrush', ARRAY['mint', 'soft', 'ergonomic'], ARRAY['/images/minty-toothbrush.jpg']),
('berry-blast-mouthwash', 'Berry Blast Mouthwash', 'Berry', 'Mouthwash', 7.99, 11.99, 'Refreshing berry-flavored mouthwash that leaves your mouth feeling clean and fresh', 4.3, 18, true, true, 'Mouthwash', ARRAY['berry', 'fresh', 'refreshing'], ARRAY['/images/berry-mouthwash.jpg']),
('complete-oral-care-bundle', 'Complete Oral Care Bundle', 'Mixed', 'Bundle', 24.99, 34.99, 'Everything you need for a complete oral care routine', 4.7, 67, true, true, 'Bundle', ARRAY['bundle', 'complete', 'savings'], ARRAY['/images/oral-care-bundle.jpg']);

-- Insert admin user
-- Note: Make sure this user exists in Supabase Auth first
INSERT INTO profiles (id, email, full_name, role, is_active) VALUES
('c9d16b3d-d8cf-409d-ab12-ad48108fed58', 'phatthana.rm@gmail.com', 'Phatthana', 'super_admin', true);