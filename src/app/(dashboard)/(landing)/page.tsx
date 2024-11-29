import React from 'react'
import Navbar from './_components/navbar'
import SwiperSlider from './_components/s2'
import RectSlider from './_components/slider'
import Hero from './_components/hero'
const page = () => {

  const categories = [
    { image: "/Visitingcard.webp", name: "Visiting Cards" },
    { image: "/Polotshirt.webp", name: "Custom Polo T-shirts" },
    { image: "/WinterWear.webp", name: "Custom Winter Wear" },
    { image: "/Tshirt.webp", name: "Custom T-shirts" },
    { image: "/Stamp.webp", name: "Custom Stamps & Ink" },
    { image: "/picmug.webp", name: "Photo Gifts" },
    { image: "/label.webp", name: "Labels, Stickers & Packaging" },
    { image: "/label.webp", name: "Custom Stationery" },
    { image: "/label.webp", name: "Signs, Posters & Marketing Materials" },
    { image: "/label.webp", name: "More Categories" },
  ];
  const categories1 = [
    { image: "/Visitingcard.webp", name: "Visiting Cards" },
    { image: "/Polotshirt.webp", name: "Custom Polo T-shirts" },
    { image: "/WinterWear.webp", name: "Custom Winter Wear" },
    { image: "/Tshirt.webp", name: "Custom T-shirts" },
    { image: "/Stamp.webp", name: "Custom Stamps & Ink" },
    { image: "/picmug.webp", name: "Photo Gifts" },
    { image: "/label.webp", name: "Labels, Stickers & Packaging" },
    { image: "/label.webp", name: "Custom Stationery" },
    { image: "/label.webp", name: "Signs, Posters & Marketing Materials" },
    { image: "/label.webp", name: "More Categories" },
  ];
  const categories2 = [
    { image: "/Visitingcard.webp", name: "Visiting Cards" },
    { image: "/Polotshirt.webp", name: "Custom Polo T-shirts" },
    { image: "/WinterWear.webp", name: "Custom Winter Wear" },
    { image: "/Tshirt.webp", name: "Custom T-shirts" },
    { image: "/Stamp.webp", name: "Custom Stamps & Ink" },
    { image: "/picmug.webp", name: "Photo Gifts" },
    { image: "/label.webp", name: "Labels, Stickers & Packaging" },
    { image: "/label.webp", name: "Custom Stationery" },
    { image: "/label.webp", name: "Signs, Posters & Marketing Materials" },
    { image: "/label.webp", name: "More Categories" },
  ];
  
  return (
    <div>
      <Navbar />
      <Hero/>
      <SwiperSlider/>
      <RectSlider categories={categories}/>
      <RectSlider categories={categories1}/>
      <RectSlider categories={categories2}/>
      landing page
    </div>
  )
}

export default page
