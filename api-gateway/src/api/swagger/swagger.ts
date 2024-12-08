import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Rahhal API",
    description: "API documentation for Rahhal project",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
const routes = ["../routes/product-routes.ts", "../routes/user-routes.ts", "../routes/order-routes.ts", "../routes/payment-routes.ts", "../routes/trasportation-routes.ts", "../routes/booking-routes.ts", "../routes/enterainment-routes.ts", "../routes/exchange-rates-routes.ts", "../routes/external-api-routes.ts", "../routes/firebase-routes.ts", "../routes/flights-search-routes.ts", "../routes/google-maps-routes.ts", "../routes/rating-routes.ts"];
/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
