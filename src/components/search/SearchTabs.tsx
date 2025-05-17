import React from 'react';

interface SearchTabsProps {
  activeTab: 'recipes' | 'aiRecipes';
  onTabChange: (tab: 'recipes' | 'aiRecipes') => void;
  recipeCount: number;
  aiRecipeCount: number;
  keyword: string;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  recipeCount, 
  aiRecipeCount,
  keyword
}) => {
  return (
    <div className="mb-8">
      <div className="flex space-x-1 bg-gray-100 dark:bg-zinc-800 p-1 rounded-lg">
        <button
          onClick={() => onTabChange('recipes')}
          className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'recipes'
              ? 'bg-white dark:bg-zinc-700 shadow-sm text-red-500'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700'
          }`}
        >
          <div className="flex flex-col items-center">
            <span>일반 레시피</span>
            {keyword && (
              <span className={`text-xs mt-1 ${
                activeTab === 'recipes' 
                  ? 'text-red-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {recipeCount}개의 검색결과
              </span>
            )}
          </div>
        </button>
        <button
          onClick={() => onTabChange('aiRecipes')}
          className={`flex-1 py-3 px-6 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'aiRecipes'
              ? 'bg-white dark:bg-zinc-700 shadow-sm text-red-500'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700'
          }`}
        >
          <div className="flex flex-col items-center">
            <span>AI 레시피</span>
            {keyword && (
              <span className={`text-xs mt-1 ${
                activeTab === 'aiRecipes' 
                  ? 'text-red-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {aiRecipeCount}개의 검색결과
              </span>
            )}
          </div>
        </button>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
        {activeTab === 'recipes' 
          ? '사용자들이 직접 작성한 레시피를 검색합니다.' 
          : 'AI가 생성한 특별한 레시피를 검색합니다.'}
      </p>
    </div>
  );
};

export default SearchTabs; 