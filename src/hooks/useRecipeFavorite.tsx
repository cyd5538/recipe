import { useState, useEffect } from "react";
import { createClient } from "@/lib/client";
import { useAuthStore } from "@/store/authStore";
import { createFavoriteFolder, fetchFavoriteFolders, checkIsFavorited } from "@/lib/userFavoriteFolder";
import { toast } from "sonner";

interface Folder {
  id: string;
  name: string;
  count: number;
}

interface UseRecipeFavoriteProps {
  recipeId: string;
}

interface UseRecipeFavoriteReturn {
  isModalOpen: boolean;
  folders: Folder[];
  loading: boolean;
  error: string | null;
  setIsModalOpen: (isOpen: boolean) => void;
  toggleFavorite: () => Promise<void>;
  handleFolderCreate: (folderName: string) => Promise<void>;
  handleFolderSelect: (folderId: string) => Promise<void>;
}

export const useRecipeFavorite = ({ recipeId }: UseRecipeFavoriteProps): UseRecipeFavoriteReturn => {
  const supabase = createClient();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadFolders = async () => {
    try {
      setError(null);
      const folders = await fetchFavoriteFolders();
      setFolders(folders);
    } catch (e) {
      console.error("폴더 목록 로드 실패 -->", e);
      setError("폴더 목록을 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (user) {
      loadFolders();
    }
  }, [user]);

  useEffect(() => {
    if (isModalOpen && user) {
      loadFolders();
    }
  }, [isModalOpen, user]);

  const toggleFavorite = async () => {
    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    await loadFolders(); // 모달을 열기 전에 폴더 목록 새로고침
    setIsModalOpen(true);
  };

  const handleFolderCreate = async (folderName: string) => {
    try {
      setLoading(true);
      setError(null);
      const newFolder = await createFavoriteFolder(folderName);
      await loadFolders(); // 폴더 생성 후 목록 새로고침
    } catch (e) {
      console.error("폴더 생성 실패 -->", e);
      setError("폴더 생성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleFolderSelect = async (folderId: string) => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const isAlreadyFavorited = await checkIsFavorited(recipeId);
      if (isAlreadyFavorited) {
        setError("이미 즐겨찾기에 추가된 레시피입니다.");
        toast.error("이미 즐겨찾기에 추가된 레시피입니다.");
        return;
      }

      const { data: existingRecipe, error: checkError } = await supabase
        .from("bookmark_group_recipes")
        .select("id")
        .eq("group_id", folderId)
        .eq("recipe_id", recipeId)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingRecipe) {
        setError("이미 이 폴더에 추가된 레시피입니다.");
        toast.error("이미 이 폴더에 추가된 레시피입니다.");
        return;
      }

      const { error } = await supabase
        .from("bookmark_group_recipes")
        .insert({
          group_id: folderId,
          recipe_id: recipeId,
        });

      if (error) throw error;
      
      await loadFolders(); // 폴더 선택 후 목록 새로고침
      toast.success("즐겨찾기에 추가되었습니다.");
    } catch (e) {
      console.error("즐겨찾기 추가 실패 -->", e);
      setError("즐겨찾기 추가에 실패했습니다.");
      toast.error("즐겨찾기 추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    isModalOpen,
    folders,
    loading,
    error,
    setIsModalOpen,
    toggleFavorite,
    handleFolderCreate,
    handleFolderSelect,
  };
}; 