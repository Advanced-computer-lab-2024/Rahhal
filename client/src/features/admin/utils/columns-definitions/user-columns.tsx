import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { UserModal } from "@/features/admin/components/UserModal";
import { deleteUser } from "@/api-calls/users-api-calls";
import type { TUser } from "@/types/user";

function deleteRow(row: any) {
  deleteUser(row.original);
}

export const userColumns: ColumnDef<TUser>[] = [
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
        <div className="text-right">
          <Button variant="destructive" className="h-8 w-8 p-0" onClick={() => deleteRow(row)}>
            <span className="sr-only">Delete</span>
            <FaTrash className="h-4 w-4" />
          </Button>
          <UserModal
            userData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
