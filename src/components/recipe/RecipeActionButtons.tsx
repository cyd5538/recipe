
import { useAuthStore } from "@/store/authStore";
import RecipeEditButton from "./RecipeEditButton";
import RecipeDeleteButton from "./RecipeDeleteButton";

interface Props {
  recipeId: string 
}

const RecipeActionButtons: React.FC<Props> = ({ recipeId }) => {
  const { user } = useAuthStore();
  console.log(user?.id, recipeId)
  if (user?.id !== recipeId) {
    return null;
  }

  return (
    <div className="w-full flex justify-end my-2 gap-2">
      <RecipeEditButton recipeId={recipeId} />
      <RecipeDeleteButton recipeId={recipeId} />
    </div>
  );
};

export default RecipeActionButtons;
