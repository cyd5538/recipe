"use client"

import React, { useState } from 'react';
import Loading from '../ui/loading';
import { Folder } from '@/types/type';
import { FolderManager } from './FolderManager';
import { FolderRecipeList } from './FolderRecipeList';
import { useFavoriteFolders } from '@/hooks/useFavoritedRecipes';

interface Props {
  userId: string | null;
}

const UserFavorite: React.FC<Props> = ({ userId }) => {
  const { folders, loading, error: folderError } = useFavoriteFolders(userId);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  // 첫 렌더링시 첫 번째 폴더 선택
  React.useEffect(() => {
    if (folders.length > 0 && !selectedFolder) {
      setSelectedFolder(folders[0]);
    }
  }, [folders, selectedFolder]);

  if (loading) {
    return <div className="mt-36"><Loading /></div>;
  }

  if (folderError) {
    return <div className="text-center py-8 text-red-500">{folderError}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FolderManager
        userId={userId}
        selectedFolder={selectedFolder}
        onFolderSelect={setSelectedFolder}
      />
      <FolderRecipeList
        folder={selectedFolder}
        folders={folders}
      />
    </div>
  );
};

export default UserFavorite;