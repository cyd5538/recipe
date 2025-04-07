import React from 'react'
import Image from 'next/image';

const Carousel1 = () => {
  return (
    <div className="relative w-full h-[300px]"> 
        <Image
          src="/banner1.png"
          alt="banner1"
          fill
          className="object-cover"
        />
        <h1 className='sm:text-4xl text-2xl font-semibold text-center text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          여러분의 레시피를 공유해주세요. 🍕
        </h1>
      </div>
  )
}

export default Carousel1