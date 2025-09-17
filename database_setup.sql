-- Ensure required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create inquiries table for storing all booking inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100),
  organization VARCHAR(200),
  country VARCHAR(100) NOT NULL,
  subject TEXT,
  message TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON inquiries(user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_inquiries_updated_at 
    BEFORE UPDATE ON inquiries 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can view their own inquiries
CREATE POLICY "Users can view own inquiries" ON inquiries
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert inquiries (even without authentication, handled by service role)
CREATE POLICY "Anyone can insert inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

-- Users can update their own inquiries
CREATE POLICY "Users can update own inquiries" ON inquiries
    FOR UPDATE USING (auth.uid() = user_id);

-- Service role can do everything (for admin operations)
CREATE POLICY "Service role can do everything" ON inquiries
    FOR ALL USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT ALL ON inquiries TO authenticated;
GRANT ALL ON inquiries TO service_role;
GRANT INSERT ON inquiries TO anon;

-- In case table already existed with NOT NULL, relax the constraint
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'inquiries' 
      AND column_name = 'organization' AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE public.inquiries ALTER COLUMN organization DROP NOT NULL;
  END IF;
END$$;

-- =============================
-- Bookings table and policies
-- =============================

-- Create bookings table for storing confirmed user bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  expedition_name TEXT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100),
  organization VARCHAR(200),
  country VARCHAR(100) NOT NULL,
  message TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for bookings
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);

-- Ensure the generic updated_at trigger function exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'update_updated_at_column'
  ) THEN
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  END IF;
END$$;

-- updated_at trigger for bookings
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Users can view own bookings'
  ) THEN
    CREATE POLICY "Users can view own bookings" ON bookings
      FOR SELECT USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Anyone can insert bookings'
  ) THEN
    CREATE POLICY "Anyone can insert bookings" ON bookings
      FOR INSERT WITH CHECK (TRUE);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Users can update own bookings'
  ) THEN
    CREATE POLICY "Users can update own bookings" ON bookings
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Service role can do everything (bookings)'
  ) THEN
    CREATE POLICY "Service role can do everything (bookings)" ON bookings
      FOR ALL USING (auth.role() = 'service_role');
  END IF;
END$$;

-- Grants for bookings
GRANT ALL ON bookings TO authenticated;
GRANT ALL ON bookings TO service_role;
GRANT INSERT ON bookings TO anon;
