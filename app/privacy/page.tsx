import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-4 py-12 md:py-24">
        <Link 
          href="/" 
          className="inline-flex items-center text-rose-500 hover:text-rose-600 mb-8 group"
        >
          <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
          Back to home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none space-y-8 text-gray-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p>When you use InterviewAI, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (email, name)</li>
              <li>Interview responses and practice session data</li>
              <li>Usage statistics and interaction data</li>
              <li>Technical information (device, browser type)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide personalized interview practice sessions</li>
              <li>Improve our AI feedback system</li>
              <li>Send relevant updates about our service</li>
              <li>Ensure platform security and prevent abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Protection</h2>
            <p>We implement industry-standard security measures to protect your data. Your interview responses and personal information are encrypted and stored securely.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request data deletion</li>
            </ul>
          </section>

          {/* <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">Email: anuragchauhan1923@gmail.com</p>
          </section> */}
        </div>
      </div>
    </main>
  );
} 