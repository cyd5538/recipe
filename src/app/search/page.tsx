"use client";

import Header from '@/components/layout/header/Header';
import SearchInput from '@/components/search/SearchInput';
import SearchTabs from '@/components/search/SearchTabs';
import SearchContent from '@/components/search/SearchContent';
import { useSearchState } from '@/hooks/useSearchState';

const SearchPage = () => {
  const {
    params,
    recipeResults,
    aiResults,
    handleSearch,
    handleTabChange,
    handlePageChange
  } = useSearchState();

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className='text-3xl my-4 mb-4 font-semibold'>레시피를 검색해주세요. 🍚</h1>
        
        <SearchInput 
          value={params.keyword} 
          onChange={handleSearch} 
          loading={params.tab === 'recipes' ? recipeResults.loading : aiResults.loading} 
        />
        
        <SearchTabs 
          activeTab={params.tab} 
          onTabChange={handleTabChange}
          recipeCount={recipeResults.totalCount}
          aiRecipeCount={aiResults.totalCount}
          keyword={params.keyword}
        />

        <SearchContent
          activeTab={params.tab}
          keyword={params.keyword}
          recipeResults={recipeResults}
          aiResults={aiResults}
          page={params.page}
          pageSize={params.pageSize}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default SearchPage;
