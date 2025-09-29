import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { ProductModal } from "@/features/seller/components/ProductsModal";
import type { TRating } from "@/types/shared";

export type TProduct = {
  _id?: string;
  name: string;
  picture: string;
  price: number;
  quantity: number;
  description: string;
  archived: boolean;
  seller: string;
  sellerName: string;
  ratings: TRating[];
};

export type TNewProduct = Omit<TProduct, "_id">;

function calculateAverageRating(ratings: TRating[]) {
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

export const productsColumns = (
  onDelete: (id: string) => void,
  onSubmit: (product: TProduct) => void,
): ColumnDef<TProduct>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize font-medium">{row.original.name}</div>,
    enableColumnFilter: true,
  },

  {
    accessorKey: "archived",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.original.archived ? (
          <span className="text-muted-foreground text-sm">Archived</span>
        ) : (
          <span className="text-muted-foreground text-sm">Available</span>
        )}
      </div>
    ),
    enableColumnFilter: true,
    filterFn: (row, id, value) => {
      if (value === "archived") return row.original.archived;
      if (value === "available") return !row.original.archived;
      return true;
    },
    meta: {
      className: "hidden sm:table-cell",
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="capitalize font-medium">${row.original.price}</div>,
    enableColumnFilter: true,
    filterFn: (row, id, value: { min: string; max: string }) => {
      const price = parseFloat(row.getValue(id));
      const min = value.min === "" ? -Infinity : parseFloat(value.min);
      const max = value.max === "" ? Infinity : parseFloat(value.max);
      return price >= min && price <= max;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div className="capitalize text-sm">{row.original.quantity}</div>,
    meta: {
      className: "hidden md:table-cell",
    },
  },
  {
    accessorKey: "ratings",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Average Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize text-sm">{calculateAverageRating(row.getValue("ratings")).toFixed(1)}</div>
    ),
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
          <ProductModal
            productData={row.original}
            dialogTrigger={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
            onDelete={(id) => onDelete(id)}
            onSubmit={(product) => onSubmit(product)}
          />
        </div>
      );
    },
  },
];
