'use client'

import Header from "@/components/layout/header/Header"
import Loading from "@/components/ui/loading"
import { useFetchRecipeById } from "@/hooks/useFetchRecipeById"
import { useSearchParams } from 'next/navigation'

const Home = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const { recipe, user, loading, error } = useFetchRecipeById(id as string)

  if (!id) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-lg text-gray-600">잘못된 접근입니다. </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  if(error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {error}
      </div>
    )
  }
 
  console.log(recipe, user)
  return (
    <>
      <Header />
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {id}
      </div>
    </>
  )
}

export default Home
