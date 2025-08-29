import { supabase } from './supabaseClient';

// Types
export interface Inquiry {
  id: number; // Changed from string to number (bigint)
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  city: string;
  province?: string; // Made optional to match your schema
  organization?: string; // Made optional to match your schema
  country: string;
  subject?: string; // Made optional to match your schema
  message?: string; // Made optional to match your schema
  created_at: string;
}

export interface Booking {
  id: string;
  expedition_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  city: string;
  province: string;
  organization: string;
  country: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  user_id?: string;
}

export interface BookingWithUser extends Booking {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface InquiryWithUser extends Inquiry {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// Filter and Sort Options
export interface FilterOptions {
  status?: string;
  country?: string;
  organization?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface SortOptions {
  field: 'created_at' | 'first_name' | 'last_name' | 'email' | 'status';
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

// Response Types
export interface DataResponse<T> {
  data: T[] | null;
  error: any;
  count?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ===== INQUIRIES MANAGEMENT =====

/**
 * Read all inquiries with optional filtering and pagination
 */
export const readInquiries = async (
  filters?: FilterOptions,
  sort?: SortOptions,
  pagination?: PaginationOptions
): Promise<PaginatedResponse<Inquiry>> => {
  try {
    let query = supabase
      .from('inquiries')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.country) {
      query = query.eq('country', filters.country);
    }
    if (filters?.organization) {
      query = query.eq('organization', filters.organization);
    }
    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }
    if (filters?.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
    }

    // Apply sorting
    if (sort) {
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    if (pagination) {
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / (pagination?.pageSize || total));

    return {
      data: data || [],
      total,
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || total,
      totalPages
    };

  } catch (error) {
    console.error('Error reading inquiries:', error);
    throw error;
  }
};

/**
 * Read specific columns from inquiries
 */
export const readInquiryColumns = async (
  columns: (keyof Inquiry)[],
  filters?: FilterOptions
): Promise<DataResponse<Partial<Inquiry>>> => {
  try {
    let query = supabase
      .from('inquiries')
      .select(columns.join(','));

    // Apply basic filters
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return { data, error: null };

  } catch (error) {
    console.error('Error reading inquiry columns:', error);
    return { data: null, error };
  }
};

/**
 * Read inquiries with referenced user data
 */
export const readInquiriesWithUsers = async (
  filters?: FilterOptions,
  pagination?: PaginationOptions
): Promise<PaginatedResponse<InquiryWithUser>> => {
  try {
    let query = supabase
      .from('inquiries')
      .select(`
        *,
        user:user_id (
          id,
          name,
          email
        )
      `, { count: 'exact' });

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.country) {
      query = query.eq('country', filters.country);
    }

    // Apply sorting
    query = query.order('created_at', { ascending: false });

    // Apply pagination
    if (pagination) {
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / (pagination?.pageSize || total));

    return {
      data: data || [],
      total,
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || total,
      totalPages
    };

  } catch (error) {
    console.error('Error reading inquiries with users:', error);
    throw error;
  }
};

/**
 * Insert a new inquiry
 */
export const insertInquiry = async (inquiryData: Omit<Inquiry, 'id' | 'created_at'>): Promise<DataResponse<Inquiry>> => {
  try {
    // Only include required fields and handle optional fields
    const insertData = {
      first_name: inquiryData.first_name,
      last_name: inquiryData.last_name,
      phone: inquiryData.phone,
      email: inquiryData.email,
      city: inquiryData.city,
      province: inquiryData.province || null,
      organization: inquiryData.organization || null,
      country: inquiryData.country,
      subject: inquiryData.subject || null,
      message: inquiryData.message || null
    };

    const { data, error } = await supabase
      .from('inquiries')
      .insert([insertData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: [data], error: null };

  } catch (error) {
    console.error('Error inserting inquiry:', error);
    return { data: null, error };
  }
};

/**
 * Insert multiple inquiries
 */
export const insertManyInquiries = async (inquiriesData: Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>[]): Promise<DataResponse<Inquiry>> => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert(inquiriesData)
      .select();

    if (error) {
      throw error;
    }

    return { data: data || [], error: null };

  } catch (error) {
    console.error('Error inserting many inquiries:', error);
    return { data: null, error };
  }
};

/**
 * Update an inquiry
 */
export const updateInquiry = async (
  id: number,
  updateData: Partial<Omit<Inquiry, 'id' | 'created_at'>>
): Promise<DataResponse<Inquiry>> => {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: [data], error: null };

  } catch (error) {
    console.error('Error updating inquiry:', error);
    return { data: null, error };
  }
};

/**
 * Delete an inquiry
 */
export const deleteInquiry = async (id: number): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return { error: null };

  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return { error };
  }
};

// ===== BOOKINGS MANAGEMENT =====

/**
 * Read all bookings with optional filtering and pagination
 */
export const readBookings = async (
  filters?: FilterOptions,
  sort?: SortOptions,
  pagination?: PaginationOptions
): Promise<PaginatedResponse<Booking>> => {
  try {
    let query = supabase
      .from('bookings')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.country) {
      query = query.eq('country', filters.country);
    }
    if (filters?.organization) {
      query = query.eq('organization', filters.organization);
    }
    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }
    if (filters?.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,expedition_name.ilike.%${filters.search}%`);
    }

    // Apply sorting
    if (sort) {
      query = query.order(sort.field, { ascending: sort.direction === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    // Apply pagination
    if (pagination) {
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / (pagination?.pageSize || total));

    return {
      data: data || [],
      total,
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || total,
      totalPages
    };

  } catch (error) {
    console.error('Error reading bookings:', error);
    throw error;
  }
};

/**
 * Read bookings with referenced user data
 */
export const readBookingsWithUsers = async (
  filters?: FilterOptions,
  pagination?: PaginationOptions
): Promise<PaginatedResponse<BookingWithUser>> => {
  try {
    let query = supabase
      .from('bookings')
      .select(`
        *,
        user:user_id (
          id,
          name,
          email
        )
      `, { count: 'exact' });

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.country) {
      query = query.eq('country', filters.country);
    }

    // Apply sorting
    query = query.order('created_at', { ascending: false });

    // Apply pagination
    if (pagination) {
      const from = (pagination.page - 1) * pagination.pageSize;
      const to = from + pagination.pageSize - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / (pagination?.pageSize || total));

    return {
      data: data || [],
      total,
      page: pagination?.page || 1,
      pageSize: pagination?.pageSize || total,
      totalPages
    };

  } catch (error) {
    console.error('Error reading bookings with users:', error);
    throw error;
  }
};

/**
 * Insert a new booking
 */
export const insertBooking = async (bookingData: Omit<Booking, 'id' | 'created_at'>): Promise<DataResponse<Booking>> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: [data], error: null };

  } catch (error) {
    console.error('Error inserting booking:', error);
    return { data: null, error };
  }
};

/**
 * Insert multiple bookings
 */
export const insertManyBookings = async (bookingsData: Omit<Booking, 'id' | 'created_at'>[]): Promise<DataResponse<Booking>> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingsData)
      .select();

    if (error) {
      throw error;
    }

    return { data: data || [], error: null };

  } catch (error) {
    console.error('Error inserting many bookings:', error);
    return { data: null, error };
  }
};

/**
 * Update a booking
 */
export const updateBooking = async (
  id: string,
  updateData: Partial<Omit<Booking, 'id' | 'created_at'>>
): Promise<DataResponse<Booking>> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { data: [data], error: null };

  } catch (error) {
    console.error('Error updating booking:', error);
    return { data: null, error };
  }
};

/**
 * Delete a booking
 */
export const deleteBooking = async (id: string): Promise<{ error: any }> => {
  try {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return { error: null };

  } catch (error) {
    console.error('Error deleting booking:', error);
    return { error };
  }
};

// ===== ADVANCED QUERIES =====

/**
 * Get statistics for dashboard
 */
export const getDashboardStats = async (): Promise<{
  totalInquiries: number;
  totalBookings: number;
  newInquiries: number;
  pendingBookings: number;
  completedInquiries: number;
  confirmedBookings: number;
  conversionRate: number;
}> => {
  try {
    // Get inquiry counts by status
    const { data: inquiryStats, error: inquiryError } = await supabase
      .from('inquiries')
      .select('status');

    if (inquiryError) throw inquiryError;

    // Get booking counts by status
    const { data: bookingStats, error: bookingError } = await supabase
      .from('bookings')
      .select('status');

    if (bookingError) throw bookingError;

    // Calculate statistics
    const totalInquiries = inquiryStats?.length || 0;
    const totalBookings = bookingStats?.length || 0;
    
    const newInquiries = inquiryStats?.filter(i => i.status === 'new').length || 0;
    const pendingBookings = bookingStats?.filter(b => b.status === 'pending').length || 0;
    const completedInquiries = inquiryStats?.filter(i => i.status === 'completed').length || 0;
    const confirmedBookings = bookingStats?.filter(b => b.status === 'confirmed').length || 0;
    
    const conversionRate = totalInquiries > 0 ? (totalBookings / totalInquiries) * 100 : 0;

    return {
      totalInquiries,
      totalBookings,
      newInquiries,
      pendingBookings,
      completedInquiries,
      confirmedBookings,
      conversionRate
    };

  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

/**
 * Get monthly trends
 */
export const getMonthlyTrends = async (months: number = 12): Promise<{
  month: string;
  inquiries: number;
  bookings: number;
}[]> => {
  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const { data: inquiries, error: inquiryError } = await supabase
      .from('inquiries')
      .select('created_at')
      .gte('created_at', startDate.toISOString());

    if (inquiryError) throw inquiryError;

    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('created_at')
      .gte('created_at', startDate.toISOString());

    if (bookingError) throw bookingError;

    // Group by month
    const monthlyData: { [key: string]: { inquiries: number; bookings: number } } = {};

    // Initialize months
    for (let i = 0; i < months; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = { inquiries: 0, bookings: 0 };
    }

    // Count inquiries by month
    inquiries?.forEach(inquiry => {
      const date = new Date(inquiry.created_at);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].inquiries++;
      }
    });

    // Count bookings by month
    bookings?.forEach(booking => {
      const date = new Date(booking.created_at);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].bookings++;
      }
    });

    return Object.entries(monthlyData)
      .reverse()
      .map(([month, data]) => ({
        month,
        inquiries: data.inquiries,
        bookings: data.bookings
      }));

  } catch (error) {
    console.error('Error getting monthly trends:', error);
    throw error;
  }
};

/**
 * Get top expeditions
 */
export const getTopExpeditions = async (limit: number = 10): Promise<{
  expedition: string;
  inquiries: number;
  bookings: number;
}[]> => {
  try {
    const { data: inquiries, error: inquiryError } = await supabase
      .from('inquiries')
      .select('subject');

    if (inquiryError) throw inquiryError;

    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('expedition_name');

    if (bookingError) throw bookingError;

    // Count by expedition
    const expeditionCounts: { [key: string]: { inquiries: number; bookings: number } } = {};

    inquiries?.forEach(inquiry => {
      const expedition = inquiry.subject || 'General Inquiry';
      if (!expeditionCounts[expedition]) {
        expeditionCounts[expedition] = { inquiries: 0, bookings: 0 };
      }
      expeditionCounts[expedition].inquiries++;
    });

    bookings?.forEach(booking => {
      const expedition = booking.expedition_name || 'Unknown Expedition';
      if (!expeditionCounts[expedition]) {
        expeditionCounts[expedition] = { inquiries: 0, bookings: 0 };
      }
      expeditionCounts[expedition].bookings++;
    });

    return Object.entries(expeditionCounts)
      .map(([expedition, data]) => ({
        expedition,
        inquiries: data.inquiries,
        bookings: data.bookings
      }))
      .sort((a, b) => (b.inquiries + b.bookings) - (a.inquiries + a.bookings))
      .slice(0, limit);

  } catch (error) {
    console.error('Error getting top expeditions:', error);
    throw error;
  }
};

// ===== REAL-TIME SUBSCRIPTIONS =====

/**
 * Subscribe to real-time changes
 */
export const subscribeToChanges = (
  table: 'inquiries' | 'bookings' | 'both',
  callback: (payload: any) => void
) => {
  const channel = supabase.channel('data-changes');

  if (table === 'inquiries' || table === 'both') {
    channel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'inquiries' },
      callback
    );
  }

  if (table === 'bookings' || table === 'both') {
    channel.on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'bookings' },
      callback
    );
  }

  return channel.subscribe();
};

/**
 * Unsubscribe from real-time changes
 */
export const unsubscribeFromChanges = (channel: any) => {
  if (channel) {
    supabase.removeChannel(channel);
  }
};

// ===== UTILITY FUNCTIONS =====

/**
 * Convert data to CSV format
 */
export const convertToCSV = (data: any[], headers?: string[]): string => {
  if (data.length === 0) return '';
  
  const csvHeaders = headers || Object.keys(data[0]);
  const csvRows = [csvHeaders.join(',')];
  
  for (const row of data) {
    const values = csvHeaders.map(header => {
      const value = row[header];
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

/**
 * Export data as CSV file
 */
export const exportToCSV = (data: any[], filename: string, headers?: string[]) => {
  try {
    const csvContent = convertToCSV(data, headers);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
};

/**
 * Validate inquiry data
 */
export const validateInquiryData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const requiredFields = ['first_name', 'last_name', 'phone', 'email', 'city', 'country'];

  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors.push(`${field.replace('_', ' ')} is required`);
    }
  });

  // Validate email format
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Validate phone format (basic)
  if (data.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(data.phone)) {
    errors.push('Invalid phone number format');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate booking data
 */
export const validateBookingData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const requiredFields = ['expedition_name', 'first_name', 'last_name', 'phone', 'email', 'city', 'province', 'organization', 'country'];

  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors.push(`${field.replace('_', ' ')} is required`);
    }
  });

  // Validate email format
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Validate phone format (basic)
  if (data.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(data.phone)) {
    errors.push('Invalid phone number format');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
