"use client";

import { useFetchRecipe } from '@/hooks/useFetchRecipe';
import Loading from '@/components/ui/loading';
import { RecipePagenation } from './RecipePagenation';
import { useState } from 'react';
import RecipeListCardView from './RecipeListCardView';

const RecipeList = () => {
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 12;

  const { recipes, loading, error, totalCount } = useFetchRecipe(page, PAGE_SIZE);

  if (loading) return <Loading className='mt-48'/>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (recipes.length === 0) return <div className='h-full mt-48 w-full text-center'>레시피가 없습니다.</div>;

  return (
    <div>
      <RecipeListCardView recipes={recipes} />
      <RecipePagenation page={page} totalCount={totalCount} pageSize={PAGE_SIZE} setPage={setPage} />
    </div>
  );
};


export default RecipeList
