import { OrderSummary } from "./OrderSummary";
import { CartExample } from "../utils/CartExample";
import { Input } from "@/components/ui/input"
import { DeliveryForm } from "./DeliveryForm";
import { getUserById } from "@/api-calls/users-api-calls";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function useIdFromParamsOrQuery() {
  const { id: paramId } = useParams<{ id?: string }>();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const queryId = queryParams.get("userId");

  return paramId || queryId;
}



export default function Checkout() {
  const id = useIdFromParamsOrQuery();

  const {
    data: user,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });



  return (
    <>
      <hr />
      <div className="min-h-screen flex">
        <div className="w-1/2 bg-white">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-5xl font-semibold">Checkout</h1>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Contact</h2>
                </div>
                <div className="mt-4 space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    defaultValue={user?.email || ""}
                    disabled
                  />
                </div>
              </div>
              {user && <DeliveryForm user={user} />}
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-gray-50">
          <div className="p-8 ">
            <OrderSummary {...CartExample} />
          </div>
        </div>
      </div>
    </>
  )
}



