import Image from "next/image";
import Link from "next/link";

interface RecipeAuthorProps {
  nickname: string;
  avatar_url: string;
  user_id: string;
  follower_count: number;
  following_count: number;
}

const RecipeAuthor: React.FC<RecipeAuthorProps> = ({ nickname, avatar_url, user_id, follower_count, following_count }) => {
  const imageUrl = avatar_url || "/avatar.webp";
  
  return (
    <Link href={`/users?id=${user_id}`} className="mt-4 flex items-center gap-4 p-4 rounded-xl justify-center">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={imageUrl}
          width={100}
          height={100}
          className="rounded-full"
          alt={nickname}
        />
        <p className="font-semibold">{nickname}</p>
        <div>
          팔로잉 {following_count} 팔로워 {follower_count}
        </div>
      </div>
    </Link>
  );
};

export default RecipeAuthor;
