import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
import { createContext, useEffect, useState } from "react";
import { TUser } from "@/types/user";
import { DEFAULTS } from "@/lib/constants";
import { getUserById } from "@/api-calls/users-api-calls";
import { Outlet } from "react-router-dom";
import useUserStore from "@/stores/user-state-store";

export const EditContextAdmin = createContext<{ user: TUser }>({ user: DEFAULTS.ADMIN_DATA });

export default function AdminHomepage() {
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
      <AdminSidebar id={id} />
      <main className="flex-1 p-4 md:p-6 lg:p-8 min-h-screen">
        {/* Mobile Header with Burger Menu */}
        <div className="md:hidden mb-6 flex items-center justify-between border-b pb-4">
          <SidebarTrigger className="md:hidden" />
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>
        
        <EditContextAdmin.Provider value={{ user }}>
          <Outlet />
        </EditContextAdmin.Provider>
      </main>
    </SidebarProvider>
  );
}
