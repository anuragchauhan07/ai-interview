export interface Question {
  question: string;
  explanation: string;
  userAnswer: string;
  aiResponse: string;
}

export interface PreviousQuestion {
  id: string;
  question: string;
  answer: string;
  created_on?: string;
  user_id?: string;
}