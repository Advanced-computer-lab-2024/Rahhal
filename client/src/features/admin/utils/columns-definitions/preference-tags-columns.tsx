import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { PreferenceTagsModal } from "@/features/admin/components/PreferenceTagsModal";
export type TPreferenceTag = {
  _id: string;
  name: string;
};


export const preferenceTagsColumns= (
  onDelete: (id: string) => void,
  onSubmit: (preferenceTag: TPreferenceTag) => void,
): ColumnDef<TPreferenceTag>[] => [
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
          <PreferenceTagsModal
            preferenceTagData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Edit</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            }
            onDelete={(id) => onDelete(id)}
            onSubmit={(preferenceTag) => onSubmit(preferenceTag)}
          />
        </div>
      );
    },
  },
];
