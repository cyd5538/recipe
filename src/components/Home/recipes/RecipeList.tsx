"use client";

import { useFetchRecipe } from '@/hooks/useFetchRecipe';
import RecipeListCardView from './card-view/RecipeListCardView';
import { RecipeListView } from './list-view';
import ViewModeToggle from './ViewModeToggle';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Loading from '@/components/ui/loading';

const RecipeList = () => {
  const [viewMode, setViewMode] = useLocalStorage<"card" | "list">("viewMode", "card");

  const { recipes, loading, error } = useFetchRecipe();
  console.log(recipes)

  if (loading) return <Loading className='mt-48'/>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (recipes.length === 0) return <div className='h-full mt-48 w-full text-center'>레시피가 없습니다.</div>

  return (
    <div>
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode}/>
      {viewMode === "list" ? <RecipeListView /> : <RecipeListCardView recipes={recipes}/>}
    </div>
  )
}

export default RecipeList
