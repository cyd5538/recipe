import React from 'react';
import RecipeTitleSection from './RecipeTitleSection';
import RecipeImage from '../shared/RecipeImage';
import { RecipeData } from '@/types/type';
import { useRouter } from 'next/navigation'

interface Prop {
  recipe: RecipeData
  isEven: boolean
}

const RecipeTableRow:React.FC<Prop> = ({ recipe, isEven }) => {
  const router = useRouter()



  const navigateRecipe = () => {
    router.push(`/recipe?id=${recipe.id as string}`)
  }

  return (
    <tr
      onClick={navigateRecipe}
      className={`mt-12 md:m-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${isEven ? 'bg-gray-100 dark:bg-zinc-700' : 'bg-white dark:bg-transparent'
        }`}
    >
      <RecipeTitleSection title={recipe.title} tags={recipe.tags} description={recipe.content} />
      <td className="p-2 text-center">{recipe.category}</td>
      <td className="p-2 text-center">{recipe.cook_time}</td>
      <td className="p-2 text-center">{recipe.difficulty}</td>
      <td className="p-2 hidden 1125px:table-cell text-center">
        <RecipeImage src={recipe.thumbnail_url as string} alt={recipe.title} />
      </td>
    </tr>
  );
};

export default RecipeTableRow;