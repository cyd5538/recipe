import BannerCarousel from '@/components/Home/BannerCarousel'
import RecentlyViewed from '@/components/Home/favorite/RecentlyViewed'
import { RecipeFilters } from '@/components/Home/recipeFilters'
import { RecipeList } from '@/components/Home/recipes'

import HomeSearch from '@/components/Home/Search/HomeSearch'
import TagSection from '@/components/Home/Tag/TagSection'
import Header from '@/components/layout/header/Header'
import React from 'react'

const Home = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <BannerCarousel />
        <div className='flex lg:flex-row w-full'>
          <main className='flex-1 lg:mr-6'>
            <RecipeFilters />
            <RecipeList />
          </main>
          <aside className="hidden lg:block w-[390px] space-y-6">
            <HomeSearch />
            <RecentlyViewed />
            <TagSection />
          </aside>
        </div>
      </div>
    </>
  )
}

export default Home
