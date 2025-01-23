import Footer from "./(landing)/_components/footer";
import Navbar from "./(landing)/_components/navbar";


import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
