import { useRouter } from "next/navigation";

interface Props {
  recipeId: string | undefined
}

const RecipeEditButton: React.FC<Props> = ({ recipeId }) => {
  const router = useRouter();

  const handleEditRecipe = () => {
    router.push(`/write?id=${recipeId}`);
  };

  return (
    <button 
    onClick={handleEditRecipe} 
    className="flex items-center gap-1 text-sm px-3 py-2 rounded-md border 
    border-gray-500 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-700 transition">
      수정
    </button>
  )
};

export default RecipeEditButton;
