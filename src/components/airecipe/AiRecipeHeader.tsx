import { motion } from "framer-motion";

interface AiRecipeHeaderProps {
  title: string;
  content: string;
  category: string;
  difficulty: string;
  cookTime: string;
  materialPrice: string;
  isAiGenerated: boolean;
  tags: string[];
  createdAt: string;
}

const AiRecipeHeader: React.FC<AiRecipeHeaderProps> = ({
  title,
  content,
  category,
  difficulty,
  cookTime,
  materialPrice,
  isAiGenerated,
  tags,
  createdAt,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-zinc-800">{title}</h1>
          <p className="text-lg text-zinc-600 mb-4">{content}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-zinc-100 rounded-full text-zinc-700 text-sm">
              🍳 {category}
            </span>
            <span className="px-3 py-1.5 bg-zinc-100 rounded-full text-zinc-700 text-sm">
              {difficulty === 'easy' ? '😊' : difficulty === 'medium' ? '🤔' : '😅'} {difficulty}
            </span>
            <span className="px-3 py-1.5 bg-zinc-100 rounded-full text-zinc-700 text-sm">
              ⏰ {cookTime}
            </span>
            <span className="px-3 py-1.5 bg-zinc-100 rounded-full text-zinc-700 text-sm">
              💰 {materialPrice}
            </span>
            {isAiGenerated && (
              <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm">
                🤖 AI 생성
              </span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags?.map((tag: string) => (
              <span
                key={tag}
                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-zinc-500 text-sm">
          {new Date(createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
};

export default AiRecipeHeader; 