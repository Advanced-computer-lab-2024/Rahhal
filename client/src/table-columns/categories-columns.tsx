import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { deleteCategory } from "@/api-calls/categories-api-calls";
import { CategoryModal } from "@/components/non-tourist/admin/CategoryModal";

export type TCategory = {
  _id: string;
  name: string;
};

function deleteRow(row: any) {
  deleteCategory(row.original._id);
}

export const categoriesColumns: ColumnDef<TCategory>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Button variant="destructive" className="h-8 w-8 p-0" onClick={() => deleteRow(row)}>
            <span className="sr-only">Delete</span>
            <FaTrash className="w-4 h-4" />
          </Button>
          <CategoryModal
            categoryData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Edit</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
