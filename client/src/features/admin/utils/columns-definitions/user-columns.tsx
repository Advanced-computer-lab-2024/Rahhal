import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { UserModal } from "@/features/admin/components/UserModal";
import type { TUser } from "@/types/user";

export const userColumns = (
  onDelete: (id: string) => void,
  onSubmit: (user: TUser) => void
): ColumnDef<TUser>[] => [
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.original.username}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="capitalize text-sm">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">{row.original.email}</div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <UserModal
            userData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
            onDelete={(id) => onDelete(id)}
            onSubmit={(user) => onSubmit(user)}
          />
        </div>
      );
    },
  },
];
