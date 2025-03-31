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
