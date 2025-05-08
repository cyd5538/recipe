import React from 'react';
import { Heart, Eye, MessageCircle } from 'lucide-react';

interface RecipeCardStatsProps {
  likesCount: number;
  viewsCount: number;
  commentsCount: number;
}

const RecipeCardStats: React.FC<RecipeCardStatsProps> = ({
  likesCount,
  viewsCount,
  commentsCount,
}) => {
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <Heart className="w-5 h-5 mr-1.5 text-red-500" />
          <span>{likesCount}</span>
        </div>
        <div className="flex items-center">
          <Eye className="w-5 h-5 mr-1.5 text-blue-500" />
          <span>{viewsCount}</span>
        </div>
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-1.5 text-green-500" />
          <span>{commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardStats;
