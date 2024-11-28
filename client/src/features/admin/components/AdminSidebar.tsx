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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SecondaryLogo from "@/features/logos/SecondaryLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ProfileForm from "@/features/user-settings/components/ProfileForm";
import AccountForm from "@/features/user-settings/components/AccountForm";
interface AdminSidebarProps {
  setActiveComponent: (component: React.ReactNode) => void;
  activeComponent: React.ReactNode;
  id?: string;
}


export function AdminSidebar({ setActiveComponent, activeComponent, id }: AdminSidebarProps) {
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
            <SidebarGroup key={group.section} className="group-data-[collapsible=icon]">
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {group.section}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                          asChild
                          onClick={() => setActiveComponent(item.component)}
                          isActive={activeComponent === item.component}
                          tooltip={item.label}
                        >
                          <a>
                            <item.icon />
                            <span>{item.label}</span>
                          </a>
                        </SidebarMenuButton>
                        <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                      </SidebarMenuItem>
                    ))}
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
                  <DropdownMenuItem onClick={() => setActiveComponent(<AccountForm />)}>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveComponent(<ProfileForm />)}>
                    <span>Profile</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
