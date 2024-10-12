import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { FaTrash } from "react-icons/fa6";
import { ProductModal } from "@/features/seller/components/ProductsModal";
import { deleteProduct } from "@/api-calls/products-api-calls";

export type TRating = {
  userId: string;
  rating: number;
  review?: string;
};

export type TProduct = {
  _id?: string;
  name: string;
  picture: string;
  price: number;
  quantity: number;
  description: string;
  seller: string;
  ratings: TRating[];
};

// Derive TNewActivity from TActivity
export type TNewProduct = Omit<TProduct, "_id">;

function deleteRow(row: any) {
  deleteProduct(row.original);
}

function calculateAverageRating(ratings: TRating[]) {
  const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return totalRating / ratings.length;
}

export const productsColumns: ColumnDef<TProduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
    enableColumnFilter: true,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="capitalize">{row.original.price}</div>,
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
    cell: ({ row }) => <div className="capitalize">{row.original.quantity}</div>,
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
      <div className="capitalize">{calculateAverageRating(row.getValue("ratings"))}</div>
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
          <ProductModal
            productData={row.original}
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
