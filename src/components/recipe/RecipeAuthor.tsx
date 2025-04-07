import { User } from "@/types/type";
import Image from "next/image";

interface RecipeAuthorProps {
  user: User;
}

const RecipeAuthor: React.FC<RecipeAuthorProps> = ({ user }) => {
  const imageUrl = user.avatar_url || "/avatar.webp";

  return (
    <div className="mt-4 flex items-center gap-4 p-4 rounded-xl justify-center">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={imageUrl}
          width={100}
          height={100}
          className="rounded-full"
          alt={user.email}
        />
        <p className="font-semibold">{user.nickname}</p>
      </div>
    </div>
  );
};

export default RecipeAuthor;
