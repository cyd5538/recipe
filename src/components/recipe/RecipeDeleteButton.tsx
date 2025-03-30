import { deleteRecipe } from "@/lib/recipeService";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";

interface Props {
  recipeId: string 
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
    <CustomButton
      onClick={handleDeleteRecipe}
      text="삭제"
      className="border-red-500 text-red-500 hover:shadow-[4px_4px_0px_0px_rgba(250,20,0)]"
    />
  );
};

export default RecipeDeleteButton;
