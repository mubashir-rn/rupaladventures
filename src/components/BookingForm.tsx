import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

interface BookingFormProps {
  expeditionName?: string;
  onClose?: () => void;
}

const BookingForm = ({ expeditionName, onClose }: BookingFormProps) => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [debugMode, setDebugMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    province: '',
    organization: '',
    country: '',
    subject: expeditionName || '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form with user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'city', 'country'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting to save inquiry with data:', formData);
      
      // Try to save inquiry to Supabase (regardless of authentication)
      let inquiryData = null;
      let inquiryError = null;
      
      try {
        const result = await supabase
          .from('inquiries')
          .insert({
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            province: formData.province || null,
            organization: formData.organization || null,
            country: formData.country,
            subject: formData.subject || null,
            message: formData.message || null
          })
          .select();
        
        inquiryData = result.data;
        inquiryError = result.error;
      } catch (tableError) {
        console.error('Table access error:', tableError);
        inquiryError = {
          message: 'Table "inquiries" does not exist. Please run the database setup script first.',
          code: 'TABLE_NOT_FOUND'
        };
      }

      if (inquiryError) {
        console.error('Inquiry database error:', inquiryError);
        console.error('Error details:', {
          message: inquiryError.message,
          details: inquiryError.details,
          hint: inquiryError.hint,
          code: inquiryError.code
        });
        if (inquiryError.code === 'TABLE_NOT_FOUND') {
          // Fallback: Save to localStorage temporarily
          const tempInquiries = JSON.parse(localStorage.getItem('tempInquiries') || '[]');
          tempInquiries.push({
            ...formData,
            timestamp: new Date().toISOString(),
            id: Date.now()
          });
          localStorage.setItem('tempInquiries', JSON.stringify(tempInquiries));
          
          toast({
            title: "Inquiry Saved Locally",
            description: "Your inquiry has been saved locally. It will be transferred to the database once setup is complete.",
            variant: "default"
          });
          
          // Continue with the rest of the process
        } else {
          toast({
            title: "Database Error",
            description: `Failed to save inquiry: ${inquiryError.message}`,
            variant: "destructive"
          });
          return;
        }
      }

      console.log('Inquiry saved successfully:', inquiryData);

      // Save booking to Supabase if user is authenticated
      if (isAuthenticated && user) {
        const { error: dbError } = await supabase
          .from('bookings')
          .insert({
            user_id: user.id,
            expedition_name: formData.subject,
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            province: formData.province,
            organization: formData.organization,
            country: formData.country,
            message: formData.message,
            status: 'pending'
          });

        if (dbError) {
          console.error('Booking database error:', dbError);
          // Don't return here as inquiry was already saved
        } else {
          toast({
            title: "Booking Saved!",
            description: "Your booking has been saved to our system.",
          });
        }
      } else {
        // Show success message for non-authenticated users
        toast({
          title: "Inquiry Saved!",
          description: "Your inquiry has been saved to our system. We'll get back to you soon!",
        });
      }

      // Create WhatsApp message
      const message = `
🏔️ EXPEDITION INQUIRY - ${formData.subject || 'General Inquiry'}

👤 CONTACT DETAILS:
• Name: ${formData.firstName} ${formData.lastName}
• Phone: ${formData.phone}
• Email: ${formData.email}
• City: ${formData.city}, ${formData.province}
• Country: ${formData.country}
• Organization: ${formData.organization}

📝 MESSAGE:
${formData.message || 'No additional message provided.'}

---
Sent via Rupal Adventures website booking form.
      `.trim();

      const whatsappUrl = `https://wa.me/923169457494?text=${encodeURIComponent(message)}`;
      
      // Also create email content
      const emailSubject = `Expedition Inquiry: ${formData.subject || 'General Inquiry'}`;
      const emailBody = `
Dear Rupal Adventures Team,

I am interested in booking an expedition and would like to provide the following details:

CONTACT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}
Location: ${formData.city}, ${formData.province}, ${formData.country}
Organization: ${formData.organization}

EXPEDITION: ${formData.subject || 'General Inquiry'}

MESSAGE:
${formData.message || 'No additional message provided.'}

I look forward to hearing from you about planning this adventure.

Best regards,
${formData.firstName} ${formData.lastName}
      `.trim();

      const emailUrl = `mailto:info@rupaladventures.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      toast({
        title: "Inquiry Prepared!",
        description: "Choose your preferred contact method to send your inquiry.",
      });

      // Open both WhatsApp and email options
      const userChoice = window.confirm(
        "Choose your contact method:\n\nOK = Send via WhatsApp (Recommended)\nCancel = Send via Email"
      );

      if (userChoice) {
        window.open(whatsappUrl, '_blank');
      } else {
        window.location.href = emailUrl;
      }

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        province: '',
        organization: '',
        country: '',
        subject: expeditionName || '',
        message: ''
      });

      if (onClose) {
        setTimeout(onClose, 1000);
      }

    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Error",
        description: "There was an issue preparing your inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Book Now / Inquiry
        </h2>
        <p className="text-muted-foreground">
          Please fill in the form below to get in touch with us regarding this trip.
        </p>
        
        {/* Authentication Status */}
        <div className="mt-4 p-4 rounded-lg border">
          {isAuthenticated ? (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">
                Logged in as {user?.name} - Your booking will be saved to your account
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm">
                Not logged in - 
                <button 
                  type="button" 
                  onClick={() => window.location.href = '/auth'}
                  className="text-blue-600 hover:underline ml-1 font-medium"
                >
                  Sign in to save your booking
                </button>
              </span>
            </div>
          )}
          
          {/* Debug Mode Toggle */}
          <div className="mt-3 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setDebugMode(!debugMode)}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              {debugMode ? 'Hide Debug Info' : 'Show Debug Info'}
            </button>
          </div>
          
          {debugMode && (
            <div className="mt-3 p-3 bg-gray-100 rounded text-xs">
              <div><strong>Debug Info:</strong></div>
              <div>Supabase URL: {process.env.NODE_ENV === 'development' ? 'Connected' : 'Production'}</div>
              <div>User ID: {user?.id || 'Not authenticated'}</div>
              <div>Form Data: {JSON.stringify(formData, null, 2)}</div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
              className="w-full"
              placeholder="Your first name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
              className="w-full"
              placeholder="Your last name"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              required
              className="w-full"
              placeholder="+92 3XX XXXXXXX"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Your Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              City <span className="text-destructive">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              required
              className="w-full"
              placeholder="Your city"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="province" className="text-sm font-medium">
              Province/State
            </Label>
            <Input
              id="province"
              type="text"
              value={formData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              className="w-full"
              placeholder="Your province or state (optional)"
            />
          </div>
        </div>

        {/* Organization and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="organization" className="text-sm font-medium">
              Organization
            </Label>
            <Input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              className="w-full"
              placeholder="Your organization or company (optional)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              Country <span className="text-destructive">*</span>
            </Label>
            <Select onValueChange={(value) => handleInputChange('country', value)} value={formData.country}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pakistan">Pakistan</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="china">China</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-sm font-medium">
            Subject
          </Label>
          <Input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="w-full"
            placeholder="Expedition name or inquiry subject"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-medium">
            Message
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="w-full min-h-[120px]"
            placeholder="Tell us about your experience level, preferred dates, special requirements, or any questions you have about the expedition..."
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Preparing..."
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Send Inquiry
              </>
            )}
          </Button>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => window.open('https://wa.me/923169457494', '_blank')}
              className="flex-1 sm:flex-none"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => window.location.href = 'mailto:info@rupaladventures.com'}
              className="flex-1 sm:flex-none"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
          <p>We typically respond within 24 hours. For urgent inquiries, contact us directly via WhatsApp.</p>
        </div>
      </form>
    </Card>
  );
};

export default BookingForm;