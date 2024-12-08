import { describe, it, expect } from "vitest";

// get all users
describe("GET /users", () => {
  it("should return all users", async () => {
    const response = await fetch("http://localhost:3000/users");

    const users = await response.json();

    expect(Array.isArray(users)).toBe(true);
  });
});

// create user
describe("POST /users", () => {
  it("should create a user", async () => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: "Test",
        lastName: "User",
        email: "email@email.com",
        password: "password",
        points: 100,
        role: "tourist",
        dob: "1990-01-01",
        phoneNumber: "1234567890",
        username: "test-user",
        nationality: "Egyptian",
        level: 1,
        job: "Developer",
        accumulativePoints: 100,

      }),
    });

    const user = await response.json();
    

    expect(user.firstName).toBe("Test");

  });
});
