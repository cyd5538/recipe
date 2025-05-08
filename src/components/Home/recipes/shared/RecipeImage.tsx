import Image from 'next/image';
import React from 'react';

interface Prop {
  src: string
  alt: string
  className?: string
}

const RecipeImage:React.FC<Prop> = ({ src, alt, className = '' }) => {
  return (
    <div className='relative w-full aspect-[4/3] overflow-hidden'>
      <Image 
        className={`object-cover w-full h-full ${className}`}
        fill 
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={src} 
        alt={alt}
        priority
        quality={100}
      />
    </div>
  );
};

export default RecipeImage;