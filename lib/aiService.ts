import { GoogleGenerativeAI } from "@google/generative-ai";
import { Question } from "@/lib/types";

const genAI = new GoogleGenerativeAI(
  "AIzaSyCxReVC8YkUIl-J8ImDpmshDiei42qYypk"
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateInterviewQuestions = async (jobDescription: string): Promise<Question[]> => {
  const result = await model.generateContent(
    `Generate 5 interview questions for a ${jobDescription} role. Provide explanations in brackets.`
  );

  if (!result) return [];

  return result.response
    .text()
    .split(/\n\n+/)
    .map((q) => {
      const match = q.match(/\*\*(.*?)\*\* \[(.*?)\]/);
      return match
        ? {
            question: match[1].trim(),
            explanation: match[2].trim(),
            userAnswer: "",
            aiResponse: "",
          }
        : null;
    })
    .filter(
      (q): q is Question => q !== null
    );
};

export const generateAIResponse = async (
  question: string,
  userAnswer: string,
  type: "answer" | "review"
): Promise<string> => {
  const prompt =
    type === "answer"
      ? `Provide a strong, professional answer for this interview question: ${question}`
      : `Review this interview response: ${userAnswer}. Provide feedback and suggestions.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}; 