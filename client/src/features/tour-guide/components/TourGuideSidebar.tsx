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
import { TentTree, ClipboardMinus, Star } from "lucide-react";

interface TourGuideSidebarProps {
  id?: string;
}

export function TourGuideSidebar({ id }: TourGuideSidebarProps) {
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
                  Tour Guide Menu
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={window.location.pathname === `/tour-guide/${id}`}
                        tooltip="Itineraries"
                      >
                        <a href={`/tour-guide/${id}`}>
                          <TentTree />
                          Itineraries
                        </a>
                      </SidebarMenuButton>
                      <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={window.location.pathname === `/tour-guide/${id}/report`}
                        tooltip="Reports"
                      >
                        <a href={`/tour-guide/${id}/report`}>
                          <ClipboardMinus />
                          Reports
                        </a>
                      </SidebarMenuButton>
                      <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={window.location.pathname === `/tour-guide/${id}/reviews`}
                        tooltip="Customer Reviews"
                      >
                        <a href={`/tour-guide/${id}/reviews`}>
                          <Star />
                          Customer Reviews
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
                    <a href={`/tour-guide/${id}/user-settings/account`}>
                      <DropdownMenuItem>Account</DropdownMenuItem>
                    </a>
                    <a href={`/tour-guide/${id}/user-settings`}>
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