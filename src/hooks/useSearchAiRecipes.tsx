import { createClient } from "@/lib/client";
import { AiRecipe } from "@/types/type";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearchAiRecipes = (search: string, page: number, pageSize: number) => {
  const supabase = createClient();
  const [results, setResults] = useState<AiRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (!debouncedSearch) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      try {
        // 제목에 검색어가 포함된 AI 레시피 가져오기
        const { data: titleMatches, count } = await supabase
          .from("ai_recipes")
          .select("*", { count: "exact" })
          .ilike("title", `%${debouncedSearch}%`)
          .or(`tags.cs.{${debouncedSearch}}`);

        if (titleMatches) {
          setTotalCount(count || 0);
          
          // 페이지네이션
          const start = (page - 1) * pageSize;
          const paginated = titleMatches.slice(start, start + pageSize);
          
          setResults(paginated);
        }
      } catch (err) {
        console.error("AI 레시피 검색 중 에러가 발생했습니다.", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch, page, pageSize]);

  return { results, loading, totalCount };
}; 