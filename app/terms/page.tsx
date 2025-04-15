import Link from "next/link";

export default function TermsOfService() {
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
        
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
        <div className="prose prose-lg max-w-none space-y-8 text-gray-600">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using InterviewBoostAI, you agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any part of these terms, you may not access our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
            <p>InterviewBoostAI provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI-powered interview practice sessions</li>
              <li>Personalized feedback on responses</li>
              <li>Interview preparation resources</li>
              <li>Progress tracking tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information</li>
              <li>Maintain the security of your account</li>
              <li>Not share account access</li>
              <li>Use the service for legitimate interview preparation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payments</h2>
            <p>Our service offers:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>One time payment for token purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
            <p>All content and materials available on InterviewBoostAI are protected by intellectual property rights. Users may not copy, modify, or distribute our content without permission.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p>InterviewBoostAI provides interview practice tools but does not guarantee job placement or interview success. We are not liable for any outcomes of your actual interviews or job applications.</p>
          </section>

          {/* <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
            <p>For any questions about these Terms of Service, please contact us at:</p>
            <p className="mt-2">Email: anuragchauhan1923@gmail.com</p>
          </section> */}
        </div>
      </div>
    </main>
  );
} 