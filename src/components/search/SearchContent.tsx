import React from 'react';
import type { SearchTab, SearchResult, RecipeData, AiRecipe } from '@/types/search';
import SearchResults from './SearchResults';
import AiSearchResults from './AiSearchResults';
import { RecipePagenation } from '../Home/recipes/RecipePagenation';

interface SearchContentProps {
  activeTab: SearchTab;
  keyword: string;
  recipeResults: SearchResult<RecipeData>;
  aiResults: SearchResult<AiRecipe>;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const SearchContent: React.FC<SearchContentProps> = ({
  activeTab,
  keyword,
  recipeResults,
  aiResults,
  page,
  pageSize,
  onPageChange,
}) => {
  if (!keyword) {
    return null;
  }

  const currentResults = activeTab === 'recipes' ? recipeResults : aiResults;
  const totalPages = Math.ceil(currentResults.totalCount / pageSize);

  if (currentResults.loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (currentResults.totalCount === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div>
      {activeTab === 'recipes' ? (
        <SearchResults results={recipeResults.results} />
      ) : (
        <AiSearchResults results={aiResults.results} />
      )}
      {totalPages > 1 && (
        <div className="mt-8">
          <RecipePagenation
            page={page}
            totalCount={currentResults.totalCount}
            pageSize={pageSize}
            setPage={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchContent; 