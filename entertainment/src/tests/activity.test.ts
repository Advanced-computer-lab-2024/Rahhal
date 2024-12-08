import { describe, it, expect } from "vitest";

// get all activities

describe("GET /activities", () => {
  it("should return all activities", async () => {
    const response = await fetch("http://localhost:3000/activities");

    const activities = await response.json();

    expect(Array.isArray(activities)).toBe(true);
  });
});

// create activity
describe("POST /activities", () => {
  it("should create an activity", async () => {
    const response = await fetch("http://localhost:3000/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test Activity",
        price: {"adult": 100, "child": 50},
        location: {"latitude": 30.0444, "longitude": 31.2357},
        picture: "https://example.com/test.jpg",
        description: "This is a test activity",
        ownerName: "Test seller",
        date: "2022-01-01",
        time: new Date("2022-01-01T12:00:00Z"),
        isBookingOpen: true,
        owner: "test-seller",
        
      }),
    });

    const activity = await response.json();

    

    expect(activity.name).toBe("Test Activity");
  });
});
