import { UserButton } from "@/features/auth/components/user-button";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      {/* Main Navbar */}
      <div className=" mx-auto flex justify-between items-center px-4 lg:px-8 font-sans py-5">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <img
            src="/LOGOO.png" // Replace with your logo's path
        
            className="w-16"
          /> */}
          <p className="font-bold font-sans ">CANVAS</p>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center w-1/2 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full border h-10 border-gray-500 ring-2 ring-gray-100 rounded-lg py-2 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 text-gray-500 hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 h"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1110.5-10.5m0 0A7.5 7.5 0 0116.65 16.65z"
              />
            </svg>
          </button>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-10 text-sm text-gray-600">
          <div className="flex items-center space-x-1 hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 8.25h7.5m-7.5 3.75h7.5m-7.5 3.75h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="font-semibold text-[16px]">
            <span>Help is here</span>
            <p></p>
            <span className="hidden lg:inline text-[12px]">(02522-669393)</span>
            </div>
          </div>
          <Link href="/projects" className="hover:text-blue-600">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5M3.75 9h16.5m-16.5 3.75h16.5m-16.5 3.75h16.5m-16.5 3.75h16.5"
                />
              </svg>
              <Link href={`/orders`} className="font-semibold text-[16px]" >My Orders</Link>
            </div>
          </Link>
         
          <Link href="/cart" className="hover:text-blue-600">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 mt-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.375 3.375h1.5l.375 2.25M8.625 12h7.125m-7.125 0l.75 4.5m6.375-4.5l-.75 4.5m-8.625-4.5h-2.25m10.125 0h2.25m-9.375 0h7.875m-7.875 0l-.75-4.5m8.625 4.5l.75-4.5m2.25-4.5H6.75m-.375 0l-.375 2.25m.75-2.25h11.25m-.75 2.25l-.75-4.5m0 0H7.875m8.625 4.5H6.75m-3.375 0h1.5l.375 2.25m0 0h-.75m0 0h.75"
                />
              </svg>
              <span className="font-semibold text-[16px]">Cart</span>
            </div>
          </Link>

           {/* <Link href="/account" className="hover:text-blue-600"> */}
           <div className="flex items-center space-x-1">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 7.125a4.125 4.125 0 11-8.25 0 4.125 4.125 0 018.25 0zM12 14.625c4.125 0 7.5 2.625 7.5 5.25v1.125H4.5V19.875c0-2.625 3.375-5.25 7.5-5.25z"
                />
              </svg> */}
              <UserButton />
            </div>
          {/* </Link> */}
        </div>
      </div>

      {/* Category Links */}
      {/* <div className="bg-gray-50 border-t border-gray-200">
        <div className="font-sans font-semibold flex space-x-2 text-center py-2  lg:px-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 ">
            View All
          </Link>
          <Link href="/visiting-cards" className="hover:text-blue-600">
            Visiting Cards
          </Link>
          <Link href="/stationery" className="hover:text-blue-600">
            Stationery, Letterheads & Notebooks
          </Link>
          <Link href="/pens" className="hover:text-blue-600">
            Personalised Pens
          </Link>
          <Link href="/stamps" className="hover:text-blue-600">
            Stamps and Ink
          </Link>
          <Link href="/marketing-materials" className="hover:text-blue-600">
            Signs, Posters & Marketing Materials
          </Link>
          <Link href="/labels" className="hover:text-blue-600">
            Labels, Stickers & Packaging
          </Link>
          <Link href="/clothing" className="hover:text-blue-600">
            Clothing, Caps & Bags
          </Link>
          <Link href="/mugs" className="hover:text-blue-600">
            Mugs, Albums & Gifts
          </Link>
          <Link href="/bulk-orders" className="hover:text-blue-600">
            Bulk Orders
          </Link>
          <Link href="/calendars" className="hover:text-blue-600">
            Calendars, Notebooks & Diaries
          </Link>
          <Link href="/custom-wear" className="hover:text-blue-600">
            Custom Winter Wear
          </Link>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
