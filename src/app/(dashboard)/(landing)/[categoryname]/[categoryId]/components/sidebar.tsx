// import React from "react";
// import Link from "next/link";

// interface SidebarProps {
//   categoryId: string;
//   currentFilters: { size: string | undefined; eyelets: string | undefined };
//   catid: string;
//   catnm: string;
// }

// const Sidebar: React.FC<SidebarProps> = ({ categoryId, currentFilters,catid,catnm }) => {
//   const { size, eyelets } = currentFilters;

//   return (
//     <div className="sidebar p-6 bg-gray-200 w-64 ">
//       <h2 className="text-xl font-bold">Filters</h2>

//       {/* Filter by Size */}
//       <div className="mt-4">
//         <h3 className="text-lg">Size</h3>
//         {["S", "M", "L"].map((sizeOption) => (
//           <Link
//             key={sizeOption}
//             href={{
//               pathname: `/${catnm}/${catid}`,
//               query: { size: sizeOption, eyelets: eyelets || "" },
//             }}
//             className={`px-4 py-2 mt-2 ${size === sizeOption ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           >
//             {sizeOption}
//           </Link>
//         ))}
//       </div>

//       {/* Filter by Eyelets */}
//       <div className="mt-4">
//         <h3 className="text-lg">Eyelets</h3>
//         {["2", "4"].map((eyeletOption) => (
//           <Link
//             key={eyeletOption}
//             href={{
//               pathname: `/${catnm}/${catid}`,
//               query: { size: size || "", eyelets: eyeletOption },
//             }}
//             className={`px-4 py-2 mt-2 ${eyelets === eyeletOption ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           >
//             {eyeletOption} Eyelets
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
"use client";

import qs from "query-string";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import db from "@/db/prisma";
export default function Sidebar({
  catname,
  currentFilters,
  categoryId,
  availableSizes,
  availableEyelets,
}: {
  catname: string;
  currentFilters: { size?: string | undefined; eyelets?: string | undefined };
  categoryId: string;
  availableSizes: string[]; // Array of sizes fetched from the database
  availableEyelets: string[]; // Array of eyelets fetched from the database
}) {
  const pathname = usePathname()
  const [selectedSize, setSelectedSize] = useState(currentFilters.size || "");
  const [selectedEyelet, setSelectedEyelet] = useState(currentFilters.eyelets || "");
  const router = useRouter();
// const pro = db.product.findMany(); 

  const applyFilters = () => {
   
    
      const url = qs.stringifyUrl({
        url: pathname,
        query: {
          size: selectedSize??null,
          eyelets: selectedEyelet??null
        }
      }, { skipNull: true, skipEmptyString: true,  });
  
      router.push(url);
  
    
  };

  return (
    <div className="p-4 border-r">
      <h2 className="font-bold mb-4">Filters</h2>

      {/* Size Filters */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Size:</label>
        {availableSizes.map((size) => (
          <div key={size} className="flex items-center mb-2">
            <input
              type="radio"
              id={`size-${size}`}
              name="size"
              value={size}
              checked={selectedSize === size}
              onChange={() => setSelectedSize(size)}
              className="mr-2"
            />
            <label htmlFor={`size-${size}`}>{size}</label>
          </div>
        ))}
      </div>

      {/* Eyelet Filters */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Eyelets:</label>
        {availableEyelets.map((eyelet) => (
          <div key={eyelet} className="flex items-center mb-2">
            <input
              type="radio"
              id={`eyelet-${eyelet}`}
              name="eyelet"
              value={eyelet}
              checked={selectedEyelet === eyelet}
              onChange={() => setSelectedEyelet(eyelet)}
              className="mr-2"
            />
            <label htmlFor={`eyelet-${eyelet}`}>{eyelet}</label>
          </div>
        ))}
      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
}
