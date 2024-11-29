"use client";
 
import React, { useState } from "react";
import BannerPage from "./image";
import CustomBannersPage from "./description";
 
const Banner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState("/Banner1.png");
 
  const thumbnails = [
    "/Banner1.png",
    "/Banner2.png",
    "/Banner3.png",
    "/Banner4.png",
  ];
 
  return (
    <>
      <BannerPage />
      <CustomBannersPage />
    </>
 
  );
};
 
export default Banner;