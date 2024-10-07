import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaTrash } from "react-icons/fa6";
import { UserModal } from "@/components/non-tourist/admin/UserModal";
import { deleteUser } from "@/api-calls/users-api-calls";


export enum Role {
    admin = "admin",
    tourist = "tourist",
    tourGuide = "tourGuide",
    advertiser = "advertiser",
    seller = "seller",
    tourismGovernor = "tourismGovernor",
  }

export type TUser = {

  _id?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  approved: boolean;
  dob?: Date;
  nationality?: string;
  job?: string;
  addresses?: string[];
  phoneNumber?: string;
  yearsOfExperience?: number;
  previousWork?: string;
  website?: string;
  hotline?: string;
  companyProfile?: string;
  companyName?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
};

function deleteRow(row: any) {
  deleteUser(row.original);
  window.location.reload();
}



export const userColumns: ColumnDef<TUser>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
    cell: ({ row }) => <div>{row.getValue("dob")}</div>,
  },
  {
    accessorKey: "approved",
    header: "Approved",
    cell: ({ row }) => (
      <Badge variant={row.getValue("approved") ? "success" : "danger"}>
        {row.getValue("approved") ? "Approved" : "Not Approved"}
      </Badge>
    ),
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
