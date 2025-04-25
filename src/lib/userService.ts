import { createClient } from "@/lib/client";
import { RecipeData, User } from "@/types/type";

const supabase = createClient();

export const fetchUserById = async (
  userId: string
): Promise<{ data?: User; error?: string }> => {
  if (!userId) return { error: "유효하지 않은 아이디입니다." };

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  return { data };
};

export const fetchUserRecipes = async (
  userId: string
): Promise<{ data?: RecipeData[]; error?: string }> => {
  if (!userId) return { error: "유효하지 않은 아이디입니다." };

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  return { data };
};

export const fetchLikedRecipes = async (
  userId: string
): Promise<{ data?: RecipeData[]; error?: string }> => {
  if (!userId) return { error: "유효하지 않은 아이디입니다." };

  const { data, error } = await supabase
    .from("recipe_likes")
    .select("recipes(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("fetchLikedRecipes error:", error.message);
    return { error: error.message };
  }

  const likedRecipes = (data as { recipes: RecipeData[] }[])
    .map((like) => Array.isArray(like.recipes) ? like.recipes[0] : like.recipes) 
    .filter(Boolean); 

  return { data: likedRecipes };
};

export const fetchFavoritedRecipes = async (
  userId: string
): Promise<{ data?: RecipeData[]; error?: string }> => {
  if (!userId) return { error: "유효하지 않은 아이디입니다." };

  const { data, error } = await supabase
    .from("favorites")
    .select("recipes(*)")
    .eq("user_id", userId);

  if (error) {
    console.error("fetchFavoritedRecipes error:", error.message);
    return { error: error.message };
  }

  const favoritedRecipes = (data as { recipes: RecipeData | RecipeData[] }[])
    .map((item) =>
      Array.isArray(item.recipes) ? item.recipes[0] : item.recipes
    )
    .filter(Boolean); 

  return { data: favoritedRecipes };
};