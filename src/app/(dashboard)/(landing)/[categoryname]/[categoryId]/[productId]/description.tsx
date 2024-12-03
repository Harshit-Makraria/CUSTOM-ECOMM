"use client";
 
import { useState } from "react";
 
const CustomBannersPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const faqs = [
    { question: "What is the banner material made of?", answer: "The banner is made of high-quality vinyl, suitable for outdoor and indoor use." },
    { question: "How do I customise the banner?", answer: "You can customize the banner using our online design tool or upload your own design." },
    { question: "Will my banner be fade-resistant?", answer: "Yes, our banners are designed to be fade-resistant for up to 3 years." },
    { question: "Can I order a custom banner size?", answer: "Absolutely! We offer a variety of sizes and can accommodate custom requests." },
    { question: "Can I get full-bleed printing on my custom banner?", answer: "Yes, we offer full-bleed printing to ensure edge-to-edge designs." },
    { question: "Can I write on my vinyl banner?", answer: "Yes, you can write on vinyl banners with markers, but permanent markers work best." },
    { question: "Do I get a container to store the banner?", answer: "Yes, we provide a storage container with every banner order." },
    { question: "Will eyelets come included on my banner?", answer: "Yes, eyelets are included by default for easy hanging." },
    { question: "If I want eyelets, how many will be on my banner and where are they placed?", answer: "Eyelets are placed approximately every 2 feet along the edges." },
    { question: "If I see wrinkles on my banner, how do I remove them?", answer: "You can remove wrinkles by gently heating the banner with a hairdryer." },
  ];
 
  const [openIndex, setOpenIndex] = useState<number | null>(null);
 
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };
 
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
    <div className="flex gap-10 w-[100%]">
        <div className=" w-1/2">
            <h1 className="text-2xl font-bold">Customised Banners  when you want to broadcast your message out loud!</h1>
            <p>
              Grab customer&quot;s attention quickly before they move on to the next shiny big
              thing, with vinyl banner printing. Custom Banners are the best way to catch
              the eyeballs of the passers-by. When placed strategically, it helps you get
              more attention and results in more footfalls.
            </p>
            <p>
              Personalise your Flex banner online, by choosing from different sizes and
              themes that are best suited for your business, occasions and location.
              These weatherproof and durable banners will help you display your logo and
              message for a long-lasting period, indoor as well as outdoor. It&quot;s easy to
              install, easy to store and at prices that will make your pocket smile.
            </p>
            <p>
              To start creating your banner online, explore our gallery of fully
              customisable design templates, including industry and event-specific
              options. Once you&quot;ve found your favorite design, make it yours by adding
              your custom details and choosing the options that work best for you. If you
              have a design ready, use our design upload option, and we will take care of
              the rest like printing and shipping your order. Your banner will arrive
              looking great and ready to get noticed.
            </p>
            <h2 className="text-lg font-semibold">Design tips for banners</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use large fonts and images so people can see your flex banner from a distance</li>
              <li>Contrast your background and text colours to increase readability</li>
              <li>Focus on one main message that people can understand quickly</li>
            </ul>
            <p className="italic text mt-4">
              The Site should not be used to produce material covered under the purview
              of The Representation of the People Act, 1951. You release us from all
              liability relating or arising out of such content or product.
            </p>
            <p className="text">
              Vistaprint India customizes all its products in facilities located within
              India. Some of our raw materials, intermediate components, and consumables
              used in the manufacturing of the final product could be from one or more
              countries. As we follow Global Sourcing, one product is likely to have a different country of origin depending on the batch sold.
            </p>
            <p className="text-lg mt-2 font-semibold">
            Country of Origin: India
            </p>
            <p className="text-base font-sans mt-2">
            Vistaprint offers <span className="underline">Banners design templates</span> in assorted styles.
            </p>
          </div>
          <div className=" w-1/2">
            <img
              className="w-full object-cover h-[90%] rounded-lg shadow-md"
            
              alt="Selected Banner"/>
          </div>
        </div>
 
        );
      case "specs":
        return (
          <>
            <div className="w-[100%] h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="w-full border-b p-6 bg-white">
        <h1 className="text-2xl font-semibold">Specs & Templates</h1>
      </div>
 
      {/* Content */}
      <div className="flex-grow grid grid-cols-2">
        {/* Left Section (Safe Area Placeholder) */}
        <div className="flex justify-center items-center bg-gray-100 border-dashed border-4 py-10 border-gray-300">
          <div className="relative w-[60%] pb-[60%] bg-gray-200 flex items-center justify-center border border-gray-400">
            <p className="absolute inset-0 flex items-center justify-center text-gray-500 text-2xl font-medium">
              Safe Area
            </p>
          </div>
        </div>
 
        {/* Right Section (Details) */}
        <div className="p-8 bg-white flex flex-col justify-start">
          {/* Size Dropdown */}
          <div>
            <label htmlFor="size" className="block text-lg font-medium text-gray-700">
              Size
            </label>
            <select
              id="size"
              className="mt-2 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option>Custom</option>
            </select>
          </div>
 
          {/* Instruction */}
          <p className="mt-4 text-gray-600">
            To avoid white edges, extend your design to the full bleed size  but keep text and images within the safety
            area.
          </p>
 
          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md text-sm font-medium">
              PDF
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md text-sm font-medium">
              SVG
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md text-sm font-medium">
              Adobe Illustrator (.ai)
            </button>
          </div>
 
          {/* Specs */}
          <ul className="mt-8 text-gray-700 space-y-2">
            <li>
              <strong>Full Bleed Size:</strong> 19.92 x 19.92 (506 x 506 mm)
            </li>
            <li>
              <strong>Document Trim Size:</strong> 19.69 x 19.69 (500 x 500 mm)
            </li>
            <li>
              <strong>Safety Area:</strong> 19.45 x 19.45 (494 x 494 mm)
            </li>
          </ul>
        </div>
      </div>
    </div>
          </>
 
        );
      case "options":
        return (
          <div className="w-full h-full flex flex-col bg-gray-50">
          {/* Header */}
          <div className="w-full border-b p-6 bg-white">
            <h1 className="text-2xl font-semibold">Options: Banners</h1>
          </div>
 
          {/* Content */}
          <div className="flex-grow flex flex-col p-8">
            {/* Section Title */}
            <h2 className="text-xl font-medium text-gray-800 mb-6">Eyelets</h2>
 
            {/* Options */}
            <div className="flex gap-6 justify-start items-start flex-wrap">
              {/* Eyelets Option */}
              <div className="flex flex-col items-center w-[calc(50%-1rem)] sm:w-[240px]">
                <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="/Eyelets.png"
                    alt="Eyelets"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-gray-700 font-medium">Eyelets</p>
              </div>
 
              {/* None Option */}
              <div className="flex flex-col items-center w-[calc(50%-1rem)] sm:w-[240px]">
                <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src="/bg.jpg"
                    alt="None"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-center text-gray-700 font-medium">None</p>
              </div>
            </div>
          </div>
        </div>
 
        );
      case "faq":
        return (
          <div className="min-h-screen bg-gray-50 py-10 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b">
                  <button
                    className="w-full text-left flex justify-between items-center py-4 focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-gray-900 font-medium">{`Q: ${faq.question}`}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="pl-6 pr-2 pb-4 text-gray-700">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };
 
  return (
    <div className="p-6 font-sans">
      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex space-x-4">
          {["overview", "specs", "options", "faq"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-medium rounded-t-md ${
                activeTab === tab
                  ? " text-black"
                  : " text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>
 
      {/* Content */}
      <div>{renderContent()}</div>
    </div>
  );
};
 
export default CustomBannersPage;