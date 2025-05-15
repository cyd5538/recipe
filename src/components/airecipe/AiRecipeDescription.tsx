interface AiRecipeDescriptionProps {
  description: string;
}

const AiRecipeDescription: React.FC<AiRecipeDescriptionProps> = ({ description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-zinc-800">📝 요리 소개</h2>
      <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
};

export default AiRecipeDescription; 