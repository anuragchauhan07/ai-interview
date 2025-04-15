import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/lib/types";
import StyledText from "./StyledText";
import LoadingSpinner from "./LoadingSpinner";

interface InterviewQuestionsProps {
  questions: Question[];
  loading: {
    generate: boolean;
    questions: { [key: number]: { answer: boolean; review: boolean } };
  };
  isSupabaseLoading: boolean;
  generateAIResponse: (index: number, type: "answer" | "review") => void;
  saveAnswer: (question: string, answer: string) => void;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const InterviewQuestions = ({
  questions,
  loading,
  isSupabaseLoading,
  generateAIResponse,
  saveAnswer,
  setQuestions,
}: InterviewQuestionsProps) => {
  if (questions.length === 0) {
    return (
      <div className="w-full text-center py-12 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Questions Generated Yet</h3>
        <p className="text-gray-600">Enter a job description and click generate to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {questions.map((q, idx) => (
        <Card
          key={idx}
          className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Question {idx + 1}
                </h3>
                <p className="text-gray-800">{q.question}</p>
                {q.explanation && (
                  <p className="text-sm text-gray-600 italic mt-2">{q.explanation}</p>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer
                </label>
                <Textarea
                  value={q.userAnswer}
                  onChange={(e) =>
                    setQuestions((prev) =>
                      prev.map((q, i) =>
                        i === idx ? { ...q, userAnswer: e.target.value } : q
                      )
                    )
                  }
                  placeholder="Type your answer..."
                  className="mt-1 block w-full border-gray-200 focus:border-gray-400 focus:ring-gray-400 min-h-[120px]"
                />
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <Button
                  onClick={() => generateAIResponse(idx, "answer")}
                  disabled={loading.questions[idx]?.answer || loading.generate}
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading.questions[idx]?.answer ? (
                    <>
                      <LoadingSpinner />
                      <span>Generating Answer...</span>
                    </>
                  ) : (
                    "Generate AI Answer"
                  )}
                </Button>
                <Button
                  onClick={() => generateAIResponse(idx, "review")}
                  disabled={loading.questions[idx]?.review || loading.generate}
                  className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading.questions[idx]?.review ? (
                    <>
                      <LoadingSpinner />
                      <span>Reviewing...</span>
                    </>
                  ) : (
                    "Review My Answer"
                  )}
                </Button>
                <Button
                  onClick={() => saveAnswer(q.question, q.userAnswer)}
                  disabled={isSupabaseLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isSupabaseLoading ? (
                    <>
                      <LoadingSpinner />
                      <span>Saving...</span>
                    </>
                  ) : (
                    "Save Answer"
                  )}
                </Button>
              </div>

              {q.aiResponse && (
                <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-4">AI Response</h4>
                  <div className="space-y-2">
                    <StyledText text={q.aiResponse} />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InterviewQuestions;
