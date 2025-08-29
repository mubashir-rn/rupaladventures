# Database Setup for Rupal Adventures Hub

## Overview
The booking form now saves all inquiries to a Supabase database, regardless of whether the user is authenticated or not. This ensures that no inquiry is lost and provides better tracking of potential customers.

## Database Tables

### 1. Inquiries Table
This table stores all booking inquiries from both authenticated and non-authenticated users.

**Structure:**
- `id`: Unique identifier (UUID)
- `first_name`: Customer's first name
- `last_name`: Customer's last name
- `phone`: Contact phone number
- `email`: Contact email address
- `city`: Customer's city
- `province`: Customer's province/state
- `organization`: Customer's organization/company
- `country`: Customer's country
- `subject`: Expedition name or inquiry subject
- `message`: Additional message from customer
- `user_id`: Reference to authenticated user (nullable)
- `status`: Inquiry status (new, in_progress, contacted, completed, cancelled)
- `created_at`: Timestamp when inquiry was created
- `updated_at`: Timestamp when inquiry was last updated

### 2. Bookings Table (Existing)
This table stores confirmed bookings for authenticated users only.

## Setup Instructions

### Step 1: Run the SQL Script
1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database_setup.sql`
4. Execute the script

### Step 2: Verify Table Creation
1. Go to the Table Editor in Supabase
2. You should see the new `inquiries` table
3. Verify that Row Level Security (RLS) is enabled
4. Check that the policies are properly created

### Step 3: Test the Functionality
1. Fill out the booking form on your website
2. Submit the form (both authenticated and non-authenticated users)
3. Check the `inquiries` table in Supabase to see the data
4. If authenticated, also check the `bookings` table

## How It Works

### For Non-Authenticated Users:
1. Form data is saved to the `inquiries` table
2. User receives confirmation that their inquiry was saved
3. User can choose to send via WhatsApp or email
4. All data is preserved for follow-up

### For Authenticated Users:
1. Form data is saved to both `inquiries` and `bookings` tables
2. User receives confirmation that both were saved
3. User can choose to send via WhatsApp or email
4. Data is linked to their user account

## Security Features

- **Row Level Security (RLS)** is enabled
- Users can only view their own inquiries
- Anyone can insert inquiries (for non-authenticated users)
- Service role has full access for admin operations
- Proper indexing for performance

## Monitoring and Management

### View All Inquiries:
```sql
SELECT * FROM inquiries ORDER BY created_at DESC;
```

### View Inquiries by Status:
```sql
SELECT * FROM inquiries WHERE status = 'new';
```

### View Inquiries for a Specific User:
```sql
SELECT * FROM inquiries WHERE user_id = 'user-uuid-here';
```

### Update Inquiry Status:
```sql
UPDATE inquiries 
SET status = 'contacted', updated_at = NOW() 
WHERE id = 'inquiry-uuid-here';
```

## Troubleshooting

### Common Issues:

1. **Permission Denied**: Make sure RLS policies are properly set up
2. **Table Not Found**: Ensure the SQL script was executed successfully
3. **Insert Failed**: Check that all required fields are being provided
4. **Authentication Issues**: Verify Supabase client configuration

### Debug Steps:
1. Check browser console for error messages
2. Verify Supabase connection in the browser
3. Check Supabase logs for server-side errors
4. Ensure table structure matches the expected schema

## Benefits

- **No Lost Inquiries**: All form submissions are saved
- **Better Tracking**: Monitor inquiry status and follow-up
- **User Experience**: Immediate confirmation for all users
- **Data Analytics**: Track conversion rates and popular expeditions
- **Customer Service**: Better organization of customer inquiries

## Future Enhancements

- Add email notifications for new inquiries
- Implement inquiry status updates via admin panel
- Add analytics dashboard for inquiry metrics
- Integrate with CRM systems
- Add automated follow-up reminders
