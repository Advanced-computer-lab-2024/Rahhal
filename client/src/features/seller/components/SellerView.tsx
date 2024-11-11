import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import DataTableAddButton from "@/components/data-table/DataTableAddButton";
import { useParams } from "react-router-dom";
import { ProductModal } from "./ProductsModal";
import { productsColumns, TProduct } from "@/features/seller/utils/seller-columns";
import { fetchUserProducts } from "@/api-calls/products-api-calls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
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

  const avatarLetters = useMemo(() => {
    return userData?.firstName && userData?.lastName
      ? `${userData.firstName[0]}${userData.lastName[0]}`
      : "US";
  }, [userData]);

  return (
    <>
      <div className="flex justify-end sticky top-0 z-10">
        <Link to={`/user-settings/${id}`}>
          <Avatar className="h-10 w-10 mx-4 mt-4">
            <AvatarImage src={userData?.profilePicture}></AvatarImage>
            <AvatarFallback>{avatarLetters}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
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
