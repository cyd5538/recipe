import React from 'react'
import CategorySelector from './CategorySelector'
import TimeSelector from './TimeFilter'
import DifficultySelector from './DifficultySelector'
import PriceSelector from './PriceFilter'

const RecipeFilters = () => {
  return (
    <div className='grid gap-3 grid-cols-4 mt-4 w-full'>
      <CategorySelector />
      <TimeSelector />
      <DifficultySelector />
      <PriceSelector />
    </div>
  )
}

export default RecipeFilters;
