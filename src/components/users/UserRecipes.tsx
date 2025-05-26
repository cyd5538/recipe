import React from 'react'
import { useUserData } from '@/hooks/useUserData'
import { motion } from "framer-motion";
import Loading from '../ui/loading';
import RecipeListCardView from '../Home/recipes/RecipeListCardView';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface Prop {
  userId: string | null
  isMyPage: boolean
}

const UserRecipes: React.FC<Prop> = ({ userId, isMyPage }) => {
  const { userData, userRecipes, loading, error } = useUserData(userId as string, isMyPage)
  
  if (loading) return <div className="mt-36"><Loading /></div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!userData) return <div className="text-center py-8">사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="space-y-8">
      {/* 프로필 섹션 */}
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
                <p className="text-2xl font-semibold">{userRecipes.length}</p>
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

      {/* 레시피 목록 섹션 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">작성한 레시피</h2>
        {userRecipes.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            아직 작성한 레시피가 없습니다.
          </p>
        ) : (
          <RecipeListCardView recipes={userRecipes} />
        )}
      </motion.div>
    </div>
  )
}

export default UserRecipes
