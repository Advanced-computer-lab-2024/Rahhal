import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { TPromocode } from "@/types/shared";
import { PromocodeModal } from "@/features/admin/components/PromocodeModal";

export const promoCodeColumns: ColumnDef<TPromocode>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="capitalize">{row.original.code}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.original.type}</div>,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => <div className="capitalize">{row.original.isActive ? "Active" : "Inactive"}</div>,
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => {
      const rawDate = row.original.expiresAt;
      let formattedDate;
      
      try {
        const date = new Date(rawDate);
        formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      } catch (error) {
        formattedDate = 'Invalid Date';
      }

      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => <div className="capitalize">{row.original.value}</div>,
  },
  {
    accessorKey: "uses",
    header: "Uses",
    cell: ({ row }) => <div className="capitalize">{row.original.uses}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <PromocodeModal
            promocodeData={row.original}
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
