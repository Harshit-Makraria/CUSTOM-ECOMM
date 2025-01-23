"use client";
import React, { useState, useEffect } from "react";

interface Category {
  name: string;
  imageUrl: string;
}

interface RectSliderProps {
  categories: Category[];
  nm: string;
}

const RectSlider: React.FC<RectSliderProps> = ({ categories, nm }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredCategories = categories.filter(
    (category) => category.name.toLowerCase() === nm
  );

  useEffect(() => {
    if (filteredCategories.length < 6) {
      // throw new Error("Not enough images to display.");
    }
  }, [filteredCategories]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= filteredCategories.length - 6 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredCategories.length - 6 : prevIndex - 1
    );
  };

  return (
    <div className="w-full bg-white py-8">
      {/* Title */}
      <h2 className="text-center text-2xl font-bold mb-8">
        Explore all {filteredCategories[0].name.toLocaleLowerCase()} templates
      </h2>
      {/* Slider */}
      <div className="relative flex items-center  gap-6 mx-8">
        <button
          onClick={handlePrev}
          className="absolute left-0  text-2xl font-bold bg-gray-50 w-12 h-12 rounded-full"
        >
          &#8592;
        </button>
        <div className="flex overflow-hidden gap-4">
          {filteredCategories
            .slice(currentIndex, currentIndex + 6)
            .map((category, index) => (
              <div
                key={index}
                className="w-24 h-16 md:w-52 md:h-48 bg-white shadow-lg flex items-center justify-center border border-gray-700 rounded-xl overflow-hidden"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="object-fit w-full h-full"
                />
              </div>
            ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 p-2 text-2xl bg-gray-50 w-12 h-12 font-bold rounded-full"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default RectSlider;
