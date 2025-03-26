import { RecipeData } from "@/types/type";
import Image from "next/image";

interface RecipeHeaderProps {
  recipe: RecipeData;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({ recipe }) => {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl border dark:bg-zinc-800">
      <Image src={recipe.thumbnail_url} layout="fill" objectFit="cover" alt={recipe.title} />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-4xl font-bold">
        {recipe.title}
      </div>
    </div>
  );
};

export default RecipeHeader;