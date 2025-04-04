export interface RecipeData {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  cook_time: string 
  difficulty: string 
  material_price: string 
  thumbnail_url: File | string | null
  ingredients: string[]
  tags?: string[]
  steps: RecipeDataStep[]
  views: number
}

export interface RecipeLocalStorage {
  id: string;
  image: string
  title: string
}

export interface RecipeDataStep {  
  description: string;
  image: File | string | null;
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