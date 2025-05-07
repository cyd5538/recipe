"use client";

import Header from '@/components/layout/header/Header';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSearchRecipes } from '@/hooks/useSearchRecipes';
import SearchInput from '@/components/search/SearchInput';
import SearchResults from '@/components/search/SearchResults';
import { RecipePagenation } from '@/components/Home/recipes/RecipePagenation';

const PAGE_SIZE = 12;

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get("id") ?? "";

  const [search, setSearch] = useState(keyword);
  const [page, setPage] = useState(1);

  const { results, loading, totalCount } = useSearchRecipes(search, page, PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    router.push(`/search?id=${encodeURIComponent(value)}`);
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className='text-3xl my-4 mb-4 font-semibold'>레시피를 검색해주세요. 🍚</h1>
        <SearchInput value={search} onChange={handleSearchChange} loading={loading} />

        {!loading && results.length > 0 && (
          <>
            <SearchResults results={results} />
            <RecipePagenation
              page={page}
              totalCount={totalCount}
              pageSize={PAGE_SIZE}
              setPage={setPage}
            />
          </>
        )}

        {!loading && results.length === 0 && search && (
          <p className="mt-6 text-gray-500">검색 결과가 없습니다.</p>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
