import { User } from "@/types/type";
import Image from "next/image";

interface RecipeAuthorProps {
  user: User;
}

const RecipeAuthor: React.FC<RecipeAuthorProps> = ({ user }) => (
  <div className="mt-8 flex items-center gap-4 p-4 rounded-xl border">
    {user.avatar_url && <Image src={user.avatar_url} width={50} height={50} className="rounded-full" alt={user.email} />}
    <p className="font-semibold">작성자: {user.email}</p>
  </div>
);
export default RecipeAuthor;