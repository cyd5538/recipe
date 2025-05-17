import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchParams, SearchTab, SearchHandler, SearchUrlParams } from '@/types/search';
import { useSearchRecipes } from './useSearchRecipes';
import { useSearchAiRecipes } from './useSearchAiRecipes';

const PAGE_SIZE = 12;

export const useSearchState = (): SearchHandler & { 
  params: SearchParams;
  recipeResults: ReturnType<typeof useSearchRecipes>;
  aiResults: ReturnType<typeof useSearchAiRecipes>;
} => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL 파라미터 파싱
  const parseUrlParams = (): SearchUrlParams => ({
    keyword: searchParams.get("keyword") ?? "",
    tab: (searchParams.get("tab") as SearchTab) ?? "recipes",
    page: searchParams.get("page") ?? "1"
  });

  const urlParams = parseUrlParams();
  
  // 상태 초기화
  const [params, setParams] = useState<SearchParams>({
    keyword: urlParams.keyword ?? "",
    tab: urlParams.tab ?? "recipes",
    page: parseInt(urlParams.page ?? "1"),
    pageSize: PAGE_SIZE
  });

  // 검색 결과 가져오기
  const recipeResults = useSearchRecipes(params.keyword, params.page, params.pageSize);
  const aiResults = useSearchAiRecipes(params.keyword, params.page, params.pageSize);

  // URL 업데이트
  const updateUrl = useCallback((newParams: Partial<SearchUrlParams>) => {
    const searchParams = new URLSearchParams();
    // 현재 params의 keyword를 유지하면서 새로운 파라미터 적용
    if (params.keyword) {
      searchParams.set('keyword', params.keyword);
    }
    if (newParams.keyword) {
      searchParams.set('keyword', newParams.keyword);
    }
    if (newParams.tab) {
      searchParams.set('tab', newParams.tab);
    }
    if (newParams.page) {
      searchParams.set('page', newParams.page);
    }
    router.push(`/search?${searchParams.toString()}`);
  }, [router, params.keyword]);

  // 검색어 변경
  const handleSearch = useCallback((keyword: string) => {
    const newParams = {
      ...params,
      keyword,
      page: 1
    };
    setParams(newParams);
    updateUrl({ keyword, page: "1" });
  }, [params, updateUrl]);

  // 탭 변경
  const handleTabChange = useCallback((tab: SearchTab) => {
    const newParams = {
      ...params,
      tab,
      page: 1
    };
    setParams(newParams);
    updateUrl({ tab, page: "1" });
  }, [params, updateUrl]);

  // 페이지 변경
  const handlePageChange = useCallback((page: number) => {
    const newParams = {
      ...params,
      page
    };
    setParams(newParams);
    updateUrl({ page: page.toString() });
  }, [params, updateUrl]);

  return {
    params,
    recipeResults,
    aiResults,
    handleSearch,
    handleTabChange,
    handlePageChange,
    updateUrl
  };
}; 