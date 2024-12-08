import { SidebarProvider } from "@/components/ui/sidebar";
import { TourismGovernerSidebar } from "./TourismGovernorSidebar";
import { createContext, useEffect, useState } from "react";
import { TUser } from "@/types/user";
import { DEFAULTS } from "@/lib/constants";
import { getUserById } from "@/api-calls/users-api-calls";
import { Outlet } from "react-router-dom";
import useUserStore from "@/stores/user-state-store";

export const EditContextTourGov = createContext<{ user: TUser }>({ user: DEFAULTS.ADMIN_DATA });

export default function TourismGovernorHomepage() {
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
      <TourismGovernerSidebar id={id} />
      <div className="flex-1 p-4">
        <EditContextTourGov.Provider value={{ user }}>
          <Outlet />
        </EditContextTourGov.Provider>
      </div>
    </SidebarProvider>
  );
}
