import Footer from "./(landing)/_components/footer";
import Navbar from "./(landing)/_components/navbar";
import { Onest } from 'next/font/google';
const onest = Onest({
  subsets: ['latin'], // Choose appropriate subsets
  weight: ['400', '500', '700'], // Specify font weights you need
});

import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className={onest.className}>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
