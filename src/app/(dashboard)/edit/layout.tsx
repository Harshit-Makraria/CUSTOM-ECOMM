import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return ( 
    <div className="bg-muted h-full">
      {/* <Sidebar /> */}
     
        <Navbar />
        <main className="">
          {children}
        </main>
      
    </div>
  );
};
 
export default DashboardLayout;
