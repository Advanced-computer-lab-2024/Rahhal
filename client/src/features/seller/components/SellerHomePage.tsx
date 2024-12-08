import { SidebarProvider } from "@/components/ui/sidebar";
import { SellerSidebar } from "@/features/seller/components/SellerSidebar";
import { createContext, useEffect, useState } from "react";
import { TUser } from "@/types/user";
import { DEFAULTS } from "@/lib/constants";
import { getUserById } from "@/api-calls/users-api-calls";
import { Outlet } from "react-router-dom";
import useUserStore from "@/stores/user-state-store";

export const EditContextSeller = createContext<{ user: TUser }>({ user: DEFAULTS.ADMIN_DATA });

export default function SellerHomepage() {
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
    <SidebarProvider>
      <SellerSidebar id={id} />
      <div className="flex-1 p-4">
        <EditContextSeller.Provider value={{ user }}>
          <Outlet />
        </EditContextSeller.Provider>
      </div>
    </SidebarProvider>
  );
}

