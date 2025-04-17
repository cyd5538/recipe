// usePopularTags.ts
import { fetchPopularTags } from "@/lib/recipeService";
import { PopularTag } from "@/types/type";
import { useEffect, useState } from "react";

export const usePopularTags = () => {
  const [tags, setTags] = useState<PopularTag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTags = async () => {
      setLoading(true);
      const { data } = await fetchPopularTags(); 
      if (data) setTags(data);
      setLoading(false);
    };
    loadTags();
  }, []);

  return { tags, loading };
};
