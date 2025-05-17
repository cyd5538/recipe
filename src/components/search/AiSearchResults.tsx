import { AiRecipe } from '@/types/type';
import AiRecipeCard from '../airecipe/AiRecipeCard';

interface AiSearchResultsProps {
  results: AiRecipe[];
}

const AiSearchResults: React.FC<AiSearchResultsProps> = ({ results }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 mb-24'>
      {results.map((recipe) => (
        <AiRecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default AiSearchResults; 