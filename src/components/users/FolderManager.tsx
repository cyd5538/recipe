import React, { useState } from 'react';
import { Folder } from '@/types/type';
import { useFavoriteFolders } from '@/hooks/useFavoritedRecipes';
import FolderTabs from './UserFolderTabs';
import AddFolderModal from './UserAddFolderModal';

interface FolderManagerProps {
  userId: string | null;
  onFolderSelect: (folder: Folder | null) => void;
  selectedFolder: Folder | null;
}

export const FolderManager: React.FC<FolderManagerProps> = ({
  userId,
  onFolderSelect,
  selectedFolder,
}) => {
  const {
    folders,
    isCreating,
    isDeleting,
    isRenaming,
    error,
    createFolder,
    deleteFolder,
    renameFolder,
  } = useFavoriteFolders(userId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [folderToRename, setFolderToRename] = useState<Folder | null>(null);

  const handleAddFolder = async (name: string) => {
    try {
      await createFolder(name);
      setIsModalOpen(false);
    } catch (err) {
      console.error('폴더 생성 실패 -->', err);
    }
  };

  const handleRenameFolder = async (name: string) => {
    if (!folderToRename) return;
    try {
      await renameFolder(folderToRename.id, name);
      setIsRenameModalOpen(false);
      setFolderToRename(null);
    } catch (err) {
      console.error('폴더 이름 변경 실패 -->', err);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    if (!confirm('정말로 이 폴더를 삭제하시겠습니까?')) return;
    try {
      await deleteFolder(folderId);
      if (selectedFolder?.id === folderId) {
        onFolderSelect(null);
      }
    } catch (err) {
      console.error('폴더 삭제 실패 -->', err);
    }
  };

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <>
      <FolderTabs
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={onFolderSelect}
        onAddFolder={() => setIsModalOpen(true)}
        onRenameFolder={(folderId) => {
          const folder = folders.find(f => f.id === folderId);
          if (folder) {
            setFolderToRename(folder);
            setIsRenameModalOpen(true);
          }
        }}
        onDeleteFolder={handleDeleteFolder}
        isDeleting={isDeleting}
        isRenaming={isRenaming}
      />

      <AddFolderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddFolder}
        loading={isCreating}
      />

      {folderToRename && (
        <AddFolderModal
          isOpen={isRenameModalOpen}
          onClose={() => {
            setIsRenameModalOpen(false);
            setFolderToRename(null);
          }}
          onAdd={handleRenameFolder}
          loading={isCreating}
          initialValue={folderToRename.name}
          title="폴더 이름 변경"
          submitText="변경"
        />
      )}
    </>
  );
}; 