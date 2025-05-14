import { motion } from "framer-motion";
import CookingAnimation from "./CookingAnimation";

interface QuestionFormProps {
  question: string;
  setQuestion: (question: string) => void;
  exampleQuestions: string[];
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function QuestionForm({ 
  question, 
  setQuestion, 
  exampleQuestions, 
  isLoading, 
  onSubmit 
}: QuestionFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        type="text"
        placeholder="예: 로제 파스타 레시피 알려줘"
        className="w-full border border-zinc-300 dark:border-zinc-600 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      />
      <div className="flex flex-wrap gap-2">
        {exampleQuestions.map((ex, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setQuestion(ex)}
            className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-zinc-700 dark:text-white text-sm hover:bg-red-200 transition"
          >
            {ex}
          </button>
        ))}
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? <CookingAnimation isLoading={isLoading} variant="button" /> : "질문하기"}
      </motion.button>
    </form>
  );
} 