import { useState } from "react";
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

interface BookingFormProps {
  expeditionName?: string;
  onClose?: () => void;
}

const BookingForm = ({ expeditionName, onClose }: BookingFormProps) => {
  const { toast } = useToast();
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'city', 'organization', 'country'];
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

      const emailUrl = `mailto:mbsirsakar5@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

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
              Province/State <span className="text-destructive">*</span>
            </Label>
            <Input
              id="province"
              type="text"
              value={formData.province}
              onChange={(e) => handleInputChange('province', e.target.value)}
              required
              className="w-full"
              placeholder="Your province or state"
            />
          </div>
        </div>

        {/* Organization and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="organization" className="text-sm font-medium">
              Organization <span className="text-destructive">*</span>
            </Label>
            <Input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              required
              className="w-full"
              placeholder="Your organization or company"
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
              onClick={() => window.location.href = 'mailto:mbsirsakar5@gmail.com'}
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