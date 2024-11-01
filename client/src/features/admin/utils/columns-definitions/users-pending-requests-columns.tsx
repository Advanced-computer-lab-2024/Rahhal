import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { CheckCheckIcon, ChevronRight } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { UserModal } from "@/features/admin/components/UserModal";
import type { TUser } from "@/types/user";

type UserRequestColumnsActions = {
  onApprove: (row: Row<TUser>) => Promise<void>;
  onDelete: (row: Row<TUser>) => Promise<void>;
};

export function userRequestColumns({
  onApprove,
  onDelete,
}: UserRequestColumnsActions): ColumnDef<TUser>[] {
  return [
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <div className="capitalize">{row.original.username}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.original.email}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-2">
            <Button variant="destructive" className="h-8 w-8 p-0" onClick={() => onDelete(row)}>
              <FaTrash className="h-4 w-4" />
            </Button>
            <Button className="h-8 w-8 p-0" onClick={() => onApprove(row)}>
              <CheckCheckIcon className="h-4 w-4" />
            </Button>
            <UserModal
              userData={row.original}
              dialogTrigger={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];
}
