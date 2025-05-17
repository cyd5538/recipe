import type { RecipeData, AiRecipe } from './type';

export type SearchTab = 'recipes' | 'aiRecipes';

export interface SearchParams {
  keyword: string;
  tab: SearchTab;
  page: number;
  pageSize: number;
}

export interface SearchResult<T> {
  results: T[];
  loading: boolean;
  totalCount: number;
}

export interface SearchState {
  params: SearchParams;
  recipeResults: SearchResult<RecipeData>;
  aiResults: SearchResult<AiRecipe>;
}

export interface SearchUrlParams {
  keyword?: string;
  tab?: SearchTab;
  page?: string;
}

export interface SearchHandler {
  handleSearch: (keyword: string) => void;
  handleTabChange: (tab: SearchTab) => void;
  handlePageChange: (page: number) => void;
  updateUrl: (params: Partial<SearchUrlParams>) => void;
}

export type { RecipeData, AiRecipe }; 