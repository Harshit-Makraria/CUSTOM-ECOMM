"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUpdateCart } from "@/features/cart/api/use-update-cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";




const DesignReviewForm = ({designIds} : {designIds: string}) => {
  const [isChecked, setIsChecked] = useState(false);

  const {mutate , isPending} = useUpdateCart()
   const router = useRouter()
  const handleCheckboxChange = () => {
    
    mutate({
      designId:designIds,
      isConsent:true,

    },
    
     { onSuccess ()  {
  
      router.push('/cart')
     } ,
      onError : ()=> {
      setIsChecked(false)
      toast.error("something went wrong")
      }
     }
  
  )
  };

  return (
    <>
      <div className="mt-6">
        <label className="flex items-center space-x-2">
          <input
            id="authorization-checkbox"
            type="checkbox"
            className="form-checkbox"
            checked={isChecked}
            disabled={isPending}
            onChange={()=>setIsChecked(true)}
          />
          <span className="text-sm text-gray-700">
            I have authorization to use the design, I have reviewed and approve it.
          </span>
        </label>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={()=>handleCheckboxChange()}
          id="continue-button"
          className={`px-4 py-2 rounded font-semibold ${
            isChecked
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          
          disabled={!isChecked}
        >
          Continue
        </button>
        <button className="px-4 py-2 rounded bg-gray-100 text-gray-700 border font-semibold hover:bg-gray-200">
          Edit my design
        </button>
      </div>
    </>
  );
};

export default DesignReviewForm;
