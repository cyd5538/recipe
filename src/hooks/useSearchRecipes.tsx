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
        const { data: titleMatches } = await supabase
          .from("recipes")
          .select("*")
          .ilike("title", `%${debouncedSearch}%`);

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

        const combined = [...(titleMatches || []), ...tagRecipeMatches];
        const deduped = combined.filter(
          (recipe, index, self) => index === self.findIndex(r => r.id === recipe.id)
        );

        setTotalCount(deduped.length);

        const start = (page - 1) * pageSize;
        const paginated = deduped.slice(start, start + pageSize);

        setResults(paginated);
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
