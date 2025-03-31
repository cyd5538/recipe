import { useRouter } from "next/navigation";
import CustomButton from "../ui/CustomButton";

interface Props {
  recipeId: string | undefined
}

const RecipeEditButton: React.FC<Props> = ({ recipeId }) => {
  const router = useRouter();

  const handleEditRecipe = () => {
    router.push(`/write?id=${recipeId}`);
  };

  return <CustomButton onClick={handleEditRecipe} text="수정" />;
};

export default RecipeEditButton;
