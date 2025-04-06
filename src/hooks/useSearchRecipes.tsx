import { createClient } from "@/lib/client";
import { RecipeData } from "@/types/type";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearchRecipes = (search: string, page: number, pageSize: number) => {
  const supabase = createClient();
  const [results, setResults] = useState<RecipeData[]>([]);
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
        // 1. 제목에 검색어가 포함된 레시피 가져오기
        const { data: titleMatches } = await supabase
          .from("recipes")
          .select("*")
          .ilike("title", `%${debouncedSearch}%`);

        // 2. 태그 이름에 검색어가 포함된 태그들 검색
        const { data: matchingTags } = await supabase
          .from("tags")
          .select("id")
          .ilike("name", `%${debouncedSearch}%`);

        let tagRecipeMatches: RecipeData[] = [];

        if (matchingTags?.length) {
          const tagIds = matchingTags.map(tag => tag.id);

          const { data: tagRelations } = await supabase
            .from("recipe_tags")
            .select("recipe_id")
            .in("tag_id", tagIds);

          const recipeIds = tagRelations?.map(rel => rel.recipe_id) || [];

          if (recipeIds.length > 0) {
            const { data: recipesByTags } = await supabase
              .from("recipes")
              .select("*")
              .in("id", recipeIds);

            tagRecipeMatches = recipesByTags || [];
          }
        }

        // 중복 제거 후 통합
        const combined = [...(titleMatches || []), ...tagRecipeMatches];
        const deduped = combined.filter(
          (recipe, index, self) => index === self.findIndex(r => r.id === recipe.id)
        );

        setTotalCount(deduped.length);

        // 페이지네이션 
        const start = (page - 1) * pageSize;
        const paginated = deduped.slice(start, start + pageSize);

        const recipeIds = paginated.map(recipe => recipe.id);

        // 해당 레시피들의 태그 정보 가져오기
        const { data: recipeTagRelations } = await supabase
          .from("recipe_tags")
          .select("recipe_id, tags(name)")
          .in("recipe_id", recipeIds);

        // 태그 매핑
        const tagMap: Record<string, string[]> = {};
        recipeTagRelations?.forEach(rel => {
          if (!tagMap[rel.recipe_id]) tagMap[rel.recipe_id] = [];
          tagMap[rel.recipe_id].push(rel.tags.name);
        });

        // 태그 각각 레시피에 추가
        const recipesWithTags: RecipeData[] = paginated.map(recipe => ({
          ...recipe,
          tags: tagMap[recipe.id] || [],
        }));

        setResults(recipesWithTags);
      } catch (err) {
        console.error("검색 중 에러가 발생했습니다.", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch, page]);

  return { results, loading, totalCount };
};
