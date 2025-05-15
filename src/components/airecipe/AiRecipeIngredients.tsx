interface AiRecipeIngredientsProps {
  ingredients: string[];
}

const AiRecipeIngredients: React.FC<AiRecipeIngredientsProps> = ({ ingredients }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-zinc-800">🥗 재료</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ingredients?.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-zinc-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AiRecipeIngredients; 