import CustomButton from '@/components/ui/CustomButton'
import Link from 'next/link'
import React from 'react'

const Notfound = () => {
  return (
    <div className='h-screen w-full flex flex-col gap-12 justify-center items-center '>
      <h1 className='font-bold text-9xl drop-shadow-[0px_15px_15px_rgba(0,0,0,1)] text-white'>Oops!</h1>
      <div className='text-3xl'>404 - PAGE NOT FOUND</div>
      <Link href="/">
        <CustomButton>Go To Home</CustomButton>
      </Link>
    </div>
  )
}

export default Notfound
