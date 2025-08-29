# Troubleshooting: Data Saving Issues

## 🚨 Problem: "Failed to save data" Error

If you're getting errors when trying to save inquiry data, follow these steps:

## 🔍 Step 1: Check Database Setup

### Verify Table Exists
1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. Look for the `inquiries` table
4. If it doesn't exist, run the database setup script

### Run Database Setup
1. Copy the contents of `database_setup.sql`
2. Go to Supabase → **SQL Editor**
3. Paste and execute the script
4. Verify the table was created

## 🔍 Step 2: Test Database Connection

### Run Test Script
```bash
# Install dependencies if needed
npm install @supabase/supabase-js

# Run the test script
node test-database.js
```

### Expected Output
```
🔍 Testing Supabase connection...

1. Testing connection...
✅ Connection successful!
✅ Table "inquiries" exists

2. Testing insert...
✅ Insert successful!
📝 Inserted record: [...]
🧹 Test record cleaned up
```

### If Test Fails
- Check your Supabase URL and API key
- Verify the table exists
- Check RLS policies

## 🔍 Step 3: Check Browser Console

### Open Developer Tools
1. Right-click on your page → **Inspect**
2. Go to **Console** tab
3. Try submitting the form
4. Look for error messages

### Common Error Messages

#### Table Not Found
```
❌ Table "inquiries" does not exist
```
**Solution**: Run the database setup script

#### Permission Denied
```
❌ Permission denied for table inquiries
```
**Solution**: Check RLS policies in Supabase

#### Network Error
```
❌ Network error or timeout
```
**Solution**: Check internet connection and Supabase status

## 🔍 Step 4: Verify Supabase Configuration

### Check Environment Variables
Make sure your `.env` file has:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Check supabaseClient.ts
Verify the file contains correct credentials:
```typescript
const SUPABASE_URL = 'your-project-url';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## 🔍 Step 5: Test with Simple Data

### Minimal Test Record
Try inserting this minimal data:
```json
{
  "first_name": "Test",
  "last_name": "User",
  "phone": "+1234567890",
  "email": "test@example.com",
  "city": "Test City",
  "province": "Test Province",
  "organization": "Test Org",
  "country": "Test Country"
}
```

## 🔍 Step 6: Check RLS Policies

### Verify Policies Exist
In Supabase → **Authentication** → **Policies**:
1. Look for `inquiries` table policies
2. Ensure these policies exist:
   - "Anyone can insert inquiries"
   - "Users can view own inquiries"
   - "Service role can do everything"

### Test RLS
```sql
-- Test as anonymous user
SELECT * FROM inquiries LIMIT 1;

-- Test insert as anonymous user
INSERT INTO inquiries (first_name, last_name, phone, email, city, province, organization, country)
VALUES ('Test', 'User', '+1234567890', 'test@example.com', 'Test City', 'Test Province', 'Test Org', 'Test Country');
```

## 🔍 Step 7: Check Table Structure

### Verify Column Types
```sql
-- Check table structure
\d inquiries

-- Expected columns:
-- id (uuid)
-- first_name (varchar)
-- last_name (varchar)
-- phone (varchar)
-- email (varchar)
-- city (varchar)
-- province (varchar)
-- organization (varchar)
-- country (varchar)
-- subject (text)
-- message (text)
-- user_id (uuid, nullable)
-- status (varchar)
-- created_at (timestamp)
-- updated_at (timestamp)
```

## 🔍 Step 8: Enable Debug Mode

### Use Debug Toggle
1. In the booking form, click **"Show Debug Info"**
2. Check the debug information displayed
3. Look for any obvious issues

### Check Network Tab
1. Open Developer Tools → **Network** tab
2. Submit the form
3. Look for failed requests to Supabase

## 🔍 Step 9: Common Fixes

### Fix 1: Recreate Table
```sql
-- Drop and recreate if corrupted
DROP TABLE IF EXISTS inquiries CASCADE;
-- Then run the full database_setup.sql script
```

### Fix 2: Reset RLS
```sql
-- Disable and re-enable RLS
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
-- Then recreate policies
```

### Fix 3: Check API Limits
- Verify you haven't hit Supabase rate limits
- Check your project's usage in the dashboard

## 🔍 Step 10: Get Help

### If Still Failing
1. Check Supabase status: https://status.supabase.com
2. Look at Supabase logs in your dashboard
3. Share error messages and debug info
4. Check Supabase community forums

### Debug Information to Share
- Error messages from console
- Network request details
- Table structure
- RLS policies
- Test script output

## ✅ Success Indicators

When working correctly, you should see:
- ✅ Form submission without errors
- ✅ Toast notification: "Inquiry Saved!"
- ✅ Data appears in Supabase `inquiries` table
- ✅ No console errors
- ✅ Network requests succeed (200 status)

## 🚀 Prevention

- Always test database setup scripts
- Verify RLS policies after table creation
- Use the test script before deploying
- Monitor Supabase logs regularly
- Keep API keys secure and up-to-date
