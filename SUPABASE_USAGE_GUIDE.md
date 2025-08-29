# Supabase Data Management Usage Guide

## 🚀 Overview

This guide demonstrates how to use the comprehensive data management system built with Supabase for your Rupal Adventures Hub. The system provides full CRUD operations, real-time updates, analytics, and admin management for both inquiries and bookings.

## 📚 Components Overview

### 1. **AdminDashboard** - Complete admin interface
### 2. **DataAnalytics** - Data visualization and insights
### 3. **bookingDataManager** - Utility functions for all CRUD operations
### 4. **Enhanced BookingForm** - Improved form with better error handling

## 🔧 Setup Instructions

### Step 1: Database Setup
```sql
-- Run the database_setup.sql script in your Supabase dashboard
-- This creates the 'inquiries' table with proper RLS policies
```

### Step 2: Import Components
```typescript
// In your pages or components
import AdminDashboard from '@/components/AdminDashboard';
import DataAnalytics from '@/components/DataAnalytics';
import { 
  readInquiries, 
  insertInquiry, 
  updateInquiry,
  deleteInquiry,
  readBookings,
  insertBooking,
  updateBooking,
  deleteBooking,
  getDashboardStats,
  getMonthlyTrends,
  getTopExpeditions,
  subscribeToChanges
} from '@/lib/bookingDataManager';
```

## 📊 Basic CRUD Operations

### **READ Operations**

#### Read All Inquiries
```typescript
import { readInquiries } from '@/lib/bookingDataManager';

// Basic read
const { data: inquiries, total, totalPages } = await readInquiries();

// With filters
const { data: filteredInquiries } = await readInquiries({
  status: 'new',
  country: 'pakistan',
  search: 'mountain'
});

// With pagination
const { data: paginatedInquiries } = await readInquiries(
  { status: 'new' },
  { field: 'created_at', direction: 'desc' },
  { page: 1, pageSize: 10 }
);
```

#### Read Specific Columns
```typescript
import { readInquiryColumns } from '@/lib/bookingDataManager';

const { data } = await readInquiryColumns(
  ['first_name', 'last_name', 'email', 'status'],
  { status: 'new' }
);
```

#### Read with User References
```typescript
import { readInquiriesWithUsers } from '@/lib/bookingDataManager';

const { data: inquiriesWithUsers } = await readInquiriesWithUsers(
  { status: 'new' },
  { page: 1, pageSize: 20 }
);

// Access user data
inquiriesWithUsers.data.forEach(inquiry => {
  console.log(`Inquiry from: ${inquiry.user?.name} (${inquiry.user?.email})`);
});
```

### **INSERT Operations**

#### Insert Single Inquiry
```typescript
import { insertInquiry, validateInquiryData } from '@/lib/bookingDataManager';

const inquiryData = {
  first_name: 'John',
  last_name: 'Doe',
  phone: '+1234567890',
  email: 'john@example.com',
  city: 'New York',
  province: 'NY',
  organization: 'Adventure Club',
  country: 'usa',
  subject: 'K2 Expedition',
  message: 'Interested in joining the K2 expedition',
  user_id: 'user-uuid-here',
  status: 'new'
};

// Validate data first
const validation = validateInquiryData(inquiryData);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
  return;
}

// Insert the inquiry
const { data, error } = await insertInquiry(inquiryData);
if (error) {
  console.error('Insert failed:', error);
} else {
  console.log('Inquiry created:', data);
}
```

#### Insert Multiple Inquiries
```typescript
import { insertManyInquiries } from '@/lib/bookingDataManager';

const inquiriesData = [
  { /* inquiry 1 */ },
  { /* inquiry 2 */ },
  { /* inquiry 3 */ }
];

const { data, error } = await insertManyInquiries(inquiriesData);
```

### **UPDATE Operations**

#### Update Inquiry Status
```typescript
import { updateInquiry } from '@/lib/bookingDataManager';

const { data, error } = await updateInquiry('inquiry-uuid', {
  status: 'contacted',
  message: 'Customer contacted via phone'
});
```

#### Update Multiple Fields
```typescript
const { data, error } = await updateInquiry('inquiry-uuid', {
  status: 'in_progress',
  organization: 'Updated Organization Name',
  phone: '+1987654321'
});
```

### **DELETE Operations**

#### Delete Inquiry
```typescript
import { deleteInquiry } from '@/lib/bookingDataManager';

const { error } = await deleteInquiry('inquiry-uuid');
if (error) {
  console.error('Delete failed:', error);
} else {
  console.log('Inquiry deleted successfully');
}
```

## 🎯 Advanced Queries

### **Filtering Examples**

#### Date Range Filtering
```typescript
const { data: recentInquiries } = await readInquiries({
  dateFrom: '2024-01-01T00:00:00Z',
  dateTo: '2024-12-31T23:59:59Z'
});
```

#### Complex Search
```typescript
const { data: searchResults } = await readInquiries({
  search: 'k2', // Searches in first_name, last_name, email, and subject
  status: 'new',
  country: 'pakistan'
});
```

#### Status-based Filtering
```typescript
// Get all pending inquiries
const { data: pendingInquiries } = await readInquiries({
  status: 'new'
});

// Get all completed inquiries
const { data: completedInquiries } = await readInquiries({
  status: 'completed'
});
```

### **Sorting Examples**

```typescript
// Sort by creation date (newest first)
const { data: sortedByDate } = await readInquiries(
  undefined,
  { field: 'created_at', direction: 'desc' }
);

// Sort by name (alphabetical)
const { data: sortedByName } = await readInquiries(
  undefined,
  { field: 'first_name', direction: 'asc' }
);
```

### **Pagination Examples**

```typescript
// First page, 10 items per page
const { data: page1, total, totalPages } = await readInquiries(
  undefined,
  undefined,
  { page: 1, pageSize: 10 }
);

// Second page, 20 items per page
const { data: page2 } = await readInquiries(
  undefined,
  undefined,
  { page: 2, pageSize: 20 }
);

console.log(`Showing page 2 of ${totalPages} (${total} total items)`);
```

## 📈 Analytics and Statistics

### **Dashboard Statistics**
```typescript
import { getDashboardStats } from '@/lib/bookingDataManager';

const stats = await getDashboardStats();
console.log(`
  Total Inquiries: ${stats.totalInquiries}
  Total Bookings: ${stats.totalBookings}
  Conversion Rate: ${stats.conversionRate.toFixed(1)}%
  New Inquiries: ${stats.newInquiries}
  Pending Bookings: ${stats.pendingBookings}
`);
```

### **Monthly Trends**
```typescript
import { getMonthlyTrends } from '@/lib/bookingDataManager';

// Get last 6 months of data
const monthlyData = await getMonthlyTrends(6);

monthlyData.forEach(month => {
  console.log(`${month.month}: ${month.inquiries} inquiries, ${month.bookings} bookings`);
});
```

### **Top Expeditions**
```typescript
import { getTopExpeditions } from '@/lib/bookingDataManager';

// Get top 10 expeditions
const topExpeditions = await getTopExpeditions(10);

topExpeditions.forEach((expedition, index) => {
  console.log(`${index + 1}. ${expedition.expedition}: ${expedition.inquiries + expedition.bookings} total`);
});
```

## 🔄 Real-Time Updates

### **Subscribe to Changes**
```typescript
import { subscribeToChanges, unsubscribeFromChanges } from '@/lib/bookingDataManager';

// Subscribe to both inquiries and bookings
const channel = subscribeToChanges('both', (payload) => {
  console.log('Database change detected:', payload);
  
  // Handle different event types
  switch (payload.eventType) {
    case 'INSERT':
      console.log('New record inserted:', payload.new);
      break;
    case 'UPDATE':
      console.log('Record updated:', payload.new);
      break;
    case 'DELETE':
      console.log('Record deleted:', payload.old);
      break;
  }
  
  // Refresh your UI or update state
  refreshData();
});

// Later, unsubscribe when component unmounts
useEffect(() => {
  return () => {
    unsubscribeFromChanges(channel);
  };
}, []);
```

### **Subscribe to Specific Tables**
```typescript
// Only inquiries
const inquiryChannel = subscribeToChanges('inquiries', handleInquiryChange);

// Only bookings
const bookingChannel = subscribeToChanges('bookings', handleBookingChange);
```

## 📤 Data Export

### **Export to CSV**
```typescript
import { exportToCSV } from '@/lib/bookingDataManager';

// Export all inquiries
const { data: allInquiries } = await readInquiries();
exportToCSV(allInquiries, 'inquiries');

// Export with custom headers
const customHeaders = ['Name', 'Email', 'Phone', 'Status'];
exportToCSV(allInquiries, 'inquiries-filtered', customHeaders);
```

### **Custom Export Functions**
```typescript
import { convertToCSV } from '@/lib/bookingDataManager';

// Get CSV content without downloading
const csvContent = convertToCSV(inquiries);
console.log('CSV content:', csvContent);

// Custom export logic
const exportFilteredData = async (filters: FilterOptions) => {
  const { data } = await readInquiries(filters);
  if (data) {
    exportToCSV(data, `inquiries-${filters.status || 'all'}`);
  }
};
```

## 🎨 Using the Admin Dashboard

### **Basic Usage**
```typescript
// In your routing
import AdminDashboard from '@/components/AdminDashboard';

// The component handles authentication automatically
// Shows access denied for non-authenticated users
<AdminDashboard />
```

### **Features Available**
- **Real-time updates** - Data refreshes automatically
- **Advanced filtering** - By status, country, date range
- **Search functionality** - Search across all fields
- **Status management** - Update inquiry/booking statuses
- **Data export** - Export to CSV format
- **Pagination** - Handle large datasets efficiently

## 📊 Using the Data Analytics

### **Basic Usage**
```typescript
import DataAnalytics from '@/components/DataAnalytics';

// The component provides:
// - Key metrics dashboard
// - Monthly trends visualization
// - Country and organization distribution
// - Status distribution charts
// - Top expeditions ranking
<DataAnalytics />
```

### **Time Range Selection**
The analytics component automatically adjusts based on the selected time range:
- 1 Month
- 3 Months  
- 6 Months
- 1 Year

## 🛡️ Error Handling

### **Comprehensive Error Handling**
```typescript
try {
  const { data, error } = await readInquiries();
  
  if (error) {
    console.error('Database error:', error);
    // Handle specific error types
    if (error.code === 'PGRST116') {
      console.error('Table does not exist');
    } else if (error.code === 'PGRST301') {
      console.error('Permission denied');
    }
    return;
  }
  
  // Process data
  console.log('Inquiries loaded:', data);
  
} catch (error) {
  console.error('Unexpected error:', error);
}
```

### **Validation Before Operations**
```typescript
import { validateInquiryData } from '@/lib/bookingDataManager';

const validation = validateInquiryData(formData);
if (!validation.isValid) {
  validation.errors.forEach(error => {
    toast({
      title: "Validation Error",
      description: error,
      variant: "destructive"
    });
  });
  return;
}

// Proceed with insert/update
const { data, error } = await insertInquiry(formData);
```

## 🔒 Security and RLS

### **Row Level Security Policies**
The system automatically handles RLS policies:
- **Authenticated users** can view their own data
- **Anonymous users** can insert inquiries
- **Service role** has full access for admin operations

### **User-Specific Data**
```typescript
// Only fetch user's own inquiries
const { data: userInquiries } = await readInquiries({
  user_id: currentUser.id
});
```

## 🚀 Performance Optimization

### **Efficient Queries**
```typescript
// Use specific columns when possible
const { data: names } = await readInquiryColumns(['first_name', 'last_name']);

// Use pagination for large datasets
const { data: page } = await readInquiries(
  undefined,
  undefined,
  { page: 1, pageSize: 50 }
);
```

### **Real-time Optimization**
```typescript
// Subscribe only to necessary tables
const channel = subscribeToChanges('inquiries', handleChange);

// Unsubscribe when not needed
useEffect(() => {
  return () => unsubscribeFromChanges(channel);
}, []);
```

## 📱 Integration Examples

### **React Hook Example**
```typescript
import { useState, useEffect } from 'react';
import { readInquiries, subscribeToChanges } from '@/lib/bookingDataManager';

const useInquiries = (filters?: FilterOptions) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        setLoading(true);
        const { data } = await readInquiries(filters);
        setInquiries(data || []);
      } catch (error) {
        console.error('Error loading inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInquiries();

    // Subscribe to real-time updates
    const channel = subscribeToChanges('inquiries', () => {
      loadInquiries(); // Refresh data
    });

    return () => unsubscribeFromChanges(channel);
  }, [filters]);

  return { inquiries, loading };
};
```

### **Form Integration Example**
```typescript
import { insertInquiry, validateInquiryData } from '@/lib/bookingDataManager';

const handleSubmit = async (formData: any) => {
  // Validate data
  const validation = validateInquiryData(formData);
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }

  try {
    setSubmitting(true);
    
    const { data, error } = await insertInquiry(formData);
    
    if (error) {
      setError('Failed to submit inquiry');
      return;
    }
    
    // Success
    setSuccess('Inquiry submitted successfully!');
    resetForm();
    
  } catch (error) {
    setError('Unexpected error occurred');
  } finally {
    setSubmitting(false);
  }
};
```

## 🔧 Troubleshooting

### **Common Issues**

#### Table Not Found
```bash
# Run the database setup script
# Check database_setup.sql
```

#### Permission Denied
```bash
# Check RLS policies in Supabase dashboard
# Verify user authentication
```

#### Real-time Not Working
```bash
# Check if RLS policies allow SELECT
# Verify channel subscription
```

### **Debug Mode**
Use the debug toggle in the AdminDashboard to see:
- Form data
- User authentication status
- Connection information

## 📚 Additional Resources

- **Supabase Documentation**: https://supabase.com/docs
- **Database Setup**: See `database_setup.sql`
- **Troubleshooting**: See `TROUBLESHOOTING.md`
- **Test Script**: Run `node test-database.js`

## 🎯 Next Steps

1. **Set up the database** using the provided SQL script
2. **Test the components** with sample data
3. **Customize the UI** to match your design
4. **Add email notifications** for new inquiries
5. **Implement advanced analytics** with charts
6. **Add user management** features
7. **Set up automated workflows**

This comprehensive system provides everything you need to manage your adventure booking business efficiently with real-time updates, advanced analytics, and robust data management capabilities.
