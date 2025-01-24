import Footer from "./(landing)/_components/footer";
import Navbar from "./(landing)/_components/navbar";
import { Onest } from 'next/font/google';
const onest = Onest({
  subsets: ['latin'], // Choose appropriate subsets
  weight: ['400', '500', '700'], // Specify font weights you need
});

import { ReactNode } from "react";
import UserProvider from "./_component/user-provider";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <UserProvider>
     
      <main className={onest.className}>{children}</main>
      </UserProvider>
      <Footer/>
    </div>
  );
};

export default Layout;
