"use client";

import {
  EmployeeResponse,
  useGetEmployee,
} from "@/features/employee/api/use-get-employee";
import { Loader } from "lucide-react";
import React, { createContext, useContext } from "react";


// @ts-ignore
const EmployeeContext = createContext<EmployeeResponse>(null);

export const useEmployeeDetail = () => {
  return useContext(EmployeeContext);
};

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data , isPending  } = useGetEmployee();


  if(isPending) {
    return  <div className="h-screen w-full bg-white text-center flex items-center justify-center">

      <Loader size={22} className="animate-spin" />
    </div>
  }
   
  if (!data)
    return (
      <div className="h-screen w-full text-center flex items-center justify-center">
        <h1 className="text-black font-semibold text-2xl">Something went wrong</h1>
      </div>
    );

  return (
    <EmployeeContext.Provider value={data}>{children}</EmployeeContext.Provider>
  );
};
