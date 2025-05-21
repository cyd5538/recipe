export interface AiRecipe {
  id: string;
  user_id: string;
  title: string;
  content: string;
  steps: string[];
  description: string;
  ingredients: string[];
  created_at: string;
  is_ai_generated: boolean;
  category: string;
  cook_time: string;
  difficulty: string;
  material_price: string;
  tags: string[];
  prompt: string;
}

export interface RecipeData {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  cook_time: string;
  difficulty: string;
  material_price: string;
  thumbnail_url: File | string | null;
  created_at: string;
  ingredients: string[];
  steps: RecipeDataStep[];
  views: number;
  total_likes: number;
  total_comments: number;
  tags: string[];
  likes_count: number
  author_nickname: string;    
  author_avatar_url: string;     
  is_favorited: boolean; 
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
  nickname: string | null
}

export type CommentUser = Pick<User, "nickname" | "avatar_url">;

export interface Reply {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: CommentUser;
}

export interface Comment {
  id: string;
  user_id: string;
  content: string;
  likes: number;
  likedByUser: boolean;
  created_at: string;
  user: CommentUser;
  replies: Reply[];
}

export interface CommentLike {
  id: string;
  recipe_id: string;
  user_id: string;
  created_at: string;
};

export interface PopularTag  {
  tag: string;
  count: number;
};

export interface Plan {
  id: string;
  title: string;
  price: number;
  coins: number;
  popular: boolean;
} 

export interface UserCoin {
  balance: number;
}

export interface FolderRecipe {
  id: string;
  title: string;
  thumbnail_url: string | null;
  cook_time: number;
  difficulty: string;
  material_price: string;
  created_at: string;
  category: string;
}

export interface Folder {
  id: string;
  name: string;
  count: number;
  recipes: FolderRecipe[];
}