import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ProductModal } from "./ProductsModal";
import {
  productsColumns,
  TProduct,
} from "@/features/seller/utils/seller-columns";
import {
  fetchUserProducts,
  deleteProduct,
} from "@/api-calls/products-api-calls";
import { getUserById } from "@/api-calls/users-api-calls";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import useUserStore from "@/stores/user-state-store";
function SellerView() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>("");
  const { id } = useUserStore();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (id) {
        const data = await fetchUserProducts(id);
        setProducts(data);
      }
      setLoading(false);
    };
    init();
  }, []);

  const { data: userData } = useQuery({
    queryKey: ["fetchUser"],
    queryFn: () => getUserById(id ? id : ""),
    enabled: !!id,
  });

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
    }
  }, [userData]);

  const handleProductDelete = async (id: string) => {
    try {
      const response = await deleteProduct(id);
      if (response.status === STATUS_CODES.STATUS_OK) {
        toast({
          title: "Success",
          description: "Product deleted successfully",
          style: {
            backgroundColor: "#34D399",
            color: "white",
          },
        });

        const newProducts = products.filter((product) => product._id !== id);
        setProducts(newProducts);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          (error as any).response?.data?.message || "Error deleting product",
        variant: "destructive",
      });
    }
  };

  const handleProductUpdate = (product: TProduct) => {
    const newProducts = products.map((oldProduct) => {
      if (oldProduct._id === product._id) {
        return product;
      }
      return oldProduct;
    });
    setProducts(newProducts);
  };

  if (loading) return <div className="w-full text-center py-8">Loading...</div>;
  return (
    <div className="container m-auto">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
        )}
      >
        Products
      </h1>
      {id ? (
        <DataTable
          data={products}
          columns={productsColumns(handleProductDelete, handleProductUpdate)}
          enableFilters={true}
          newRowModal={
            <ProductModal
              userId={id}
              username={username}
              productData={undefined}
              dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
              onSubmit={(newProduct) => {
                setProducts((prev) => [...prev, newProduct]);
              }}
              onDelete={handleProductDelete}
            />
          }
        />
      ) : (
        <p>Resource not found</p>
      )}
    </div>
  );
}

export default SellerView;
