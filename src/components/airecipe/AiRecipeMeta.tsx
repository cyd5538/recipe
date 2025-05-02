import { AiRecipe } from "@/types/type";

interface AiRecipeMetaProps {
  cookTime: string;
  difficulty: string;
  materialPrice: string;
  createdAt: string;
}

const AiRecipeMeta = ({ cookTime, difficulty, materialPrice, createdAt }: AiRecipeMetaProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex items-center gap-1">
        <span>⏱️</span>
        <span>{cookTime}</span>
      </div>
      <div className="flex items-center gap-1">
        <span>📊</span>
        <span>난이도: {difficulty}</span>
      </div>
      <div className="flex items-center gap-1">
        <span>💰</span>
        <span>{materialPrice}</span>
      </div>
      <div className="flex items-center gap-1">
        <span>📅</span>
        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default AiRecipeMeta; 