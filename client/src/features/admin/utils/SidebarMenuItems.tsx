import { Home, Inbox, UserRoundCheck, UserRoundPlus, TentTree, Laugh, Tags, ShoppingCart } from "lucide-react";
import UserView from "@/features/admin/components/UserTable";
import CategoryView from "@/features/admin/components/CategoriesTable";
import PreferenceTagsAdminView from "@/features/admin/components/PreferenceTagsTable";
import AdminComplaintsView from "@/features/admin/components/ComplaintsTable";
import AdminProductsView from "@/features/admin/components/AdminProductsView";
import UsersPendingRequests from "@/features/admin/components/UsersPendingRequests";
import AdminItinerariesView from "@/features/admin/components/AdminItinerariesView";
import AdminActivitiesView from "@/features/admin/components/AdminActivitiesView";

export const SidebarMenuItems = [
  {
    section: "Dashboard",
    items: [
      {
        icon: Home,
        label: "Home",
        url: "#",
        component: <h1>Home</h1>,
      },
    ],
  },
  {
    section: "Users",
    items: [
      {
        icon: UserRoundCheck,
        label: "Active Users",
        url: "#",
        component: <UserView />,
      },
      {
        icon: UserRoundPlus,
        label: "Pending Requests",
        url: "#",
        component: <UsersPendingRequests />,
      },
      {
        icon: Inbox,
        label: "User Complaints",
        url: "#",
        component: <AdminComplaintsView />,
      },
    ],
  },
  {
    section: "Entertainment",
    items: [
      {
        icon: Laugh,
        label: "Activities",
        url: "#",
        component: <AdminActivitiesView />,
      },
      {
        icon: TentTree,
        label: "Itineraries",
        url: "#",
        component: <AdminItinerariesView />,
      },
      {
        icon: Tags,
        label: "Preference Tags",
        url: "#",
        component: <PreferenceTagsAdminView />,
      },
      {
        icon: Tags,
        label: "Categories",
        url: "#",
        component: <CategoryView />,
      },
    ],
  },
  {
    section: "Shop",
    items: [
      {
        icon: ShoppingCart,
        label: "Products",
        url: "#",
        component: <AdminProductsView />,
      },
    ],
  },
];
