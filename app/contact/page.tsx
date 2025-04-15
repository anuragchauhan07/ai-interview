"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toast } from "@/components/ui/toast";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setToast({ message: 'Message sent successfully!', type: 'success' });
        e.currentTarget.reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      setToast({ message: error instanceof Error ? error.message : 'Failed to send message', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600">Have questions about InterviewBoostAI? We'd love to hear from you.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <i className="fas fa-envelope text-rose-500 mt-1"></i>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">anuragchauhan1923@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <i className="fas fa-clock text-rose-500 mt-1"></i>
                <div>
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                  <p className="text-gray-600">We typically respond within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-rose-500 text-white hover:bg-rose-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
} 