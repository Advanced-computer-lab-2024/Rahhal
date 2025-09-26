import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdvertiserSidebar } from "./AdvertiserSidebar";
import { createContext, useEffect, useState } from "react";
import { TUser } from "@/types/user";
import { DEFAULTS } from "@/lib/constants";
import { getUserById } from "@/api-calls/users-api-calls";
import { Outlet } from "react-router-dom";
import useUserStore from "@/stores/user-state-store";

export const EditContextAdvertiser = createContext<{ user: TUser }>({ user: DEFAULTS.ADMIN_DATA });

export default function AdvertiserHomepage() {
  const { id } = useUserStore();
  const [user, setUser] = useState<TUser>(DEFAULTS.ADMIN_DATA);

  useEffect(() => {
    if (id) {
      getUserById(id).then((data) => {
        setUser(data);
      });
    }
  }, [id]);

  return (
    <SidebarProvider defaultOpen={false}>
      <AdvertiserSidebar id={id} />
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header with Burger Menu */}
        <div className="md:hidden flex items-center justify-between border-b pb-4 p-4">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">Advertiser Panel</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <EditContextAdvertiser.Provider value={{ user }}>
            <Outlet />
          </EditContextAdvertiser.Provider>
        </div>
      </main>
    </SidebarProvider>
  );
}
