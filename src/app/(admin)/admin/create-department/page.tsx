"use client";
 
 

import CreateDepartmentForm from "./_components/create-departmentform";
import DisplayDepartments from "./_components/display-department-table";


 


 const page = () => {
   
  return (
   <>

   <CreateDepartmentForm />
 <DisplayDepartments/>
   </>
  );
};
export default page;