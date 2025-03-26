import React from "react";

interface RecipeContentProps {
  content: string;
}

const RecipeContent: React.FC<RecipeContentProps> = ({ content }) => {
  return (
    <div className="prose dark:prose-invert max-w-none my-6">
      <h2 className="text-xl font-semibold mb-6">💁  요리 설명 및 Tip</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default RecipeContent;