import Link from "next/link";
import FAQ from "./components/FAQ";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <main className="min-h-screen bg-white text-gray-900">
        <div className="flex items-center justify-between w-full px-4 lg:px-40 py-2 lg:py-4 bg-white border-b">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold tracking-tight text-lg">
              InterviewAI
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/sign-up">
              <Button
                type="submit"
                variant="outline"
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 lg:py-24 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-[3.5rem] md:text-[4rem] leading-tight font-bold text-center mb-12 relative">
              Master your interviews with AI
              <span className="absolute -right-4 top-16 font-['Kalam'] text-2xl text-gray-600 font-normal whitespace-nowrap transform -rotate-6">
                not guesses 😊
              </span>
            </h1>

            <div className="max-w-3xl flex flex-col items-center mx-auto">
              <p className="text-lg md:text-xl text-center text-gray-600 mb-8">
                Actionable interview preparation tool for job seekers:
              </p>

              <div className="space-y-6 ">
                <div className="flex items-center gap-3 text-md text-gray-800">
                  <i className="fas fa-check text-rose-500"></i>
                  <p>Generate personalized interview questions for your role</p>
                </div>
                <div className="flex items-center gap-3 text-md text-gray-800">
                  <i className="fas fa-check text-rose-500"></i>
                  <p>Get instant AI feedback on your responses</p>
                </div>
                <div className="flex items-center gap-3 text-md text-gray-800">
                  <i className="fas fa-check text-rose-500"></i>
                  <p>Practice with real-world scenarios and examples</p>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <Link
                  href="/sign-up"
                  className="group bg-rose-500 text-white px-8 lg:px-16 py-4 rounded-2xl text-md hover:bg-rose-600 transition-all flex items-center gap-3 relative shadow-[0_6px_0_0_#be123c] hover:shadow-[0_4px_0_0_#be123c] hover:translate-y-[2px] active:translate-y-[6px] active:shadow-none"
                >
                  Ace Your Next Interview
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="py-24 md:px-6">
          <div className="container mx-auto">
            <div className="relative max-w-4xl mx-auto rounded-xl shadow-xl overflow-hidden border-8 border-gray-200">
              <div className="aspect-video bg-white flex items-center justify-center">
                {/* Replace src with your actual video URL */}
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/video-thumbnail.jpg"
                >
                  <source src="/demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 md:px-6">
          <div className="container mx-auto">
            <h3 className="text-rose-600 text-center mb-4 font-medium">
              HOW IT WORKS?
            </h3>
            <h2 className="text-gray-900 text-4xl font-bold text-center mb-16">
              Master your interviews in 3 steps
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Choose your focus",
                  description:
                    "Select your target role or company. Our AI tailors questions based on real interview patterns and requirements.",
                },
                {
                  step: 2,
                  title: "Practice with AI",
                  description:
                    "Engage in realistic interview scenarios. Get instant feedback on your responses and detailed improvement suggestions.",
                },
                {
                  step: 3,
                  title: "Track progress",
                  description:
                    "Monitor your improvement over time. Review past interviews and see your confidence grow with each practice session.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white p-8 rounded-2xl shadow-xl border-8 border-gray-100 transition-all relative"
                >
                  <div className="bg-rose-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl absolute -top-6">
                    {item.step}
                  </div>
                  <h3 className="text-gray-900 text-xl font-semibold mt-4 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-3xl p-6 md:p-20 border-8 border-gray-100 text-center space-y-8 md:space-y-12">
              <h2 className="text-4xl md:text-5xl font-bold text-black">
                Turn interviews into offers
              </h2>
              <p className="text-lg md:text-xl text-gray-800">
                Practice with AI and get actionable feedback
              </p>
              <Link
                href="/signup"
                className="inline-block bg-rose-500 text-white px-6 py-3 rounded-xl text-sm  hover:bg-rose-600 transition-all shadow-[0_4px_0_0_#be123c] hover:shadow-[0_4px_0_0_#be123c] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none"
              >
                Start your interview journey
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24  md:px-6">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Everything you need to know about our AI interview preparation
              platform
            </p>
            <div className="bg-white rounded-2xl shadow-lg">
              <FAQ />
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-white text-gray-600 py-16 md:px-6 border-t border-gray-100">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Company Info */}
              <div className="max-w-lg">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fas fa-brain text-rose-500 text-2xl"></i>
                  <span className="text-gray-900 text-xl font-semibold">
                    InterviewAI
                  </span>
                </div>
                <p className="mb-4 text-sm">
                  InterviewAI is your AI-powered interview preparation tool to
                  help you land your dream job with confidence.
                </p>
                <p className="text-sm text-gray-500">
                  Copyright © {new Date().getFullYear()} - All rights reserved
                </p>
                <div className="mt-4 text-sm">
                  <p className="flex items-center gap-2">
                    Made with <i className="fas fa-heart text-rose-500"></i> and{" "}
                    <i className="fas fa-coffee text-amber-600"></i> by
                    <Link
                      href="https://github.com/yourusername"
                      className="text-rose-500 hover:text-rose-600"
                    >
                      Anurag
                    </Link>
                  </p>
                </div>
              </div>

              {/* Links & Legal */}
              <div className="grid grid-cols-2 gap-8">
                {/* Links */}
                <div>
                  <h3 className="text-gray-900 font-semibold mb-4 text-sm">
                    LINKS
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/sign-in"
                        className="hover:text-rose-500 transition-colors"
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pricing"
                        className="hover:text-rose-500 transition-colors"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard"
                        className="hover:text-rose-500 transition-colors"
                      >
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="text-gray-900 text-sm font-semibold mb-4">
                    LEGAL
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/terms"
                        className="hover:text-rose-500 transition-colors"
                      >
                        Terms of services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/privacy"
                        className="hover:text-rose-500 transition-colors"
                      >
                        Privacy policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="hover:text-rose-500 transition-colors"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
