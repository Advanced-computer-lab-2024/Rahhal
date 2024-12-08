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
import { Pyramid, Tags } from "lucide-react";

interface TourismGovernerSidebarProps {
  id?: string;
}

export function TourismGovernerSidebar({ id }: TourismGovernerSidebarProps) {
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
                Tourism Governer Menu
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        window.location.pathname === `http//localhost:5173/historical-places`
                      }
                      tooltip="Historical Places"
                    >
                      <a href={`http//localhost:5173/historical-places`}>
                        <Pyramid />
                        Historical Places
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        window.location.pathname === `http//localhost:5173/historical-tags`
                      }
                      tooltip="Historical Tags"
                    >
                      <a href={`http//localhost:5173/historical-tags`}>
                        <Tags />
                        Historical Tags
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
                  <a href={`http//localhost:5173/user-settings/account`}>
                    <DropdownMenuItem>Account</DropdownMenuItem>
                  </a>
                  <a href={`http//localhost:5173/user-settings`}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
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
