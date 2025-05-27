import { formatDate } from "@/lib/utils";
import { User } from "@/types/type";
import Image from "next/image";

interface Prop {
  userData: User,
  recipeCount: number
}

// 사용자 프로필 컴포넌트
const OtherUserProfile:React.FC<Prop> = ({ userData, recipeCount }: { userData: User, recipeCount: number }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
    <div className="flex items-center space-x-6">
      <div className="relative w-24 h-24">
        <Image
          src={userData.avatar_url || '/images/default-avatar.png'}
          alt="user-avatar"
          fill
          className="rounded-full object-cover border-2 border-gray-200 dark:border-zinc-700"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2">{userData.nickname || '익명 사용자'}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          가입일: {formatDate(userData.created_at)}
        </p>
        <div className="flex space-x-6">
          <div className="text-center">
            <p className="text-2xl font-semibold">{recipeCount}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">레시피</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">0</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">팔로워</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">0</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">팔로잉</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OtherUserProfile;