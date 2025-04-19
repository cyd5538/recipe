import { deleteRecipe } from "@/lib/recipeService";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";

interface Props {
  recipeId: string | undefined
}

const RecipeDeleteButton: React.FC<Props> = ({ recipeId }) => {
  const router = useRouter();
  
  const handleDeleteRecipe = async () => {
    if (!recipeId) return;

    const confirmDelete = window.confirm("레시피를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const success = await deleteRecipe(recipeId);
    if (success) {
      router.push("/"); 
    }
  };

  return (
    <button 
    onClick={handleDeleteRecipe} 
    className="flex items-center gap-1 text-sm px-3 py-2 rounded-md border 
    border-gray-500 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-700 transition">
      삭제
    </button>
  );
};

export default RecipeDeleteButton;
