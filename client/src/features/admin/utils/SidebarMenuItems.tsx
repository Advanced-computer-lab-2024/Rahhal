import { Home, Inbox, UserRoundCheck, UserRoundPlus, TentTree, Laugh, Tags, ShoppingCart, Ticket } from "lucide-react";

export const SidebarMenuItems = [
  {
    section: "Dashboard",
    items: [
      {
        icon: Home,
        label: "Home",
        url: "/home",
      },
    ],
  },
  {
    section: "Users",
    items: [
      {
        icon: UserRoundCheck,
        label: "Active Users",
        url: "/users",
      },
      {
        icon: UserRoundPlus,
        label: "Pending Requests",
        url: "/users/requests",
      },
      {
        icon: Inbox,
        label: "User Complaints",
        url: "/complaints",
      },
    ],
  },
  {
    section: "Entertainment",
    items: [
      {
        icon: Laugh,
        label: "Activities",
        url: "/activities",
      },
      {
        icon: TentTree,
        label: "Itineraries",
        url: "/itineraries",
      },
      {
        icon: Tags,
        label: "Preference Tags",
        url: "/preference-tags",
      },
      {
        icon: Tags,
        label: "Categories",
        url: "/categories",
      },
    ],
  },
  {
    section: "Shop",
    items: [
      {
        icon: ShoppingCart,
        label: "Products",
        url: "/products",
      },
      {
        icon: Ticket,
        label: "Promocodes",
        url: "/promocodes",
      }

    ],
  },
];
