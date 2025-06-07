import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconMoneybag,
  IconPackage,
  IconSettings,
  IconShoppingBag,
  IconTicket,
  IconUserBolt,
  IconWorldDownload,
} from "@tabler/icons-react";
import { useState } from "react";
import { Logo } from "./logo";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const SidebarAdmin = () => {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      value: "dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },

    {
      label: "Products",
      href: "#",
      value: "products",
      icon: (
        <IconShoppingBag className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Stock",
      href: "#",
      value: "stock",
      icon: (
        <IconPackage className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Promo",
      href: "#",
      value: "promo",
      icon: (
        <IconTicket className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },

    {
      label: "users",
      href: "#",
      value: "users",

      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Finanace",
      href: "#",
      value: "finanace",
      icon: (
        <IconMoneybag className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "My Wesbite",
      href: "/",
      value: "wesbite",

      icon: (
        <IconWorldDownload className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      value: "settings",

      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <>
            <Logo />
          </>
          <TabsList className="mt-8 flex flex-col gap-2 items-start justify-start">
            {links.map((link, idx) => (
              <TabsTrigger
                value={link.value}
                className="p-0 w-full justify-start"
              >
                <SidebarLink key={idx} link={link} />
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Manu Arora",
              href: "#",
              icon: (
                <img
                  src="https://assets.aceternity.com/manu.png"
                  className="h-7 w-7 shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default SidebarAdmin;
