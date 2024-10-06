import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/user-settings/SideBar";
import { Outlet } from "react-router-dom";
// import { Button } from "../ui/button";
export default function SettingsView() {
  return (
    <div className="m-8">
      <div className="space-y-0.5">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          {/* <Button >
            <span>Edit Profile</span>
          </Button> */}
        </div>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 lg:md:grid-cols-12 gap-6">
        <div className="lg:md:col-span-2">
          <SideBar></SideBar>
        </div>
        <div className="lg:md:col-span-10" style={{ maxWidth: "70%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
