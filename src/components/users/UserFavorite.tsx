"use client"

import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import Loading from '../ui/loading';
import { useFavoriteFolders } from '@/hooks/useFavoritedRecipes';
import { Folder, RecipeData } from '@/types/type';
import AddFolderModal from './UserAddFolderModal';
import FolderTabs from './UserFolderTabs';
import RecipeCard from '../Home/recipes/RecipeCard';

interface Prop {
  userId: string | null
}

const UserFavorite: React.FC<Prop> = ({ userId }) => {
  const { folders, loading, error } = useFavoriteFolders(userId);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 첫 렌더링시 첫 번째 폴더 선택
  useEffect(() => {
    if (folders.length > 0 && !selectedFolder) {
      setSelectedFolder(folders[0]);
    }
  }, [folders, selectedFolder]);

  const handleAddFolder = (name: string) => {
    // TODO: 폴더 추가 로직 구현
    console.log('새 폴더 추가:', name);
  };

  // FolderRecipe를 RecipeData로 변환하는 함수 (RecipeCard 재사용하기 위한 함수)
  const convertToRecipeData = (folderRecipe: Folder['recipes'][0]): RecipeData => ({
    id: folderRecipe.id,
    user_id: '',
    title: folderRecipe.title,
    content: '', 
    category: '', 
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

  if (loading) {
    return <div className="mt-36"><Loading /></div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <FolderTabs
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
        onAddFolder={() => setIsModalOpen(true)}
      />

      {/* 선택된 폴더의 레시피 목록 */}
      {selectedFolder ? (
        <div className="mt-6">
          {selectedFolder.recipes.length > 0 ? (
            <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
              {selectedFolder.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={convertToRecipeData(recipe)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              이 폴더에 저장된 레시피가 없습니다.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {folders.length === 0 ? '즐겨찾기한 폴더가 없습니다.' : '폴더를 선택해주세요.'}
        </div>
      )}

      <AddFolderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddFolder}
      />
    </motion.div>
  );
};

export default UserFavorite