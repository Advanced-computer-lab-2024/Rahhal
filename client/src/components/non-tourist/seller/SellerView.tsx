import { useEffect, useState } from "react";
import { DataTable } from "../DataTable";
import DataTableAddButton from "../DataTableAddButton";
import { useParams } from "react-router-dom";
import { ProductModal } from "./ProductsModal";
import { productsColumns, TProduct } from "@/table-columns/seller-columns";
import { fetchUserProducts } from "@/api-calls/products-api-calls";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
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
      <div className=" w-full h-4 flex justify-end">
        <div className="flex justify-end relative z-10 pr-3  h-16 pt-2 items-center">
          <Link to={`/user-settings/${id}`}>
            <Avatar className="h-10 w-10">
              <AvatarFallback>SE</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
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
