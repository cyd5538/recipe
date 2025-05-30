import { useAuthStore } from "@/store/authStore";
import RecipeEditButton from "./RecipeEditButton";
import RecipeDeleteButton from "./RecipeDeleteButton";
import RecipeCopyButton from "./RecipeCopyButton";
import RecipeFavoriteButton from "./RecipeFavoriteButton";

interface Props {
  userId: string;
  postId: string | undefined;
}

const RecipeActionButtons: React.FC<Props> = ({ userId, postId }) => {
  const { user } = useAuthStore();
  const isOwner = user?.id === userId;

  return (
    <div className="w-full flex justify-end my-2 gap-2">
      {postId && (
        <RecipeFavoriteButton
          recipeId={postId}
        />
      )}
      <RecipeCopyButton />
      {isOwner && (
        <>
          <RecipeEditButton recipeId={postId} />
          <RecipeDeleteButton recipeId={postId} />
        </>
      )}
    </div>
  );
};

export default RecipeActionButtons;
