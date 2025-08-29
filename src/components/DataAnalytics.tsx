import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  MapPin, 
  Building,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Clock
} from 'lucide-react';

interface AnalyticsData {
  totalInquiries: number;
  totalBookings: number;
  conversionRate: number;
  monthlyData: {
    month: string;
    inquiries: number;
    bookings: number;
  }[];
  countryData: {
    country: string;
    count: number;
    percentage: number;
  }[];
  organizationData: {
    organization: string;
    count: number;
    percentage: number;
  }[];
  statusDistribution: {
    status: string;
    count: number;
    percentage: number;
  }[];
  topExpeditions: {
    expedition: string;
    inquiries: number;
    bookings: number;
  }[];
}

const DataAnalytics = () => {
  const { user, isAuthenticated } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalInquiries: 0,
    totalBookings: 0,
    conversionRate: 0,
    monthlyData: [],
    countryData: [],
    organizationData: [],
    statusDistribution: [],
    topExpeditions: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months');

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalyticsData();
    }
  }, [isAuthenticated, timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Calculate date range
      const now = new Date();
      let startDate = new Date();
      
      switch (timeRange) {
        case '1month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case '6months':
          startDate.setMonth(now.getMonth() - 6);
          break;
        case '1year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          startDate.setMonth(now.getMonth() - 6);
      }

      // Fetch inquiries
      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('inquiries')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      if (inquiriesError) {
        console.error('Error fetching inquiries:', inquiriesError);
        return;
      }

      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        return;
      }

      // Process data
      const processedData = processAnalyticsData(inquiriesData || [], bookingsData || []);
      setAnalyticsData(processedData);

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (inquiries: any[], bookings: any[]): AnalyticsData => {
    // Monthly data
    const monthlyData = generateMonthlyData(inquiries, bookings);
    
    // Country data
    const countryData = generateCountryData(inquiries);
    
    // Organization data
    const organizationData = generateOrganizationData(inquiries);
    
    // Status distribution
    const statusDistribution = generateStatusDistribution(inquiries, bookings);
    
    // Top expeditions
    const topExpeditions = generateTopExpeditions(inquiries, bookings);

    return {
      totalInquiries: inquiries.length,
      totalBookings: bookings.length,
      conversionRate: inquiries.length > 0 ? (bookings.length / inquiries.length) * 100 : 0,
      monthlyData,
      countryData,
      organizationData,
      statusDistribution,
      topExpeditions
    };
  };

  const generateMonthlyData = (inquiries: any[], bookings: any[]) => {
    const months: { [key: string]: { inquiries: number; bookings: number } } = {};
    
    // Initialize months
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      months[monthKey] = { inquiries: 0, bookings: 0 };
    }

    // Count inquiries by month
    inquiries.forEach(inquiry => {
      const date = new Date(inquiry.created_at);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (months[monthKey]) {
        months[monthKey].inquiries++;
      }
    });

    // Count bookings by month
    bookings.forEach(booking => {
      const date = new Date(booking.created_at);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      if (months[monthKey]) {
        months[monthKey].bookings++;
      }
    });

    return Object.entries(months)
      .reverse()
      .map(([month, data]) => ({
        month,
        inquiries: data.inquiries,
        bookings: data.bookings
      }));
  };

  const generateCountryData = (inquiries: any[]) => {
    const countryCounts: { [key: string]: number } = {};
    const total = inquiries.length;

    inquiries.forEach(inquiry => {
      const country = inquiry.country || 'Unknown';
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });

    return Object.entries(countryCounts)
      .map(([country, count]) => ({
        country,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const generateOrganizationData = (inquiries: any[]) => {
    const orgCounts: { [key: string]: number } = {};
    const total = inquiries.length;

    inquiries.forEach(inquiry => {
      const org = inquiry.organization || 'Unknown';
      orgCounts[org] = (orgCounts[org] || 0) + 1;
    });

    return Object.entries(orgCounts)
      .map(([organization, count]) => ({
        organization,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  };

  const generateStatusDistribution = (inquiries: any[], bookings: any[]) => {
    const statusCounts: { [key: string]: number } = {};
    const total = inquiries.length + bookings.length;

    // Count inquiry statuses
    inquiries.forEach(inquiry => {
      const status = inquiry.status || 'unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    // Count booking statuses
    bookings.forEach(booking => {
      const status = `booking_${booking.status}` || 'unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return Object.entries(statusCounts)
      .map(([status, count]) => ({
        status: status.replace('_', ' '),
        count,
        percentage: total > 0 ? (count / total) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count);
  };

  const generateTopExpeditions = (inquiries: any[], bookings: any[]) => {
    const expeditionCounts: { [key: string]: { inquiries: number; bookings: number } } = {};

    // Count inquiries by expedition
    inquiries.forEach(inquiry => {
      const expedition = inquiry.subject || 'General Inquiry';
      if (!expeditionCounts[expedition]) {
        expeditionCounts[expedition] = { inquiries: 0, bookings: 0 };
      }
      expeditionCounts[expedition].inquiries++;
    });

    // Count bookings by expedition
    bookings.forEach(booking => {
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
      .slice(0, 10);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'new': 'bg-blue-500',
      'in progress': 'bg-yellow-500',
      'contacted': 'bg-purple-500',
      'completed': 'bg-green-500',
      'cancelled': 'bg-red-500',
      'pending': 'bg-orange-500',
      'confirmed': 'bg-green-500',
      'booking pending': 'bg-orange-500',
      'booking confirmed': 'bg-green-500',
      'booking cancelled': 'bg-red-500'
    };
    return colors[status.toLowerCase()] || 'bg-gray-500';
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-muted-foreground">You must be logged in to view analytics.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2">Loading analytics...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Data Analytics</h1>
        <div className="flex items-center gap-4">
          <Label htmlFor="timeRange">Time Range:</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalInquiries}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 text-green-500 mr-1" />
              +{analyticsData.totalInquiries > 0 ? Math.round(analyticsData.totalInquiries / 6) : 0} per month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 text-green-500 mr-1" />
              +{analyticsData.totalBookings > 0 ? Math.round(analyticsData.totalBookings / 6) : 0} per month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.conversionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Inquiries to Bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">
              Target response time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Data Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.monthlyData.map((monthData, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{monthData.month}</span>
                    <span className="text-muted-foreground">
                      {monthData.inquiries} inquiries, {monthData.bookings} bookings
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(monthData.inquiries / Math.max(...analyticsData.monthlyData.map(m => m.inquiries))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Expeditions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Top Expeditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topExpeditions.map((expedition, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium truncate">{expedition.expedition}</span>
                    <span className="text-muted-foreground">
                      {expedition.inquiries + expedition.bookings} total
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ 
                        width: `${((expedition.inquiries + expedition.bookings) / Math.max(...analyticsData.topExpeditions.map(e => e.inquiries + e.bookings))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {expedition.inquiries} inquiries, {expedition.bookings} bookings
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Country Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Country Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.countryData.map((country, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{country.country}</span>
                    <span className="text-muted-foreground">
                      {country.count} ({country.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.statusDistribution.map((status, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(status.status)}`}></div>
                      <span className="font-medium">{status.status}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {status.count} ({status.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getStatusColor(status.status)}`}
                      style={{ width: `${status.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Organization Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analyticsData.organizationData.map((org, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium truncate">{org.organization}</span>
                  <span className="text-sm text-muted-foreground">{org.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${org.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {org.percentage.toFixed(1)}% of total inquiries
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataAnalytics;
