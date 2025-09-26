import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import { TPromocode } from "@/types/shared";
import { PromocodeModal } from "@/features/admin/components/PromocodeModal";

export const promoCodeColumns = (
  onDelete: (id: string) => void,
  onSubmit: (promocode: TPromocode) => void,
): ColumnDef<TPromocode>[] => [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="capitalize font-medium">{row.original.code}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize text-sm">{row.original.type}</div>,
    meta: {
      className: "hidden sm:table-cell",
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (
      <div className="capitalize text-sm">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          row.original.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => {
      const rawDate = row.original.expiresAt;
      let formattedDate;

      try {
        const date = new Date(rawDate);
        formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } catch (error) {
        formattedDate = "Invalid Date";
      }

      return <div className="capitalize text-sm text-muted-foreground">{formattedDate}</div>;
    },
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => <div className="capitalize font-medium">{row.original.value}</div>,
    meta: {
      className: "hidden lg:table-cell",
    },
  },
  {
    accessorKey: "uses",
    header: "Uses",
    cell: ({ row }) => <div className="capitalize text-sm">{row.original.uses}</div>,
    meta: {
      className: "hidden lg:table-cell",
    },
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
            onDelete={(id) => onDelete(id)}
            onSubmit={(promocode) => onSubmit(promocode)}
          />
        </div>
      );
    },
  },
];
