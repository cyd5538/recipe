import React from 'react';
import { Clock } from 'lucide-react';

interface RecipeDetailsProps {
  description: string;
  category: string;
  difficulty: string;
  cookingTime: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  description,
  category,
  difficulty,
  cookingTime,
}) => {
  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getDifficultyStars = (level: string) => {
    switch (level.toLowerCase()) {
      case '쉬움':
        return '★';
      case '보통':
        return '★★';
      case '어려움':
        return '★★★';
      default:
        return '★';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case '쉬움':
        return 'text-green-500';
      case '보통':
        return 'text-yellow-500';
      case '어려움':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getCategoryColor = (cat: string) => {
    const colors: { [key: string]: string } = {
      '한식': 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      '양식': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      '중식': 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      '일식': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      '분식': 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
      '디저트': 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    };
    return colors[cat] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {stripHtml(description)}
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
          {category}
        </div>
        
        <div className="flex items-center gap-1.5 text-xs">
          <span className={`font-bold ${getDifficultyColor(difficulty)}`}>
            {getDifficultyStars(difficulty)}
          </span>
          <span className={getDifficultyColor(difficulty)}>난이도 {difficulty}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{cookingTime}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
