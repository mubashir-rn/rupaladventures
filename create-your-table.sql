-- Create inquiries table matching your exact structure
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT,
  organization TEXT,
  country TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_country ON inquiries(country);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Anyone can insert inquiries (for anonymous users)
CREATE POLICY "Anyone can insert inquiries" ON inquiries
    FOR INSERT WITH CHECK (true);

-- Users can view their own inquiries (if you add user_id later)
-- CREATE POLICY "Users can view own inquiries" ON inquiries
--     FOR SELECT USING (auth.uid() = user_id);

-- For now, allow viewing all inquiries (you can restrict this later)
CREATE POLICY "Anyone can view inquiries" ON inquiries
    FOR SELECT USING (true);

-- Service role can do everything (for admin operations)
CREATE POLICY "Service role can do everything" ON inquiries
    FOR ALL USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT ALL ON inquiries TO authenticated;
GRANT ALL ON inquiries TO service_role;
GRANT INSERT, SELECT ON inquiries TO anon;

-- Grant sequence permissions for the auto-incrementing id
GRANT USAGE, SELECT ON SEQUENCE inquiries_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE inquiries_id_seq TO service_role;
GRANT USAGE, SELECT ON SEQUENCE inquiries_id_seq TO anon;
