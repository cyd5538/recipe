"use client";

import Header from '@/components/layout/header/Header';
import RecipeCard from '@/components/Home/recipes/card-view/RecipeCard';
import { RecipePagenation } from '@/components/Home/recipes/RecipePagenation';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSearchRecipes } from '@/hooks/useSearchRecipes';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

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
        <h1 className='text-3xl my-4 mb-4 font-semibold'>레시피를 검색해주세요. </h1>
        <div className='relative top-[31px] left-3'>{loading ?<AiOutlineLoading3Quarters className='animate-spin' size={20}/> : <CiSearch size={20}/> }</div>
        <input
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="border p-2 w-full py-2 mb-4 pl-10 rounded-xl "
          placeholder="레시피 검색..."
        />

        {loading ? (
          <></>
        ) : results.length > 0 ? (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 mb-24'>
              {results.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            <RecipePagenation
              page={page}
              totalCount={totalCount}
              pageSize={PAGE_SIZE}
              setPage={setPage}
            />
          </>
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
