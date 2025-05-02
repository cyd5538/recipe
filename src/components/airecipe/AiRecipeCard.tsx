import Link from "next/link";
import { AiRecipe } from "@/types/type";
import AiRecipeMeta from "./AiRecipeMeta";
import AiRecipeTags from "./AiRecipeTags";

interface AiRecipeCardProps {
  recipe: AiRecipe;
}

const AiRecipeCard = ({ recipe }: AiRecipeCardProps) => {
  return (
    <Link href={`/airecipe/${recipe.id}`}>
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{recipe.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 flex-grow">{recipe.content}</p>
        <AiRecipeTags tags={recipe.tags} />
        <AiRecipeMeta
          cookTime={recipe.cook_time}
          difficulty={recipe.difficulty}
          materialPrice={recipe.material_price}
          createdAt={recipe.created_at}
        />
      </div>
    </Link>
  );
};

export default AiRecipeCard; 