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
  tags: string[]
}

export interface User {
  avatar_url: string | null;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  is_active: boolean;
  last_sign_in: string;
  provider: string;
}