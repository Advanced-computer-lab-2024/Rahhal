import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { CategoryModal } from "../../components/CategoryModal";

export type TCategory = {
  _id: string;
  name: string;
};


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
