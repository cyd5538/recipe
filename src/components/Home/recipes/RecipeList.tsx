"use client";

import RecipeListCardView from './card-view/RecipeListCardView';
import { RecipeListView } from './list-view';
import ViewModeToggle from './ViewModeToggle';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const RecipeList = () => {
  const [viewMode, setViewMode] = useLocalStorage<"card" | "list">("viewMode", "card");

  return (
    <div>
      <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode}/>
      {viewMode === "list" ? <RecipeListView /> : <RecipeListCardView />}
    </div>
  )
}

export default RecipeList
