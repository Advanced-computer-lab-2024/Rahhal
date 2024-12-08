import { describe, it, expect } from "vitest";


// get all users
describe("GET /users", () => {
  it("should return all users", async () => {
    const response = await fetch("http://localhost:3000/api/user/users");

    const users = await response.json();

    expect(Array.isArray(users)).toBe(true);
  });
});


// get all products
describe("GET /products", () => {
  it("should return all products", async () => {
    const response = await fetch("http://localhost:3000/api/product/products");
    
    const products = await response.json();
    
    expect(Array.isArray(products)).toBe(true);
  });
});


// get available products
describe("GET /products/available", () => {
  it("should return available products", async () => {
    const response = await fetch("http://localhost:3000/api/product/products/available");
    
    const products = await response.json();
    
    expect(Array.isArray(products)).toBe(true);
  });
});

// get all orders
describe("GET /orders", () => {
  it("should return all orders", async () => {
    const response = await fetch("http://localhost:3000/api/order/orders");

    const orders = await response.json();

    expect(Array.isArray(orders)).toBe(true);
  });
});

// get all bookings
describe("GET /bookings", () => {
  it("should return all bookings", async () => {
    const response = await fetch("http://localhost:3000/api/booking/bookings");

    const bookings = await response.json();

    expect(Array.isArray(bookings)).toBe(true);
  });
});

// get all activities
describe("GET /activities", () => {
  it("should return all activities", async () => {
    const response = await fetch("http://localhost:3000/api/entertainment/activities");

    const activities = await response.json();

    expect(Array.isArray(activities)).toBe(true);
  });
});




