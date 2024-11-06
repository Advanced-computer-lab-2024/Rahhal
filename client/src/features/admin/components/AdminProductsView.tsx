import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ProductModal } from "@/features/seller/components/ProductsModal";
import { productsColumns, TProduct } from "@/features/seller/utils/seller-columns";
import { fetchProducts } from "@/api-calls/products-api-calls";

function AdminProductsView() {
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    init();
  }, []);

  return (
    <>
      <DataTable
        data={products}
        columns={productsColumns}
        enableFilters={true}
        newRowModal={
          <ProductModal
            username={"Rahhal"}
            productData={undefined}
            dialogTrigger={<DataTableAddButton />}
          />
        }
      />
    </>
  );
}

export default AdminProductsView;
