"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shared/carousel"

import Image from 'next/image';

const RecentlyViewed = () => {

  const mockData = [
    {
      id: 1,
      title: '정말 맛있는 우삼겹 덮밥 규동 레시피! 간단한 한끼로 딱입니다.',
      tags: ['밥', '한식', '우삼겹', '덮밥', '규동'],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
    {
      id: 2,
      title: '오향장육 개맛있음',
      tags: ['오향장육', '중식', '아롱사태', '술안주'],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
    {
      id: 3,
      title: '오향장육 22222',
      tags: ['오향장육', '중식', '아롱사태', '술안주'],
      category: '한식',
      cookingTime: '20분',
      difficulty: '상',
      image: '/mock.webp'
    },
  ];


  return (
    <div className='mt-4 flex flex-col gap-4 border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black p-6 rounded-xl shadow-md dark:border-[1px]  '>
      <div className='flex justify-between items-center'>
        <div>최근 본 레시피</div>
        <span className='underline cursor-pointer text-gray-400 text-right text-sm'>전체보기</span>
      </div>
      <Carousel>
        <CarouselContent>
        {mockData.map((data, index) => (
          <CarouselItem key={index}>
            <Image src={data.image} width={300} height={300} alt={data.title}/>
            <div className='text-center mt-2 cursor-pointer hover:underline'>{data.title}</div>
          </CarouselItem>
        ))}
        </CarouselContent>
        <CarouselPrevious  className='border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black left-[-20px]'/>
        <CarouselNext className='border dark:bg-zinc-800 dark:text-white  border-black bg-white text-black right-[-20px]'/>
      </Carousel>
    </div>
  )
}

export default RecentlyViewed
