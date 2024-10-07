import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import DataTableAddButton from "../DataTableAddButton";
import { ProductModal } from "@/components/non-tourist/seller/ProductsModal";
import { productsColumns, TProduct } from "@/table-columns/seller-columns";
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
