import { User } from "@/types/type";
import Image from "next/image";

interface RecipeAuthorProps {
  nickname: string;
  avatar_url: string;
  user_id: string;
}

const RecipeAuthor: React.FC<RecipeAuthorProps> = ({ nickname, avatar_url, user_id }) => {
  const imageUrl = avatar_url || "/avatar.webp";
  
  return (
    <div className="mt-4 flex items-center gap-4 p-4 rounded-xl justify-center">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={imageUrl}
          width={100}
          height={100}
          className="rounded-full"
          alt={nickname}
        />
        <p className="font-semibold">{nickname}</p>
      </div>
    </div>
  );
};

export default RecipeAuthor;
