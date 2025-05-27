import { RecipeData } from "@/types/type";
import { motion } from "framer-motion";
import RecipeListCardView from "../Home/recipes/RecipeListCardView";

interface Props {
  recipes: RecipeData[];
  showTitle: boolean;
}

const UserRecipesList:React.FC<Props> = ({ recipes, showTitle }: { recipes: RecipeData[], showTitle: boolean }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className=""
  >
    {showTitle && <h2 className="text-xl font-semibold mb-4">작성한 레시피</h2>}
    {recipes.length === 0 ? (
      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
        아직 작성한 레시피가 없습니다.
      </p>
    ) : (
      <RecipeListCardView recipes={recipes} />
    )}
  </motion.div>
);

export default UserRecipesList;