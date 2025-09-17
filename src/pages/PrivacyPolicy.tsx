import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    name: "Rupal Adventures Privacy Policy",
    url: "https://rupaladventures.com/privacy-policy",
    publisher: {
      "@type": "Organization",
      name: "Rupal Adventures"
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0]
  };

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how Rupal Adventures collects, uses, and protects your data across our website and applications."
        url="/privacy-policy"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Effective Date: 01 January 2024 • Last Updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-invert max-w-none space-y-6">
            <p>
              This Privacy Policy explains how <strong>Rupal Adventures</strong> ("we", "us", or "our") collects, uses, discloses, and protects your information when you use our website, services, and applications (collectively, the "Services").
            </p>

            <h2 className="text-2xl font-semibold text-foreground">App Scope & Purpose</h2>
            <p className="text-muted-foreground">
              Our mobile game application is provided <strong>free of charge</strong> and intended <strong>solely for entertainment purposes</strong>. This is a <strong>puzzle and mind game suitable for all age groups</strong>. This Privacy Policy applies to the game as distributed via app galleries and app stores (e.g., Google Play, Huawei AppGallery, Apple App Store) and to any related listings, promotional pages, and in-app experiences. There are no mandatory fees to access core gameplay features.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              <strong>For the Mobile Game App:</strong> We collect <strong>NO personal information</strong>. The game can be played immediately upon opening without any registration, data collection, or tracking. No accounts, emails, names, or personal details are required or collected.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>For the Website/Web App:</strong> We may collect the following information when you use our website services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Account & Contact Data</strong>: name, email, phone, password (hashed), profile details (only if you create an account).</li>
              <li><strong>Booking Data</strong>: expedition selections, dates, preferences, special requests (only if you make bookings).</li>
              <li><strong>Usage Data</strong>: pages viewed, interactions, referral URLs, device and browser info, approximate location.</li>
              <li><strong>Cookies & Similar Tech</strong>: for authentication, preferences, analytics, and performance.</li>
              <li><strong>User-Generated Content</strong>: posts, messages, feedback you submit.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              <strong>For the Mobile Game App:</strong> Since we collect no personal information, there is no data processing or usage of personal information. The game operates entirely offline and locally on your device.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>For the Website/Web App:</strong> We use collected information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide, operate, and improve the Services.</li>
              <li>Process bookings, inquiries, and customer support.</li>
              <li>Authenticate users, prevent fraud, and ensure security.</li>
              <li>Personalize content and remember preferences.</li>
              <li>Analyze performance and usage (e.g., web vitals, aggregated analytics).</li>
              <li>Communicate updates, offers, and service notices (you can opt out of marketing).</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground">3. Legal Bases (EEA/UK)</h2>
            <p className="text-muted-foreground">
              We process personal data where necessary for: contract performance, our legitimate interests (service improvement, security), compliance with legal obligations, and with your consent where required.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">4. Sharing & Disclosures</h2>
            <p className="text-muted-foreground">
              We do not sell personal information. We may share data with trusted service providers (e.g., hosting, analytics, email), professional advisors, or as required by law. Where necessary for expedition logistics, basic booking details may be shared with on-ground partners under confidentiality obligations.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">5. Cookies & Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar technologies for authentication, preferences, and analytics. You can control cookies via your browser settings. Some features may not function properly without certain cookies.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">5.1 Mobile App Analytics & Identifiers</h2>
            <p className="text-muted-foreground">
              If you install the game via an app gallery/store, the platform may process certain device identifiers or analytics events in accordance with its own privacy policy. We do not control those platform-level processes; please review the privacy policy of the respective app gallery/store (e.g., Google, Apple, Huawei).
            </p>

            <h2 className="text-2xl font-semibold text-foreground">6. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain personal data only as long as needed for the purposes described or as required by law. Account data is kept while your account is active; booking records may be kept for legal and tax purposes.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">7. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access, correct, or delete your personal information.</li>
              <li>Object to or restrict processing in certain situations.</li>
              <li>Data portability where applicable.</li>
              <li>Withdraw consent where processing is based on consent.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our mobile game app is designed for <strong>all age groups</strong> and collects no personal information, making it safe for children to play. Our website services are not directed to children under 13, and we do not knowingly collect personal data from children. If you believe a child has provided personal data through our website, contact us to remove it.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">9. International Transfers</h2>
            <p className="text-muted-foreground">
              Your information may be processed in countries other than your own. We implement safeguards for cross-border transfers as required by applicable law.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">10. Security</h2>
            <p className="text-muted-foreground">
              We use appropriate technical and organizational measures to protect personal data. However, no method of transmission or storage is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">11. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will post the updated version with a revised "Last Updated" date. Material changes may be communicated by additional notice.
            </p>

            <h2 className="text-2xl font-semibold text-foreground">12. Contact Us</h2>
            <p className="text-muted-foreground">
              For questions or requests related to privacy, contact: 
              <a className="text-accent underline" href="mailto:info@rupaladventures.com"> info@rupaladventures.com</a> or 
              <a className="text-accent underline" href="mailto:rupaladventures@gmail.com"> rupaladventures@gmail.com</a>, or WhatsApp at 
              <a className="text-accent underline" href="https://wa.me/923169457494" target="_blank" rel="noreferrer">+92 316 945 7494</a>.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;


