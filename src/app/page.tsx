import BannerCarousel from '@/components/Home/BannerCarousel'
import { RecipeFilters } from '@/components/Home/recipeFilters'
import { RecipeList } from '@/components/Home/recipes'

import HomeSearch from '@/components/Home/Search/HomeSearch'
import React from 'react'

const Home = () => {
  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <BannerCarousel />
      <div className='flex flex-col lg:flex-row gap-6'>
        <main className='flex-1'>
          <RecipeFilters />
          <RecipeList />
        </main>
        <aside className="hidden lg:block w-[350px] space-y-6">
          <HomeSearch />
        </aside>
      </div>
    </div>
  )
}

export default Home
