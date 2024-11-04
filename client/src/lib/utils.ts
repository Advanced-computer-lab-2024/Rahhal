import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// sample images for the picture card
export const IMAGES = [
  "src/assets/farmhouse-main.jpeg",
  "src/assets/farmhouse-zoom.jpeg",
  "src/assets/farmhouse-room.jpeg",
];

// sample reviews for the review display
export const sampleReviews = [
  { userId: "44", userName: "John Doe", rating: 4, review: "Great product, highly recommend!" },
  { userId: "44", userName: "Jane Smith", rating: 5, review: "Exceeded my expectations." },
  { userId: "44", userName: "Bob Johnson", rating: 3 },
];
