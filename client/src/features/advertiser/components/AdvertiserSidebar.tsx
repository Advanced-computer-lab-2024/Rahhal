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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SecondaryLogo from "@/features/logos/SecondaryLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import NotificaionPopover from "@/components/NotificationPopover";
import { Laugh, ClipboardMinus } from "lucide-react";
import { logoutUser } from "@/api-calls/users-api-calls";
import { UserState } from "@/stores/user-state-store";

interface AdvertiserSidebarProps {
  id?: string;
}

export function AdvertiserSidebar({ id }: AdvertiserSidebarProps) {
  const handleLogout = async () => {
    await logoutUser();
    UserState();
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
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup className="group-data-[collapsible=icon]">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Advertiser Menu
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={window.location.pathname === `/home`}
                      tooltip="Activities"
                    >
                      <a href={`http://localhost:5173/home`}>
                        <Laugh />
                        Activities
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={window.location.pathname === `/report`}
                      tooltip="Reports"
                    >
                      <a href={`http://localhost:5173/report`}>
                        <ClipboardMinus />
                        Reports
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
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
                <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                  <a href={`http://localhost:5173/user-settings/account`}>
                    <DropdownMenuItem>Account</DropdownMenuItem>
                  </a>
                  <a href={`http://localhost:5173/user-settings`}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </a>
                  <a href={`http://localhost:5173/signin`}>
                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                  </a>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
