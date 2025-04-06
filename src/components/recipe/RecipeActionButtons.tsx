
import { useAuthStore } from "@/store/authStore";
import RecipeEditButton from "./RecipeEditButton";
import RecipeDeleteButton from "./RecipeDeleteButton";

interface Props {
  userId: string
  postId: string | undefined
}

const RecipeActionButtons: React.FC<Props> = ({ userId, postId }) => {
  const { user } = useAuthStore();

  if (user?.id !== userId) {
    return null;
  }

  return (
    <div className="w-full flex justify-end my-2 gap-2">
      <RecipeEditButton recipeId={postId} />
      <RecipeDeleteButton recipeId={postId} />
    </div>
  );
};

export default RecipeActionButtons;
