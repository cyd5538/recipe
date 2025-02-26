'use client';

import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { useState } from 'react';

const slideData = [
  { content: <div>캐러셀 1</div>, bgColor: 'bg-blue-500' },
  { content: <div>캐러셀 2</div>, bgColor: 'bg-blue-700' },
  { content: <div>캐러셀 3</div>, bgColor: 'bg-blue-900' },
];

function BannerCarousel() {
  const [currentCard, setCurrentCard] = useState<number>(0);
  return (
    <Swiper
      className='h-[200px] rounded-2xl'
      spaceBetween={0}
      slidesPerView={1}
      simulateTouch={true}
      grabCursor={true}
      centeredSlides={true}
      initialSlide={currentCard}
      onSlideChange={(swiper) => {
        setCurrentCard(swiper.snapIndex);
      }}
      observer={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
    >
      {slideData.map((slide, index) => (
        <SwiperSlide key={index} >
          <div className={`h-full w-full flex items-center text-white xl:text-3xl md:text-4xl text-4xl p-6 justify-center ${slide.bgColor}`}>
            {slide.content}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default BannerCarousel;
