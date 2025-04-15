import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "./LoadingSpinner";

interface QuestionGeneratorProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  generateQuestions: () => void;
  loading: boolean;
}

const QuestionGenerator = ({
  jobDescription,
  setJobDescription,
  generateQuestions,
  loading,
}: QuestionGeneratorProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter Job Description"
          className="border-gray-200 focus:border-gray-400 focus:ring-gray-400 flex-1"
        />
        <Button
          className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={generateQuestions}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoadingSpinner />
              <span>Generating...</span>
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuestionGenerator; 