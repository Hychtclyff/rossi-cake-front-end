import { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type GuestLayoutsProps = {
  children: ReactNode;
};

export const GuestLayouts = ({ children }: GuestLayoutsProps) => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
