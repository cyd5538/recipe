import Image from 'next/image';
import React from 'react';

const RecipeImage = ({ src, alt }) => {
  return (
    <div className='relative w-full h-40'>
      <Image 
        className='object-cover rounded-md' 
        fill 
        sizes="(max-width: 768px) 100vw, 300px" // 768px 이하일 땐 100% 이미지3
        src={src} 
        alt={alt} 
      />
    </div>
  );
};

export default RecipeImage;