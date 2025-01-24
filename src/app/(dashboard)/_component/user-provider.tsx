'use client'

import { useGetUser, UserResponse } from "@/features/user/api/use-get-user";
import { Loader } from "lucide-react";
import React, { useContext, createContext } from "react";
 
// @ts-ignore
const UserContex = createContext<UserResponse | null>(null);

  const UserProvider = ({children} : {children :React.ReactNode}) => {
  const Provider = UserContex.Provider;
  const {data , isPending} = useGetUser()
   console.log(data)


  
  if(isPending) {
    return  <div className="h-screen w-full bg-white text-center flex items-center justify-center">

      <Loader size={22} className="animate-spin" />
    </div>
  }


     //@ts-ignore
  return <Provider value={data}>{children}</Provider>;
};


export const UseUser = () =>{
    return useContext(UserContex)
}

export default UserProvider  
 