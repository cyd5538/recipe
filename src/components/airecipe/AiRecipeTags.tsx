interface AiRecipeTagsProps {
  tags: string[];
}

const AiRecipeTags = ({ tags }: AiRecipeTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {tags.map((tag, index) => (
        <span key={index} className="px-2 py-1 bg-red-100 dark:bg-zinc-700 text-red-700 dark:text-white rounded-full text-sm">
          {tag}
        </span>
      ))}
    </div>
  );
};

export default AiRecipeTags; 