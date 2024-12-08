import { describe, it, expect } from "vitest";

// get all orders
describe("GET /orders", () => {
  it("should return all orders", async () => {
    const response = await fetch("http://localhost:3000/orders");

    const orders = await response.json();

    expect(Array.isArray(orders)).toBe(true);
  });
});

// create order
describe("POST /orders", () => {
  it("should create an order", async () => {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sellerName: "Test Seller",
        productName: "Test Product",
        totalQuantity: 1,
        totalPrice: 100,
        status: "pending",
        userId: "test-buyer",
        paymentMethod: "cash",
        shippingAddress: "123 Test St",

      }),
    });

    const order = await response.json();
    

    expect(order.userId).toBe("test-buyer");
  });
});
