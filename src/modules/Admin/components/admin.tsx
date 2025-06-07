import { TabsContent } from "@/components/ui/tabs";
import DashboardOverviewPage, { DashboardAdmin } from "./dashboard";
import { LayoutAdmin } from "./layout";
import DiscountVoucherManagement from "./vocherManagement";
import MaterialManagement from "./materialsManagement";
import UserManagement from "./usersManagement";
import ProductsPage from "./productsManagement";

export const Admin = () => {
  return (
    <>
      <LayoutAdmin>
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
            <div className="flex gap-2">
              <TabsContent value="dashboard" className="w-full flex ">
                <DashboardOverviewPage />
              </TabsContent>
              <TabsContent value="products" className="w-full flex ">
                <ProductsPage />
              </TabsContent>
              <TabsContent value="stock" className="w-full flex ">
                <MaterialManagement />
              </TabsContent>
              <TabsContent value="promo" className="w-full flex ">
                <DiscountVoucherManagement />
              </TabsContent>
              <TabsContent value="users" className="w-full flex ">
                <UserManagement />
              </TabsContent>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};
