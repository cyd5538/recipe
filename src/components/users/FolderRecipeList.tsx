import React from 'react';
import { Folder, RecipeData } from '@/types/type';
import RecipeCard from '../Home/recipes/RecipeCard';

interface FolderRecipeListProps {
  folder: Folder | null;
  folders: Folder[];
}

export const FolderRecipeList: React.FC<FolderRecipeListProps> = ({
  folder,
  folders,
}) => {
  // FolderRecipe를 RecipeData로 변환하는 함수
  const convertToRecipeData = (folderRecipe: Folder['recipes'][0]): RecipeData => ({
    id: folderRecipe.id,
    user_id: '',
    title: folderRecipe.title,
    content: '', 
    category: folderRecipe.category || "", 
    cook_time: folderRecipe.cook_time.toString(),
    difficulty: folderRecipe.difficulty,
    material_price: folderRecipe.material_price,
    thumbnail_url: folderRecipe.thumbnail_url,
    created_at: folderRecipe.created_at,
    ingredients: [],
    steps: [],
    views: 0, 
    total_likes: 0, 
    total_comments: 0,
    tags: [], 
    likes_count: 0, 
    author_nickname: '',
    author_avatar_url: '', 
    is_favorited: true,
  });

  if (!folder) {
    return (
      <div className="text-center py-8 text-gray-500">
        {folders.length === 0 ? '즐겨찾기한 폴더가 없습니다.' : '폴더를 선택해주세요.'}
      </div>
    );
  }

  if (folder.recipes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        이 폴더에 저장된 레시피가 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
      {folder.recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={convertToRecipeData(recipe)} />
      ))}
    </div>
  );
}; 