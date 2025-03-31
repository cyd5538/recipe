
import { useAuthStore } from "@/store/authStore";
import RecipeEditButton from "./RecipeEditButton";
import RecipeDeleteButton from "./RecipeDeleteButton";

interface Props {
  recipeId: string 
  postId: string | undefined
}

const RecipeActionButtons: React.FC<Props> = ({ recipeId, postId }) => {
  const { user } = useAuthStore();

  if (user?.id !== recipeId) {
    return null;
  }

  return (
    <div className="w-full flex justify-end my-2 gap-2">
      <RecipeEditButton recipeId={postId} />
      <RecipeDeleteButton recipeId={recipeId} />
    </div>
  );
};

export default RecipeActionButtons;
