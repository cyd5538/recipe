import React from 'react'
import CustomButton from '../ui/CustomButton'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

interface Props {
  id: string | undefined
  postId: string | undefined
}

const RecipeEditDelBtn:React.FC<Props> = ({id, postId}) => {
  const { user } = useAuthStore();
  const router = useRouter()

  if(user?.id !== id) {
    return null;
  }

  const handleReicipeMove = () => {
    router.push(`/write?id=${postId}`)
  }
  
  return (
    <div className='w-full flex justify-end my-2 gap-2'>
      <CustomButton onClick={handleReicipeMove} text="수정"/>
      <CustomButton text="삭제" className='bg-red-500 text-white border-none hover:shadow-[4px_4px_0px_0px_rgba(100,100,0)]'/>
    </div>
  )
}

export default RecipeEditDelBtn
