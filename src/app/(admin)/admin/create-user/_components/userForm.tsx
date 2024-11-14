import CreateUserForm from "./create-userform";


 import db from "@/db/prisma";
 


 const Userform = async () => {
    const posts = await db.post.findMany();
    const branchs = await db.branch.findMany();


  return (
   <>
 
   <CreateUserForm posts={posts} branchs={branchs} />

   </>
  );
};
export default Userform;