import React from 'react';
import RecipeTitle from '../shared/RecipeTitle';
import RecipeTagList from '../shared/RecipeTagList';

const RecipeTitleSection = ({ title, tags }) => {
  return (
    <td className="p-2 font-bold table-cell">
      <RecipeTitle title={title} />
      <RecipeTagList tags={tags} />
    </td>
  );
};

export default RecipeTitleSection;