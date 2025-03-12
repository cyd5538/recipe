import React from 'react';
import RecipeTitle from '../shared/RecipeTitle';
import RecipeTagList from '../shared/RecipeTagList';
import ReacipeDescription from './ReacipeDescription';

interface Prop {
  title: string
  tags: string[]
  description: string
}

const RecipeTitleSection:React.FC<Prop> = ({ title, tags, description }) => {

  return (
    <td className="p-2 font-bold table-cell">
      <RecipeTitle title={title} maxLength={15}/>
      <ReacipeDescription description={description}/>
      <RecipeTagList tags={tags} />
    </td>
  );
};

export default RecipeTitleSection;