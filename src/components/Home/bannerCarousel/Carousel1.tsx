import Image from 'next/image';
import Link from 'next/link';

const Carousel1 = () => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <Image
        src="/banner1.jpeg"
        alt="banner1"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-start justify-center p-4 sm:p-6 md:p-8 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 max-w-lg">
          여러분의 레시피를 공유해주세요
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-5 max-w-md">
          특별한 요리 비법과 창의적인 레시피를 함께 나누어요
        </p>
        <Link
          href="/write"
          className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 text-base"
        >
          레시피 작성하기 ✍️
        </Link>
      </div>
    </div>
  );
};

export default Carousel1;
