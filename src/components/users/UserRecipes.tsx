import React from 'react'
import { useUserData } from '@/hooks/useUserData'
import Loading from '../ui/loading';
import UserRecipesList from './UserRecipesList';
import OtherUserProfile from './OtherUserProfile';

interface Prop {
  userId: string | null
  isMyPage: boolean
}

const UserRecipes: React.FC<Prop> = ({ userId, isMyPage }) => {
  const { userData, userRecipes, loading, error } = useUserData(userId);

  if (loading) return <div className="mt-36"><Loading /></div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!userData) return <div className="text-center py-8 text-gray-500">유저 정보가 없습니다.</div>;
  
  return (
    <div className="space-y-8">
      {!isMyPage && <OtherUserProfile userData={userData} recipeCount={userRecipes.length} />}
      <UserRecipesList recipes={userRecipes} showTitle={!isMyPage} />
    </div>
  )
}

export default UserRecipes