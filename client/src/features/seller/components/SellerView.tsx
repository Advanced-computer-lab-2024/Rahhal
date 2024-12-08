import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { useParams } from "react-router-dom";
import { ProductModal } from "./ProductsModal";
import { productsColumns, TProduct } from "@/features/seller/utils/seller-columns";
import { fetchUserProducts } from "@/api-calls/products-api-calls";
import { getUserById } from "@/api-calls/users-api-calls";
import { useQuery } from "@tanstack/react-query";
function SellerView() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [username, setUsername] = useState<string>("");
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
              username={username}
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
