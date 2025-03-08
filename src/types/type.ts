export interface RecipeData {
  id?: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  cook_time: string | null;
  difficulty: string | null;
  material_price: string | null;
  thumbnail_url: string | null;
  tags: string[] | null;
}