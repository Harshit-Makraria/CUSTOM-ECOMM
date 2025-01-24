import React from "react";

const Footer = () => {
  return (
    <footer className="text-black bg-gray-50 px-6 py-12 border-t border-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-6">
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <span className="bg-purple-600 h-4 w-4 rounded-full"></span>
            <span> Raybrand</span>
          </h2>
          <p className="mt-2 text-gray-400">The new home for your digital goods</p>
          <button className="mt-4 text-white bg-black px-8 py-2 rounded-lg font-semibold">
            Follow
          </button>
        </div>

        {/* Middle Section */}
        <div className="ring-1 ring-gray-400 p-4 rounded-lg">
          <h3 className="font-bold  text-lg mb-3">Join our waiting list</h3>
          <p className="text-gray-400">
            Get notified about new products as soon as they drop
          </p>
          <div className="flex mt-4 ">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-4 py-2 rounded-l-md ring-1 text-black ring-zinc-400 rounded-lg  bg-white focus:outline-none"
            />
            <button className="px-4 py-2 text-white ml-5 bg-black font-semibold rounded-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex  ">
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold">Product Hub</h3>
          <a href="#" className="text-gray-400 hover:text-white">
            Explore
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Contact Us
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Free Remix
          </a>
        </div>
        <div className="flex flex-col space-y-2 ml-16">
          <h3 className="font-semibold">Account</h3>
          <a href="#" className="text-gray-400 hover:text-white">
            Activate Membership
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Sign In
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Reset Password
          </a>
        </div>
        </div>
      </div>
      <p className="ml-24 pt-10 ">Created By <span className="text-lg font-semibold">WEPPDEV SOLUTIONS</span></p>

      {/* Bottom Section */}
      <div className="mt-6 border-t border-gray-800 pt-6 text-center sm:text-left sm:flex justify-between items-center">
        <p className="text-gray-400 ml-24 text-lg font-semibold">Powered by Raybrand</p>
        {/* <p className="text-gray-400">
          Created by <span className="text-white">Danny Sapio</span>
        </p> */}
        <p className="text-gray-400 text-sm">© Copyright 2023 Weppdev Solutions</p>
      </div>
    </footer>
  );
};

export default Footer;
