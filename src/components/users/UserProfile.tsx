import React from 'react'
import Image from 'next/image';
import { useUserData } from '@/hooks/useUserData'
import { motion } from "framer-motion";
import Loading from '../ui/loading';

interface Prop {
  userId: string | null
}

const UserProfile: React.FC<Prop> = ({ userId }) => {

  const { userData, loading, error } = useUserData(userId as string)
  if (loading) return <div className="mt-36"><Loading /></div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div>
      {userData && (
        <div className="text-center mt-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={userData.avatar_url || "/avatar.webp"}
              alt="프로필 이미지"
              width={200}
              height={200}
              className="mx-auto rounded-full border object-cover aspect-square"
            />
          </motion.div>
          {userData.full_name && <h2 className="text-xl font-bold mt-4">{userData.full_name}</h2>}
          <p className="text-gray-500 mt-4">{userData.email}</p>
          <p className="text-sm text-gray-400 mt-2">가입일: {new Date(userData.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  )
}

export default UserProfile
