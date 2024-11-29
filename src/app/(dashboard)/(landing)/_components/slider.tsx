"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// Types for props
interface Category {
  image: string;
  name: string;
}

interface SwiperSliderProps {
  categories: Category[];
}

const RectSlider: React.FC<SwiperSliderProps> = ({ categories }) => {
  return (
    <div className="w-full bg-white py-8 ">
      {/* Title */}
      <h2 className="text-center text-2xl font-bold mb-8">Explore all categories</h2>

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={20} // Space between slides
        slidesPerView={9} // Number of visible items
        navigation={true} // Enable navigation arrows
        modules={[Navigation]} // Swiper module
        className="w-full"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} className="flex flex-col  items-center">
            {/* Rectangular Image */}
            <div className="w-24 h-16 md:w-52 md:h-52 bg-white shadow-lg flex items-center justify-center border border-gray-700 rounded-3xl overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="object-contain w-full h-full"
              />
            </div>
            {/* Name */}
            <p className="mt-4 text-sm md:text-base text-gray-700 font-medium text-center mr-5">
              {category.name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RectSlider;
