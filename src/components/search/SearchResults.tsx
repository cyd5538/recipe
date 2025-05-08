import { RecipeData } from '@/types/type';
import RecipeCard from '../Home/recipes/RecipeCard';

interface SearchResultsProps {
  results: RecipeData[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 mb-24'>
      {results.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default SearchResults;