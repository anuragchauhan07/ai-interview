"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import Script from "next/script";
import { useUpdateUserTokens } from "@/hooks/useSupabase";
import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";


interface PricingPlan {
  originalPrice: number;
  price: number;
  tokens: number;
}

const pricingPlans: PricingPlan[] = [
  {
    originalPrice: 55,
    price: 1,
    tokens: 400,
  },
  {
    originalPrice: 75,
    price: 2,
    tokens: 2000,
  },
];

const features = [
  { text: "Generate AI-powered interview questions", link: null },
  { text: "Practice with realistic mock interviews", link: null },
  { text: "Get detailed AI feedback on your answers", link: null },
  { text: "Save questions for later review", link: null },
  { text: "Get AI generated answers", link: null },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { getUser } = useSupabase();
  const router = useRouter();

  const createOrder = async (amount: number, tokens: number) => {
    const user = await getUser();
    if (!user) return;

    setLoading(true);
    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({ amount: amount * 100 }),
    });
    const data = await res.json();

    const paymentData = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      order_id: data.id,

      handler: async function (response: any) {
        // verify payment
        const res = await fetch("/api/verifyOrder", {
          method: "POST",
          body: JSON.stringify({
            orderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (data.isOk) {
          useUpdateUserTokens({
            userId: user.id,
            tokens: tokens,
          });
          alert("Payment successful");
          router.push("/dashboard");
        } else {
          alert("Payment failed");
        }
      },
    };

    const payment = new (window as any).Razorpay(paymentData);
    payment.open();
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="container mx-auto px-6 py-6 lg:py-16">
        <div className="flex items-start mb-10 lg:mb-16  lg:px-8">
          <Link
            href="/dashboard"
            className="text-gray-600  bg-gray-100 px-4 py-2 rounded-md flex flex-row items-center border border-gray-100 gap-2 text-sm"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Features Section */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 rounded-[32px] p-10 border border-gray-100">
              <h2 className="text-[32px] font-bold mb-10">
                Showcase your preperation
              </h2>
              <ul className="space-y-6">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-[17px]"
                  >
                    <svg
                      className="w-5 h-5 text-[#10B981] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span
                      className={
                        feature.link
                          ? "underline decoration-dotted decoration-gray-400 text-gray-900"
                          : "text-gray-700"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingPlans.map((plan, index) => (
                <div
                  key={plan.price}
                  className={`relative bg-gray-50 rounded-[32px] p-10 border ${
                    index === 1 ? "border-[#F97316]" : "border-gray-100"
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 right-6">
                      <span className="bg-[#F97316] text-white px-4 py-1 rounded-full text-sm font-medium">
                        POPULAR
                      </span>
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-[22px] font-bold mb-6">
                      {plan.tokens} Tokens
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through text-lg">
                        ${plan.originalPrice}
                      </span>
                      <span className="text-[42px] font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 text-lg">USD</span>
                    </div>
                    <p className="text-gray-500 mt-3">
                      One-time payment. No subscription
                    </p>
                  </div>

                  <button
                    onClick={() => createOrder(plan.price, plan.tokens)}
                    disabled={loading}
                    className="w-full bg-rose-600 hover:bg-rose-600/90 text-white rounded-xl py-4 font-medium transition-all text-[17px]"
                  >
                    {loading ? "Processing..." : "BUY NOW"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
