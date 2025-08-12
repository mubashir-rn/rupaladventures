import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppFloat = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="hero"
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-pulse"
        onClick={() => window.open('https://wa.me/923169457494', '_blank')}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default WhatsAppFloat;