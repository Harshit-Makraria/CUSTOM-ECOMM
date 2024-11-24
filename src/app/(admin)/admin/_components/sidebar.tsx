 
import { Logo } from "@/features/editor/components/logo";// Ensure this path is correct or update it to the correct path
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex fixed flex-col w-[300px] left-0 shrink-0 h-full">
      <Logo />
      <SidebarRoutes />
    </aside>
  );
};
