import { Separator } from "@/components/ui/separator";
import SideBar from "@/features/user-settings/components/SideBar";
import { Link, Outlet, useParams } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { SERVICES_URLS } from "@/lib/constants";
import { TUser } from "@/types/user";
import { HomeIcon } from "lucide-react";
import useUserStore from "@/stores/user-state-store";
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
  const { id } = useUserStore();

  const USER_SERVICE_URL = SERVICES_URLS.USER + "/users/" + `${id}`;
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
      .then((response : any) => {
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
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          </div>
          <Link
            className="text-gray-600 hover:text-gray-900 flex items-center"
            to={`/entertainment/${id}`}
          >
            <HomeIcon className="h-6 w-6 mr-2" />
            <span className="ml-2 text-lg hover:underline">Home</span>
          </Link>
        </div>        <p className="text-muted-foreground">Manage your rahhal settings.</p>
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
