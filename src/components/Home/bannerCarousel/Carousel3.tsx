'use client';

import Link from 'next/link';

function Carousel3() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 
      bg-gradient-to-r from-primary/10 to-primary/5 
      dark:from-zinc-900 dark:to-zinc-800
      relative overflow-hidden">
      
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-white/50 dark:bg-black/50" />
      
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-light mb-4">
          특별한 레시피를 만나보세요
        </h2>
        
        <div className="text-xl mb-8 text-center text-gray-700 dark:text-gray-300">
          코인을 사용해 더 많은 레시피를 확인해보세요
        </div>
        
        <Link
          href="/pay"
          className="px-8 py-3 bg-black dark:bg-white text-white rounded-full 
            transition-colors shadow-lg dark:text-black"
        >
          결제하기
        </Link>
      </div>
    </div>
  );
}

export default Carousel3; 