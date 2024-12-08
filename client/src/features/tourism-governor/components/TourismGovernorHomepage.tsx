import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TourismGovernerSidebar } from "./TourismGovernorSidebar";
import { createContext, useEffect, useState } from "react";
import { TUser } from "@/types/user";
import { DEFAULTS } from "@/lib/constants";
import { getUserById } from "@/api-calls/users-api-calls";
import { Outlet } from "react-router-dom";

export const EditContextTourGov = createContext<{ user: TUser }>({ user: DEFAULTS.ADMIN_DATA });

export default function AdminHomepage() {
  const { id } = useParams<{ id: string }>();
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
