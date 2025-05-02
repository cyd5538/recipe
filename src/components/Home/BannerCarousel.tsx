'use client';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import Carousel1 from './bannerCarousel/Carousel1';
import Carousel2 from './bannerCarousel/Carousel2';

const slideData = [
  { content: <Carousel1 /> },
  { content: <Carousel2 /> },
  { content: <div className="text-white text-4xl">캐러셀 3</div> },
];

function BannerCarousel() {
  return (
    <Swiper
      className="h-[300px] bg-white text-black dark:bg-zinc-800 dark:text-white rounded-xl shadow-md dark:border"
      spaceBetween={0}
      slidesPerView={1}
      simulateTouch
      grabCursor
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      modules={[Navigation, Pagination, Autoplay]}
    >
      {slideData.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="h-full w-full flex items-center justify-center">
            {slide.content}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerCarousel;
