import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { ProductModal } from "@/features/seller/components/ProductsModal";
import { productsColumns, TProduct } from "@/features/seller/utils/seller-columns";
import { fetchProducts } from "@/api-calls/products-api-calls";
import { SUPER_ADMIN_ID } from "@/lib/constants";

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
            userId={SUPER_ADMIN_ID}
            productData={undefined}
            dialogTrigger={<DataTableAddButton />}
          />
        }
      />
    </>
  );
}

export default AdminProductsView;
