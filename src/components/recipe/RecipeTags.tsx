interface RecipeTagsProps {
  tags: string[] | undefined;
}

const RecipeTags: React.FC<RecipeTagsProps> = ({ tags }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-2">🏷 태그</h2>
    <div className="flex flex-wrap gap-2">
      {tags?.map((tag) => (
        <span key={tag} className="px-4 py-2 rounded-xl border">#{tag}</span>
      ))}
    </div>
  </div>
);
export default RecipeTags;