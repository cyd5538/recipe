import { GrView } from "react-icons/gr";
import { AiFillHeart } from "react-icons/ai";

interface Props {
  viewsCount: number;
  likesCount: number;
}

const RecipeCardStats = ({ viewsCount, likesCount }: Props) => {
  return (
    <div className="flex justify-between items-center gap-2 mt-4 text-gray-600 dark:text-white text-sm px-1">
      <div className="flex items-center gap-1">
        <GrView  size={20}/>
        <span>{viewsCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <AiFillHeart size={20} className="text-red-500" />
        <span>{likesCount}</span>
      </div>
    </div>
  );
};

export default RecipeCardStats;
