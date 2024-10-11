import CreateUserForm from "./create-userform";


 import db from "@/db/prisma";
 


 const Userform = async () => {
    const posts = await db.post.findMany();
    const departments = await db.department.findMany();


  return (
   <>
 
   <CreateUserForm posts={posts} departments={departments} />

   </>
  );
};
export default Userform;