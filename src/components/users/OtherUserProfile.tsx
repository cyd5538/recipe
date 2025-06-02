"use client";

import { useFollow } from "@/hooks/useFollow";
import { formatDate } from "@/lib/utils";
import { User } from "@/types/type";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomButton from "../ui/CustomButton";

interface Prop {
  userData: User;
  recipeCount: number;
}

const OtherUserProfile: React.FC<Prop> = ({ userData, recipeCount }) => {
  const [localUserData, setLocalUserData] = useState(userData);
  const { isFollowing, toggleFollow, loading } = useFollow(userData.id);

  useEffect(() => {
    setLocalUserData(userData);
  }, [userData]);

  const handleFollow = async () => {
    const result = await toggleFollow();
    if (result === null) return; 

    const diff = result ? 1 : -1;

    setLocalUserData((prev) => ({
      ...prev,
      followers_count: (prev.followers_count || 0) + diff,
    }));
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-6">
        {/* Avatar */}
        <div className="relative w-24 h-24">
          <Image
            src={localUserData.avatar_url || "/avatar.webp"}
            alt="user-avatar"
            fill
            className="rounded-full object-cover border-2 border-gray-200 dark:border-zinc-700"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{localUserData.nickname || "닉네임지정X"}</h1>
            <CustomButton
              onClick={handleFollow}
              disabled={loading}
              className="w-28 h-10 flex justify-center items-center"
            >
              {isFollowing ? "팔로우 취소" : "팔로우"}
            </CustomButton>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4">
            가입일: {formatDate(localUserData.created_at)}
          </p>

          <div className="flex space-x-6">
            <div className="text-center">
              <p className="text-2xl font-semibold">{recipeCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">레시피</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{localUserData.followers_count}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">팔로워</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{localUserData.followings_count}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">팔로잉</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;
