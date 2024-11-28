"use client";

import { useState } from "react";
import { Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageCarousel } from "./ImageCarroussel";
import { OrderDetails } from "./OrderDetails";
import { useQuery } from "@tanstack/react-query";
import { fetchUserOrders } from "@/api-calls/order-api-calls";
import { useParams } from "react-router-dom";
import { getUserById } from "@/api-calls/users-api-calls";
import { TOrder } from "@/features/home/types/home-page-types";
import { OrderStatus } from "@/utils/enums";
import EmptyStatePlaceholder from "../EmptyStatePlaceholder";
import OrdersPageStyles from "@/features/home/styles/MyOrdersPage.module.css"
import cart from "@/assets/cart.png";

export const formatOrderDate = (dateString: string | undefined) => {
  if (!dateString) return "Invalid Date";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export default function OrdersPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedOrderId, setSelectedOrderId] = useState<TOrder | null>(null);

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<TOrder[]>({
    queryKey: ["userOrders", id],
    queryFn: () => fetchUserOrders(id as string),
    enabled: !!id,
  });

  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id as string),
    enabled: !!id,
  });

  const handleViewDetails = (orderId: TOrder) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseDetails = () => {
    setSelectedOrderId(null);
  };

  return (
    <>
    
      {order?.length === 0 ? (
        !isLoading &&
        !isError && (
          <div className={OrdersPageStyles["no-orders"]}>
            <EmptyStatePlaceholder
              img={cart}
              img_alt="No orders"
              textOne="No Purchases Yet!"
              textTwo="Once you Buy a product - it will appear here. Ready to get started?"
              buttonText="Start Shopping"
              navigateTo={`/shop/${id}`}
            />
          </div>
        )
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {order?.map((order) => (
              <Card key={order._id}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Order#{order._id?.slice(0, 6)}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {order.createdAt
                        ? formatOrderDate(order.createdAt.toString())
                        : "Invalid Date"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageCarousel images={order.items.map((item) => item.picture)} />
                  <div className="flex justify-between items-center my-4">
                    <div className="flex items-center">
                      <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span
                        className={
                          order.orderStatus === OrderStatus.cancelled
                            ? "text-red-500 "
                            : order.orderStatus === OrderStatus.delivered
                            ? "text-green-500 "
                            : "text-black"
                        }
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => handleViewDetails(order)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedOrderId !== null && (
            <OrderDetails order={selectedOrderId} onClose={handleCloseDetails} />
          )}
        </div>
      )}
    </>
  );
}