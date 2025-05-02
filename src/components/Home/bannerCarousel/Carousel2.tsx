import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Carousel2 = () => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg"> 
      <Image
        src="/banner2.jpeg"
        alt="AI 레시피 배너"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-start justify-center p-4 sm:p-6 md:p-8 text-white">
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 max-w-lg'>
          AI와 함께하는 요리의 혁신
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 max-w-md">
          인공지능이 제안하는 맞춤형 레시피로 새로운 요리를 시작해보세요
        </p>
        <Link 
          href="/airecipe" 
          className="bg-white text-black px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm sm:text-base"
        >
          AI 레시피 보러가기
          <span className="text-lg sm:text-xl">🤖</span>
        </Link>
      </div>
    </div>
  )
}

export default Carousel2