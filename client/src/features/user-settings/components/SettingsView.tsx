import { Separator } from "@/components/ui/separator";
import SideBar from "@/features/user-settings/components/SideBar";
import { Outlet, useParams } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { CONNECTION_STRING } from "@/utils/constants";
import { TUser } from "@/types/user";
export enum Role {
  admin = "admin",
  tourist = "tourist",
  tourGuide = "tourGuide",
  advertiser = "advertiser",
  seller = "seller",
  tourismGovernor = "tourismGovernor",
}

export const EditContext = createContext<{
  user: TUser;
}>({
  user: {
    _id: "",
    username: "",
    email: "",
    password: "",
    role: undefined,
    approved: false,
  },
});
export default function SettingsView() {
  const { toast } = useToast();
  const { id } = useParams();

  const USER_SERVICE_URL = CONNECTION_STRING + `${id}`;
  const [user, setUser] = useState<TUser>({
    _id: "",
    username: "",
    email: "",
    password: "",
    role: undefined,
    approved: false,
  });
  useEffect(() => {
    axios
      .get(USER_SERVICE_URL)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        toast({
          title: "Error: " + error,
          variant: "destructive",
        });
        console.error(error);
      });
  }, []);
  return (
    <div className="m-8">
      <div className="space-y-0.5">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        </div>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 lg:md:grid-cols-12 gap-6">
        <div className="lg:md:col-span-2">
          <EditContext.Provider value={{ user }}>
            <SideBar></SideBar>
          </EditContext.Provider>
        </div>
        <div className="lg:md:col-span-10" style={{ maxWidth: "100%" }}>
          <Toaster />
          <EditContext.Provider value={{ user }}>
            <Outlet />
          </EditContext.Provider>
        </div>
      </div>
    </div>
  );
}
