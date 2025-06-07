import { Tabs } from "@/components/ui/tabs";
import SidebarAdmin from "./sidebar";

export const LayoutAdmin = ({ children }) => {
  return (
    <Tabs
      defaultValue="dashboard"
      className="flex w-full max-w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800 h-screen"
    >
      <SidebarAdmin />
      {children}
    </Tabs>
  );
};
