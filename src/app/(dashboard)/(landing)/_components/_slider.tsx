"use client"
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay,EffectCube, Navigation,Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

const images = [
  "/Banner.jpeg",
  "/bg.jpg",
  "/Flex.webp",
  
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (<>
       <section className="text-black bg-white px-6 py-12 md:px-16 md:py-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:justify-between">
        {/* Left Content */}
        <div className="text-center lg:text-left mb-10 lg:mb-0 lg:max-w-lg">
          {/* Badge */}
          <div className=" text-gray-400 uppercase text-sm font-medium inline-block py-2 px-4 ring-1 ring-gray-300 rounded-2xl mb-4">
            Membership Template
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Meet the new home <br className="hidden lg:block" />
            for your digital goods
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-400 mb-8">
            Sell exclusive access to your digital goods <br className="hidden sm:block" />
            all in your Framer CMS site
          </p>

          {/* Search Bar */}
          <div className="flex items-center  justify-center lg:justify-start">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full  px-4 py-3 rounded-lg text-black placeholder-gray-500 ring-1 ring-gray-300"
            />
          </div>
        </div>

        {/* Right Swiper Slider */}
        <div className="w-full lg:w-1/2">
        <Swiper
  modules={[Autoplay,EffectCube,Navigation, Pagination]}
  
  loop={true}
  autoplay={{ delay: 5000 }}
pagination={{ clickable: true }}
  className="w-full  max-w-[30vw]"
>
            <SwiperSlide>
              <img
                src="/bg.jpg"
                alt="Rollup Stand 1"
                className="rounded-lg shadow-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/bg.jpg"
                alt="Rollup Stand 2"
                className="rounded-lg shadow-md"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="/bg.jpg"
                alt="Rollup Stand 3"
                className="rounded-lg shadow-md"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>












    {/* <div className="relative w-full mt- mx-auto"> */}
      {/* Image Display */}
      {/* <div className="w-full overflow-hidden rounded-lg"> */}
        {/* <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-96 object-cover transition-transform duration-500"
        />
      </div> */}

      {/* Navigation Arrows */}
      {/* <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
        onClick={nextSlide}
      >
        ❯
      </button> */}

      {/* Dots Navigation */}
      {/* <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div> */}
    {/* </div> */}
  </>
  );
}
