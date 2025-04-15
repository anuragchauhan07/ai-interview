'use client';

import { useState } from "react";

// FAQ Data
const faqData = [
  {
    question: "What types of interviews can I practice?",
    answer: "You can practice a wide range of interviews including technical interviews for software engineering, behavioral interviews, leadership interviews, and domain-specific interviews for various roles like product management, data science, and more."
  },
  {
    question: "How does the AI feedback work?",
    answer: "Our AI analyzes your responses based on multiple factors including relevance, completeness, clarity, and professional best practices. It provides detailed feedback on areas of improvement and suggests better ways to structure your answers."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! You can start with our free tier which includes 5 practice interviews per month. This allows you to experience our AI-powered interview preparation before committing to a subscription."
  },
  {
    question: "Can I practice technical coding interviews?",
    answer: "Absolutely! Our platform includes a specialized technical interview module with real-time code execution, problem-solving scenarios, and AI feedback on both your code quality and explanation clarity."
  },
  {
    question: "How personalized are the interview questions?",
    answer: "Questions are tailored to your specific role, experience level, and industry. Our AI considers your background and target position to generate relevant and challenging questions that match real interview scenarios."
  },
  {
    question: "Do you offer interview questions for specific companies?",
    answer: "Yes, we have a database of company-specific interview patterns and questions for many top employers. You can practice with questions commonly asked at your target companies."
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0 ">
      <button
        className="w-full py-6 px-6 text-left flex justify-between items-center gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-gray-900">{question}</span>
        <span className={`text-rose-500 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
          <i className="fas fa-plus text-xl"></i>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 px-6">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </>
  );
} 