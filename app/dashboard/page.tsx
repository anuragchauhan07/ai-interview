"use client";

import { useState } from "react";
import { Question } from "@/lib/types";
import { useSupabase } from "@/hooks/useSupabase";
import {
  generateInterviewQuestions,
  generateAIResponse,
} from "@/lib/aiService";
import QuestionGenerator from "@/components/shared/QuestionGenerator";
import InterviewQuestions from "@/components/shared/InterviewQuestions";
import PreviousQuestions from "@/components/shared/PreviousQuestions";
import { Toast } from "@/components/ui/toast";

export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState<{
    generate: boolean;
    questions: { [key: number]: { answer: boolean; review: boolean } };
  }>({
    generate: false,
    questions: {},
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: 'error' | 'warning' | 'success';
  } | null>(null);
  const { saveAnswer, loading: isSupabaseLoading, userTokens, updateTokens } = useSupabase();

  async function handleGenerateQuestions() {
    if (!userTokens || userTokens < 4) {
      setToast({
        message: "You need at least 20 tokens to generate questions. Please purchase more tokens to continue.",
        type: 'warning'
      });
      return;
    }

    setLoading((prev) => ({ ...prev, generate: true }));
    try {
      const newQuestions = await generateInterviewQuestions(jobDescription);
      if (newQuestions.length > 0) {
        await updateTokens(20); // Deduct 4 tokens for generating questions
        setQuestions(newQuestions);
        setToast({
          message: `Successfully generated questions! ${userTokens - 20} tokens remaining.`,
          type: 'success'
        });
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      setToast({
        message: "Failed to generate questions. Please try again.",
        type: 'error'
      });
    } finally {
      setLoading((prev) => ({ ...prev, generate: false }));
    }
  }

  async function handleGenerateAIResponse(
    index: number,
    type: "answer" | "review"
  ) {
    setLoading((prev) => ({
      ...prev,
      questions: {
        ...prev.questions,
        [index]: {
          ...prev.questions[index],
          [type]: true,
        },
      },
    }));
    try {
      const question = questions[index];
      const response = await generateAIResponse(
        question.question,
        question.userAnswer,
        type
      );

      setQuestions((prev) =>
        prev.map((q, i) => (i === index ? { ...q, aiResponse: response } : q))
      );
    } catch (error) {
      console.error("Error generating AI response:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        questions: {
          ...prev.questions,
          [index]: {
            ...prev.questions[index],
            [type]: false,
          },
        },
      }));
    }
  }

  return (
    <div className="min-h-screen w-full">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <QuestionGenerator
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              generateQuestions={handleGenerateQuestions}
              loading={loading.generate}
            />
            <InterviewQuestions
              questions={questions}
              loading={loading}
              isSupabaseLoading={isSupabaseLoading}
              generateAIResponse={handleGenerateAIResponse}
              saveAnswer={saveAnswer}
              setQuestions={setQuestions}
            />
          </div>

          <div className="lg:col-span-1 flex justify-center">
            <div className="border-l border-gray-200 h-full"></div>
          </div>

          <div className="lg:col-span-4">
            <PreviousQuestions />
          </div>
        </div>
      </div>
    </div>
  );
}
