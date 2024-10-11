
 
 
import { verificationColumns } from "./_components/column";
import { DataTable } from "./_components/data-table";
import { useGetTokens } from "@/features/verification/api/use-get-tokens";
import DisplayVerificationToken from "./_components/display-verifaction-table";
import CreateUserForm from "./_components/create-userform";
import Userform from "./_components/userForm";


 


 const page = () => {
   
 

  return (
   <>
 
  
  
   <Userform />

   <DisplayVerificationToken/>
   </>
  );
};

export default page;