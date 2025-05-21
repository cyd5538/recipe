import { useEffect, useState } from "react";
import { fetchFavoriteFolders, deleteFavoriteFolder, renameFavoriteFolder, createFavoriteFolder } from "@/lib/userFavoriteFolder";
import { Folder } from "@/lib/userFavoriteFolder";
import { toast } from "sonner";

export const useFavoriteFolders = (userId: string | null) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchData = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFavoriteFolders();
      setFolders(result);
    } catch (err) {
      setError("즐겨찾기 폴더를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleDeleteFolder = async (folderId: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteFavoriteFolder(folderId);
      setFolders(prev => prev.filter(folder => folder.id !== folderId));
      toast.success("폴더가 삭제되었습니다.");
    } catch (err) {
      console.error("폴더 삭제 실패:", err);
      setError("폴더 삭제에 실패했습니다.");
      toast.error("폴더 삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleRenameFolder = async (folderId: string, newName: string) => {
    try {
      setLoading(true);
      setError(null);
      await renameFavoriteFolder(folderId, newName);
      setFolders(prev => prev.map(folder => 
        folder.id === folderId ? { ...folder, name: newName } : folder
      ));
      toast.success("폴더 이름이 변경되었습니다.");
    } catch (err) {
      console.error("폴더 이름 변경 실패:", err);
      setError("폴더 이름 변경에 실패했습니다.");
      toast.error("폴더 이름 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = async (name: string) => {
    try {
      setIsCreating(true);
      setError(null);
      const newFolder = await createFavoriteFolder(name);
      setFolders(prev => [{ ...newFolder, count: 0, recipes: [] }, ...prev]);
      toast.success("새 폴더가 생성되었습니다.");
    } catch (err) {
      console.error("폴더 생성 실패:", err);
      setError("폴더 생성에 실패했습니다.");
      toast.error("폴더 생성에 실패했습니다.");
    } finally {
      setIsCreating(false);
    }
  };

  return { 
    folders, 
    loading,
    isCreating,
    error, 
    deleteFolder: handleDeleteFolder,
    renameFolder: handleRenameFolder,
    createFolder: handleCreateFolder,
    refreshFolders: fetchData
  };
};
