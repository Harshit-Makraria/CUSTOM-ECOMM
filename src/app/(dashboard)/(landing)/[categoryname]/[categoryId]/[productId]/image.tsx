"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import db from "@/db/prisma";
import { CanvaJson, Design, Product } from "@prisma/client";
import Link from "next/link";
import { useCreatecart } from "@/features/cart/api/use-create-cart";
import { toast } from "sonner";

export default function BannerPage({
  categoryId,
  product,
}: {
  categoryId?: string;
  product: any;
}) {
  const { mutate } = useCreatecart();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product.imageUrl
  );
  const thumbnails = [
    product.imageUrl || "/default-image.png",
    "/Banner.jpeg",
    "/car_sale.png",
    "/Flex.webp",
  ];
  const [quantity, setQuantity] = useState<string>();
  // const [isOpen, setIsOpen] = useState(true);
  const quantities = ['1', '2', '3', '4', '5', '10', '25', '50'];
  const handleSelect = (unt:string) => {
    setQuantity(unt);
    // setIsOpen(false);
  };
  console.log({
    designId: product.design.id,
    productId: product.id,
    categoryId: product.categoryId,
    quantity: quantity,
    unitPrice: product.price[0],
    productName: product.name,
  });
  const handleEdit = () => {
    if (!quantity) {
      toast.error("Please select a quantity before proceeding.");
      return;
    }
  
    mutate(
      {
        designId: product.design.id,
        productId: product.id,
        categoryId: product.categoryId,
        quantity: quantity,
        unitPrice: product.price[0],
        productName: product.name,
      },
      {
        onSuccess: (data) => {
          window.location.href = `/editor/${data.designId}/${data.jsonId}`;
        },
      }
    );
  };
  
  console.log(quantity);
  return (
    <>
      <div className="">
        {/* Breadcrumb Navigation */}
        <div className=" top-0 left-0 w-full bg-white z-10  border-b shadow-sm">
          <span>Home</span> / <span>{product.name.toUpperCase()}</span>
        </div>
        <div className="flex pt-16">
          {/* Image Section */}
          <div
            className={`w-3/5 sticky top-5 h-[800px] bg-white rounded-lg ml-4`}
          >
            {/* Main Image */}
            <img
              className="w-full object-cover h-[70%] rounded-lg shadow-md"
              src={selectedImage}
              alt="Selected Banner"
            />

            {/* Thumbnails */}
            <div className="thumbnails flex gap-2 mt-4 justify-start ml-5">
              {thumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail cursor-pointer rounded w-16 h-16 object-cover border-2 ${
                    thumbnail === selectedImage
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(thumbnail)}
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="w-2/5 ml-auto h-full p-8 ">
            <h1 className="text-2xl font-bold mb-4">
              {product.name.toLocaleUpperCase()}
            </h1>
            <p className="mb-4 text-gray-600">
              Promote your brand with durable, lightweight banners
            </p>
            <ul className="list-disc ml-6 mb-4 text-gray-600">
              <li>
                Select your own custom size from the size drop-down and design
                your banner
              </li>
              <li>
                Pre-designed Banner templates available for occasions like
                Birthday, Promotional Events, etc.
              </li>
              <li>
                Vertical or horizontal designed banner layouts available (both
                indoor & outdoor)
              </li>
              <li>Sharp, full-colour printing</li>
              <li>Durable material (Vinyl Flex)</li>
              <li>
                Hang your banners easily with optional metal eyelets (strongly
                recommended – they make it a lot easier!)
              </li>
            </ul>

            <p className="mb-4">
              {product.cod
                ? "Cash on Delivery available"
                : "Cash on Delivery unavailable"}
            </p>
            <ul className="mb-4 text-sm font-bold list-disc ml-6">
              <li>Price below is MRP (inclusive of all taxes)</li>
            </ul>

            {/* Links */}
            <div className="links mb-8">
              <a
                href="#"
                className="text-black underline text-sm text-start w-full hover:underline block mb-2"
              >
                See Details
              </a>
              <a
                href="#"
                className="text-black underline text-sm text-start w-full hover:underline block mb-2"
              >
                View Specs & Templates
              </a>
            </div>

            {/* Size and Eyelets */}
            {/* <div className="flex flex-col gap-4 mb-8">
              <div className="w-full border-black border-2 rounded-xl p-4 flex justify-between items-center">
                <label htmlFor="size" className="block mb-2 text-gray-600">
                  Size
                </label>
                <select id="size" name="size" className="border rounded-md p-2">
                  {product.size.map((size: any, index: any) => (
                    <option key={index} value={size}>
                      {size.replace("x", " cm x ")}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

            {/* Quantity Pricing */}
            
            <div className="w-full mt-4">
      <label htmlFor="quantity" className="block text-gray-600 mb-2">
        Select Quantity:
      </label>
      
      {/* Dropdown menu */}
      
        <ul className="space-y-4 mt-4 overflow-y-hidden z-10">
          {quantities.map((unit) => (
            <li
              key={unit}
              className={`w-full border-black border-2 rounded-xl p-4 flex justify-between items-center  ${unit == quantity ? "border-black" : "border-gray-300"}`}
              onClick={() => handleSelect(unit)}
            >
              <div className="font-bold text-lg">{unit}</div>
                    <div className="text-lg flex items-end">
                      ₹{product.price * parseInt(unit)}.00{" "}
                      <div className="text-sm text-gray-400 ml-2">
                        ₹{product.price} / unit
                      </div>
                    </div>
            </li>
          ))}
        </ul>
    
    </div>
     <div className="w-full flex-col rounded-xl p-4 flex justify-start items-start">
              <span>1 starting at ₹{product.price}</span>
              <span className="underline">FREE SHIPPING</span>
            </div>
            <button
              onClick={handleEdit}
              className="w-full flex-col rounded-xl mt-6 bg-cyan-400 p-4 flex justify-start items-start"
            >
              <span className="font-bold text-lg">Edit Designs</span>
              <span className="font-semibold text-base">
                Choose one of our templates
              </span>
            </button>
            <div className="w-full rounded-xl p-4 flex justify-center items-center">
              <div className="mt-5 flex justify-between items-center gap-2 text-gray-500">
                <IoCheckmarkDoneCircleOutline />
                <span>100% satisfaction guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .thumbnails {
            position: relative;
            bottom: 0;
          }
        `}</style>
      </div>
    </>
  );
}
