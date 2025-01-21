// components/PromotionalCards.tsx
import Image from 'next/image';
import db from '@/db/prisma';
import Link from 'next/link';
const PromotionalCards = async () => {

  
  const categorys = await db.category.findMany();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-1 mx-8 h-[70vh] p-1">
      {/* Left Card */}
      {categorys.map((item)  => (

      <div className="relative flex flex-col justify-between  shadow-lg  p-1 w-full h-full lg:w-1/2">
        <Image
          src={item.imageUrl}
          alt="Winterwear"
          width={900}
          height={1000}
          className="rounded-sm object-cover h-full"
        />
        <div className="absolute bottom-16 w-72 h-56  left-4 bg-gray-100 p-4 rounded-lg shadow-lg ring-1 ring-gray-300   ">
          <h2 className="text-2xl font-bold">Get your {item.name} from us</h2>
          <p className="text-gray-600 mt-2 mb-10">{item.name} starts at Rs 700</p>
          
          <Link key={item.id} href={`/${item.name}/${item.id}`} className="mt-24  bg-black text-white px-4 py-2 rounded">
       
            Shop Now
          </Link>
        </div>
      </div>
      ))}

      {/* Right Card */}
      {/* <div className="relative flex flex-col justify-between  shadow-lg  p-1 w-full h-full lg:w-1/2">
        <Image
          src="/Standee.webp"
          alt="Calendars and Notebooks"
          width={800}
          height={1800}
          className="rounded-sm object-cover h-full"
        />
        <div className="absolute bottom-16 w-72 left-6 bg-gray-100 p-4 rounded-lg shadow-lg ring-1 ring-gray-300">
          <h2 className="text-2xl font-bold">Premium quality at best Price</h2>
          <p className="text-gray-600 mt-2">
            Calendars, Notebooks and Diaries starting at Rs 160
          </p>
          <div className="flex gap-1 mt-4">
            <button className="bg-black text-white px-4 py-2 rounded">
              Calendars
            </button>
            <button className="bg-black text-white px-4 py-2 rounded">
              Notebooks
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PromotionalCards;