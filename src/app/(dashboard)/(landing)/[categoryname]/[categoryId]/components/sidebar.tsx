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
"use client"
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SidebarProps {
  catname: string;
  currentFilters: { size?: string; eyelets?: string };
  categoryId: string;
  availableSizes: string[];
  availableEyelets: string[];
}

export default function Sidebar({
  catname,
  currentFilters,
  categoryId,
  availableSizes,
  availableEyelets,
}: SidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to update filters in the URL
  const handleFilterChange = (filterType: "size" | "eyelets", value: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (params.get(filterType) === value) {
      params.delete(filterType); // Remove the filter if it's already selected
    } else {
      params.set(filterType, value); // Set the selected filter
    }

    router.push(`/${catname}/${categoryId}?${params.toString()}`);
  };

  // Check if the filter is active by comparing with the currentFilters state
  const isChecked = (filterType: "size" | "eyelets", value: string) => {
    if (filterType === "size") return currentFilters.size === value;
    if (filterType === "eyelets") return currentFilters.eyelets === value;
    return false;
  };

  return (
    <div className="sidebar p-6 bg-gray-50 border-r-2 w-64 h-full">
      <h2 className="text-lg font-bold">All Filters</h2>
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Sizes</h3>
        <ul>
          {availableSizes.map((size) => (
            <li key={size}>
              <label className="flex items-center text-md mt-2 space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked("size", size)}
                  onChange={() => handleFilterChange("size", size)}
                />
                <span>{size} cm</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 text-lg">
        <h3 className="font-semibold mb-2">Eyelets</h3>
        <ul>
          {availableEyelets.map((eyelet) => (
            <li key={eyelet}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked("eyelets", eyelet)}
                  onChange={() => handleFilterChange("eyelets", eyelet)}
                />
                <span>{eyelet}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
