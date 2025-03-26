import { RecipeData } from "@/types/type";

interface RecipeInfoProps {
  recipe: RecipeData;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe }) => (
  <div className="mt-6 flex flex-wrap gap-2">
    <span className="px-4 py-2 rounded-xl border">⏳ 요리시간 {recipe.cook_time}</span>
    <span className="px-4 py-2 rounded-xl border">💰 재료비 {recipe.material_price}</span>
    <span className="px-4 py-2 rounded-xl border">🔥 난이도 {recipe.difficulty}</span>
  </div>
);
export default RecipeInfo;