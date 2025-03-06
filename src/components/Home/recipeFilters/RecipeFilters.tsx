import React from 'react'
import CategorySelector from './CategorySelector'
import TimeSelector from './TimeFilter'
import DifficultySelector from './DifficultySelector'
import PriceSelector from './PriceFilter'

const RecipeFilters = () => {
  return (
    <div className='flex gap-4 justify-start items-center h-12 w-full'>
      <CategorySelector />
      <TimeSelector />
      <DifficultySelector />
      <PriceSelector />
    </div>
  )
}

export default RecipeFilters;
