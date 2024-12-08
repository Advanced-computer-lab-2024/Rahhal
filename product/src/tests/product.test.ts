import { describe, it, expect } from "vitest";

// get all products
describe("GET /products", () => {
  it("should return all products", async () => {
    const response = await fetch("http://localhost:3000/products");
    
    const products = await response.json();
    
    expect(Array.isArray(products)).toBe(true);
  });
});

// get available products
describe("GET /products/available", () => {
  it("should return available products", async () => {
    const response = await fetch("http://localhost:3000/products/available");
    
    const products = await response.json();
    
    expect(Array.isArray(products)).toBe(true);
  });
});


// create product
describe("POST /products", () => {
  it("should create a product", async () => {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test Product",
        price: 100,
        quantity: 10,
        sellerName: "Test Seller",
        picture: "https://example.com/test.jpg",
        description: "This is a test product",
        seller: "test-seller",
      }),
    });
    
    const product = await response.json();
    
    expect(product.name).toBe("Test Product");
  });
});


