"use client";
 
import CreateUserForm from "../_components/create-userform";
import { verificationColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useGetTokens } from "@/features/verification/api/use-get-tokens";


 


 const Userform = () => {
   
  const {data} = useGetTokens();

  return (
   <>

   <CreateUserForm />
{ data &&   <DataTable columns={verificationColumns} data={data.data!} filterKey={'email'} />}
   </>
  );
};
export default Userform;