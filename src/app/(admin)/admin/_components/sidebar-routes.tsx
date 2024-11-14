"use client";

import { 
  CreditCard, 
  Crown, 
  Home, 
   
} from "lucide-react";
import { usePathname } from "next/navigation";
 
import { Separator } from "@/components/ui/separator";

import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  

  const pathname = usePathname();


  return (
    <div className="flex flex-col gap-y-4 flex-1">
     
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/admin/portal"
          icon={Home}
          label="portal"
          isActive={pathname === "/admin/portal"}
        />
         <SidebarItem
          href="/admin/create-user"
          icon={Home}
          label="Create user"
          isActive={pathname === "/admin/create-user"}
        />
         <SidebarItem
          href="/admin/create-product"
          icon={Home}
          label="Create product"
          isActive={pathname === "/admin/create-product"}
        />
          <SidebarItem
          href="/admin/create-branch"
          icon={Home}
          label="Create Branch"
          isActive={pathname === "/admin/create-branch"}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
     
    </div>
  );
};
