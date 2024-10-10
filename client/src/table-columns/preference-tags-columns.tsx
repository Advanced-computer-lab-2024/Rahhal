import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { deletePreferenceTag } from "../api-calls/preference-tags-api-calls";
import { PreferenceTagsModal } from "@/components/non-tourist/admin/PreferenceTagsModal";
export type TPreferenceTag = {
  _id: string;
  name: string;
};

function deleteRow(row: any) {
  deletePreferenceTag(row.original._id);
}

export const preferenceTagsColumns: ColumnDef<TPreferenceTag>[] = [
  {
    accessorKey: "name",
    header: "Preference Tag Name",
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
          <PreferenceTagsModal
            preferenceTagData={row.original}
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
