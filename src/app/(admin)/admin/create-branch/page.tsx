"use client";
 
 

import CreateDepartmentForm from "./_components/create-branchform";
import DisplayDepartments from "./_components/display-branch-table";


 


 const page = () => {
   
  return (
   <>

   <CreateDepartmentForm />
 <DisplayDepartments/>
   </>
  );
};
export default page;