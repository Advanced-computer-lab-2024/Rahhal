import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/features/admin/components/AdminSidebar";
function AdminHomepage() {
  const { id } = useParams<{ id: string }>();
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<h1>Home</h1>);
  return (
    <SidebarProvider>
      <AdminSidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} id={id} />
      {activeComponent}
    </SidebarProvider>
  );
}

export default AdminHomepage;
