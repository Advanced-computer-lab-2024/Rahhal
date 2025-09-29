import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuAction,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ChevronDown, Settings } from "lucide-react";
import { SidebarMenuItems } from "@/features/admin/utils/SidebarMenuItems";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import SecondaryLogo from "@/features/logos/SecondaryLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import NotificaionPopover from "@/components/NotificationPopover";
import { logoutUser } from "@/api-calls/users-api-calls";
import { UserState } from "@/stores/user-state-store";
import { Link, useNavigate } from "react-router-dom";
interface AdminSidebarProps {
  id?: string | null;
}

export function AdminSidebar({ id }: AdminSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    await UserState();
    navigate("/signin");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex flex-row-reverse">
          <SidebarTrigger />
        </div>
        <div className="flex justify-center items-center group-data-[collapsible=icon]:hidden">
          <SecondaryLogo />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {SidebarMenuItems.map((group) => (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup
              key={group.section}
              className="group-data-[collapsible=icon]"
            >
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {group.section}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const fullPath = `${item.url}`;

                      return (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton
                            asChild
                            isActive={window.location.pathname === fullPath}
                            tooltip={item.label}
                          >
                            <Link to={fullPath}>
                              <item.icon />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                          <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      {id && (
        <SidebarFooter>
          <SidebarMenu>
            <NotificaionPopover userId={id} isAdmin={true} />
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton asChild tooltip="Account Settings">
                    <a>
                      <Settings />
                      <span>Account Settings</span>
                    </a>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <Link to="/user-settings/account">
                    <DropdownMenuItem>Account</DropdownMenuItem>
                  </Link>
                  <Link to="/user-settings">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <Link to="#" onClick={handleLogout}>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
