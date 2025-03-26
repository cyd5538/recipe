interface RecipeIngredientsProps {
  ingredients: string[];
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({ ingredients }) => (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-2">🛒 재료</h2>
    <div className="flex flex-wrap gap-2">
      {ingredients.map((ingredient) => (
        <span key={ingredient} className="px-4 py-2 rounded-xl border">
          {ingredient}
        </span>
      ))}
    </div>
  </div>
);
export default RecipeIngredients;