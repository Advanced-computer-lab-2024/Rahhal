import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import DataTableAddButton from "../DataTableAddButton";
import { useParams } from "react-router-dom";
import { ProductModal } from "./ProductsModal";
import { productsColumns, TProduct } from "@/table-columns/seller-columns";
import { fetchUserProducts } from "@/api-calls/products-api-calls";

function SellerView() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const init = async () => {
      if (id) {
        const data = await fetchUserProducts(id);
        setProducts(data);
      }
    };
    init();
  }, []);

  return (
    <>
      {id ? (
        <DataTable
          data={products}
          columns={productsColumns}
          enableFilters={true}
          newRowModal={
            <ProductModal
              userId={id}
              productData={undefined}
              dialogTrigger={<DataTableAddButton />}
            />
          }
        />
      ) : (
        <p>Resource not found</p>
      )}
    </>
  );
}

export default SellerView;
