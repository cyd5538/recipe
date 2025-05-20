import { useEffect, useState } from "react";
import { fetchFavoriteFolders } from "@/lib/userFavoriteFolder";
import { Folder } from "@/lib/userFavoriteFolder";

export const useFavoriteFolders = (userId: string | null) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
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

    fetchData();
  }, [userId]);

  return { folders, loading, error };
};
