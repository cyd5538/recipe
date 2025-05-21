import { createClient } from "./client";
import { RecipeData } from "@/types/type";

export interface FolderRecipe {
  id: string;
  title: string;
  thumbnail_url: string | null;
  cook_time: number;
  difficulty: string;
  material_price: string;
  created_at: string;
}

export interface Folder {
  id: string;
  name: string;
  count: number;
  recipes: FolderRecipe[];
}

export async function fetchFavoriteFolders() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("bookmark_groups")
    .select(`
      id,
      name,
      bookmark_group_recipes(
        recipe_id,
        recipes(
          id,
          title,
          thumbnail_url,
          cook_time,
          difficulty,
          material_price,
          created_at
        )
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const folders = data.map((folder) => ({
    id: folder.id,
    name: folder.name,
    count: folder.bookmark_group_recipes.length,
    recipes: folder.bookmark_group_recipes
      .map((item) => item.recipes)
      .flat()
      .filter((recipe): recipe is NonNullable<typeof recipe> => recipe !== null)
  }));

  return folders;
}

export const deleteFavoriteFolder = async (folderId: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("bookmark_groups")
    .delete()
    .eq("id", folderId);

  if (error) {
    throw new Error(error.message);
  }
};

export const renameFavoriteFolder = async (folderId: string, newName: string) => {
  const supabase = createClient();
  const { error } = await supabase
    .from("bookmark_groups")
    .update({ name: newName })
    .eq("id", folderId);

  if (error) {
    throw new Error(error.message);
  }
};
export async function createFavoriteFolder(name: string) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("로그인이 필요합니다.");

  const { data, error } = await supabase
    .from("bookmark_groups")
    .insert([{ name, user_id: user.id }])
    .select("id, name")
    .single();

  if (error) throw error;
  return { ...data, count: 0 }; // 새 폴더는 count 0으로 시작
}

export async function removeFromFolder(groupId: string, recipeId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("bookmark_group_recipes")
    .delete()
    .eq("group_id", groupId)
    .eq("recipe_id", recipeId);

  if (error) throw error;
}

export async function checkIsFavorited(recipeId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from("bookmark_group_recipes")
    .select("id")
    .eq("recipe_id", recipeId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function checkIsInFolder(groupId: string, recipeId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from("bookmark_group_recipes")
    .select("id")
    .eq("group_id", groupId)
    .eq("recipe_id", recipeId)
    .maybeSingle();

  if (error) throw error;
  return !!data;
}

export async function addToFolder(groupId: string, recipeId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("로그인이 필요합니다.");

  // 이미 폴더에 추가되어 있는지 확인
  const isInFolder = await checkIsInFolder(groupId, recipeId);
  if (isInFolder) {
    throw new Error("이미 이 폴더에 추가된 레시피입니다.");
  }

  const { error } = await supabase
    .from("bookmark_group_recipes")
    .insert([{ group_id: groupId, recipe_id: recipeId }]);

  if (error) throw error;
}