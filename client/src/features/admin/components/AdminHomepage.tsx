import { useParams } from "react-router-dom";
import useUserStore from "@/stores/user-state-store";

function AdminHomepage() {
  //const { id } = useParams<{ id: string }>();
  const { id } = useUserStore();
  return (
    <SidebarProvider>
      <AdminSidebar id={id} />
      <div className="flex-1 p-4">
        <EditContextAdmin.Provider value={{ user }}>
          <Outlet />
        </EditContextAdmin.Provider>
      </div>
    </SidebarProvider>
  );
}
