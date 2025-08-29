import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Building, 
  User, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

interface Inquiry {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  city: string;
  province?: string;
  organization?: string;
  country: string;
  subject?: string;
  message?: string;
  created_at: string;
}

interface Booking {
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

interface DashboardStats {
  totalInquiries: number;
  totalBookings: number;
  newInquiries: number;
  pendingBookings: number;
  completedInquiries: number;
  confirmedBookings: number;
}

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalInquiries: 0,
    totalBookings: 0,
    newInquiries: 0,
    pendingBookings: 0,
    completedInquiries: 0,
    confirmedBookings: 0
  });

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      setupRealtimeSubscription();
    }
  }, [isAuthenticated, statusFilter, dateFilter, countryFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch inquiries
      let inquiriesQuery = supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        inquiriesQuery = inquiriesQuery.eq('status', statusFilter);
      }

      if (dateFilter !== 'all') {
        const now = new Date();
        let startDate = new Date();
        
        switch (dateFilter) {
          case 'today':
            startDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            startDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            startDate.setMonth(now.getMonth() - 1);
            break;
        }
        
        inquiriesQuery = inquiriesQuery.gte('created_at', startDate.toISOString());
      }

      if (countryFilter !== 'all') {
        inquiriesQuery = inquiriesQuery.eq('country', countryFilter);
      }

      const { data: inquiriesData, error: inquiriesError } = await inquiriesQuery;

      if (inquiriesError) {
        console.error('Error fetching inquiries:', inquiriesError);
        return;
      }

      // Fetch bookings
      let bookingsQuery = supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        const bookingStatusMap: { [key: string]: string } = {
          'new': 'pending',
          'in_progress': 'pending',
          'contacted': 'pending',
          'completed': 'confirmed',
          'cancelled': 'cancelled'
        };
        const bookingStatus = bookingStatusMap[statusFilter] || statusFilter;
        bookingsQuery = bookingsQuery.eq('status', bookingStatus);
      }

      const { data: bookingsData, error: bookingsError } = await bookingsQuery;

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        return;
      }

      setInquiries(inquiriesData || []);
      setBookings(bookingsData || []);
      
      // Calculate stats
      calculateStats(inquiriesData || [], bookingsData || []);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (inquiriesData: Inquiry[], bookingsData: Booking[]) => {
    const newStats: DashboardStats = {
      totalInquiries: inquiriesData.length,
      totalBookings: bookingsData.length,
      newInquiries: inquiriesData.filter(i => i.status === 'new').length,
      pendingBookings: bookingsData.filter(b => b.status === 'pending').length,
      completedInquiries: inquiriesData.filter(i => i.status === 'completed').length,
      confirmedBookings: bookingsData.filter(b => b.status === 'confirmed').length
    };
    setStats(newStats);
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase.channel('admin-dashboard')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inquiries' },
        () => {
          fetchData(); // Refresh data when inquiries change
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => {
          fetchData(); // Refresh data when bookings change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const updateInquiryStatus = async (inquiryId: number, newStatus: string) => {
    try {
      toast({
        title: "Info",
        description: "Status updates not available in current table structure",
        variant: "default"
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update booking status",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Booking status updated successfully"
      });

      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteInquiry = async (inquiryId: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', inquiryId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete inquiry",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Success",
        description: "Inquiry deleted successfully"
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const exportData = async (type: 'inquiries' | 'bookings') => {
    try {
      const data = type === 'inquiries' ? inquiries : bookings;
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  };

  const getStatusBadge = (status: string, type: 'inquiry' | 'booking') => {
    const statusConfig = {
      inquiry: {
        new: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
        in_progress: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
        contacted: { color: 'bg-purple-100 text-purple-800', icon: Phone },
        completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle }
      },
      booking: {
        pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
        confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
        cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle }
      }
    };

    const config = statusConfig[type][status as keyof typeof statusConfig[typeof type]];
    const Icon = config?.icon || AlertCircle;

    return (
      <Badge className={config?.color || 'bg-gray-100 text-gray-800'}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.expedition_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">You must be logged in to access the admin dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => exportData('inquiries')} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Inquiries
          </Button>
          <Button onClick={() => exportData('bookings')} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Bookings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInquiries}</div>
            <p className="text-xs text-muted-foreground">
              {stats.newInquiries} new, {stats.completedInquiries} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingBookings} pending, {stats.confirmedBookings} confirmed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalInquiries > 0 
                ? Math.round((stats.totalBookings / stats.totalInquiries) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Inquiries to Bookings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date Range</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="pakistan">Pakistan</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Inquiries and Bookings */}
      <Tabs defaultValue="inquiries" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inquiries">
            Inquiries ({filteredInquiries.length})
          </TabsTrigger>
          <TabsTrigger value="bookings">
            Bookings ({filteredBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inquiries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : paginatedInquiries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No inquiries found
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedInquiries.map((inquiry) => (
                    <Card key={inquiry.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {inquiry.first_name} {inquiry.last_name}
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {inquiry.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {inquiry.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {inquiry.city}, {inquiry.province}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {inquiry.organization}
                            </div>
                          </div>
                          {inquiry.subject && (
                            <div className="text-sm">
                              <strong>Subject:</strong> {inquiry.subject}
                            </div>
                          )}
                          {inquiry.message && (
                            <div className="text-sm">
                              <strong>Message:</strong> {inquiry.message}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Created: {new Date(inquiry.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteInquiry(inquiry.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : paginatedBookings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No bookings found
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedBookings.map((booking) => (
                    <Card key={booking.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {booking.first_name} {booking.last_name}
                            </h3>
                            {getStatusBadge(booking.status, 'booking')}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {booking.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {booking.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {booking.city}, {booking.province}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="w-4 h-4" />
                              {booking.organization}
                            </div>
                          </div>
                          <div className="text-sm">
                            <strong>Expedition:</strong> {booking.expedition_name}
                          </div>
                          {booking.message && (
                            <div className="text-sm">
                              <strong>Message:</strong> {booking.message}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            Created: {new Date(booking.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Select
                            value={booking.status}
                            onValueChange={(value) => updateBookingStatus(booking.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {Math.ceil(Math.max(filteredInquiries.length, filteredBookings.length) / itemsPerPage) > 1 && (
        <div className="flex justify-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4">
              Page {currentPage} of {Math.ceil(Math.max(filteredInquiries.length, filteredBookings.length) / itemsPerPage)}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => 
                Math.min(prev + 1, Math.ceil(Math.max(filteredInquiries.length, filteredBookings.length) / itemsPerPage))
              )}
              disabled={currentPage === Math.ceil(Math.max(filteredInquiries.length, filteredBookings.length) / itemsPerPage)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
