import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ProductModal } from "@/features/seller/components/ProductsModal";
import { productsColumns, TProduct } from "@/features/seller/utils/seller-columns";
import { fetchProducts, deleteProduct } from "@/api-calls/products-api-calls";
import { SUPER_ADMIN_ID } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import { STATUS_CODES } from "@/lib/constants";
import { cn } from "@/lib/utils";

function AdminProductsView() {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    init();
  }, []);

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
        description: (error as any).response?.data?.message || "Error deleting product",
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

  return (
    <div className="container m-auto">
      <h1
        className={cn(
          "text-3xl font-bold tracking-tight",
          "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent",
        )}
      >
        Products
      </h1>
      <DataTable
        data={products}
        columns={productsColumns(handleProductDelete, handleProductUpdate)}
        enableFilters={true}
        newRowModal={
          <ProductModal
            userId={SUPER_ADMIN_ID}
            username={"Rahhal"}
            productData={undefined}
            dialogTrigger={<DataTableAddButton className="bg-[#1d3c51]" />}
            onSubmit={(newProduct) => {
              setProducts((prev) => [...prev, newProduct]);
            }}
            onDelete={handleProductDelete}
          />
        }
      />
    </div>
  );
}

export default AdminProductsView;
