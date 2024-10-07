import { Separator } from "@/components/ui/separator";
import SideBar from "@/components/user-settings/SideBar";
import { Outlet, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { Toaster } from "../ui/toaster";
enum Role {
  admin = "admin",
  tourist = "tourist",
  tourGuide = "tourGuide",
  advertiser = "advertiser",
  seller = "seller",
  tourismGovernor = "tourismGovernor",
}
interface User {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  approved: boolean;
  dob?: Date;
  nationality?: string;
  job?: string;
  addresses?: string[];
  phoneNumber?: string;
  yearsOfExperience?: number;
  previousWork?: string;
  website?: string;
  hotline?: string;
  companyProfile?: string;
  companyName?: string;
  description?: string;
}
export const EditContext = createContext<{
  editForm: boolean;
  user: User;
}>({
  editForm: false,
  user: {
    username: "",
    email: "",
    password: "",
    role: Role.tourist,
    approved: false,
  },
});
export default function SettingsView() {
  const { id } = useParams();
  const [editForm, setEditForm] = useState(false);
  const USER_SERVICE_URL = `http://localhost:3000/api/user/users/${id}`;
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
    role: Role.tourist,
    approved: false,
  });
  useEffect(() => {
    axios
      .get(USER_SERVICE_URL)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="m-8">
      <div className="space-y-0.5">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <Button
            onClick={() => {
              setEditForm(true), console.log(user);
            }}
          >
            <span>Edit Profile</span>
          </Button>
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
          <Toaster />
          <EditContext.Provider value={{ editForm, user }}>
            <Outlet />
          </EditContext.Provider>
        </div>
      </div>
    </div>
  );
}
