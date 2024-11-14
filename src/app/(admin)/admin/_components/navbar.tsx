import { UserButton } from "@/features/auth/components/user-button"
import AccountButton from "./account-button";

export const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b flex items-center p-4 h-[68px]">

 
     <AccountButton/>


      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};
