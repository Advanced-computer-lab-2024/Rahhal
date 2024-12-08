import { describe, it, expect } from "vitest";

// get all bookings
describe("GET /bookings", () => {
  it("should return all bookings", async () => {
    const response = await fetch("http://localhost:3000/bookings");

    const bookings = await response.json();

    expect(Array.isArray(bookings)).toBe(true);
  });
});

// create booking
describe("POST /bookings", () => {
  it("should create a booking", async () => {
    const response = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "activity",
        entity: "test-activity",
        user: "test-user",

        
      }),
    });

    const booking = await response.json();
    
    

    expect(booking.user).toBe("test-user");
  });
}
);





