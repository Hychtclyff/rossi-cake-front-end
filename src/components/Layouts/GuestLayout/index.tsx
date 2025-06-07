import { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type GuestLayoutsProps = {
  children: ReactNode;
};

export const GuestLayouts = ({ children }: GuestLayoutsProps) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
