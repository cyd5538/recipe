export interface RecipeData {
  id?: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  cook_time: string 
  difficulty: string 
  material_price: string 
  thumbnail_url: string 
  tags: string[]
  ingredients: string[]
  steps: {
    description: string
    image: string
  }[]
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