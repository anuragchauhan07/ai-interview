import { PreviousQuestion } from "@/lib/types";
import { useEffect, useState } from "react";
import { useSupabase } from "@/hooks/useSupabase";
import LoadingSpinner from "./LoadingSpinner";

const PreviousQuestions = () => {
  const [questions, setQuestions] = useState<PreviousQuestion[]>([]);
  const { fetchPreviousQuestions, loading } = useSupabase();

  useEffect(() => {
    fetchPreviousQuestions().then(setQuestions);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col justify-center mt-4">
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">No previous questions yet.</p>
          <p className="text-sm text-gray-500 mt-2">Your saved answers will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center mt-4">
      <p className="text-2xl font-semibold mb-6 text-black">
        Previous Questions
      </p>

      {questions.map((q, idx) => (
        <div key={`${q.id}-${idx}`} className="mb-4 bg-gray-50 p-4 rounded-lg ">
          <div>
            <p className="text-sm">
              <span className="font-medium ">Question:</span> {q.question}
            </p>
            <p className="text-sm text-gray-800 mt-2">
              <span className="font-medium ">Answer:</span> {q.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviousQuestions;
