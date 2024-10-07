import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "APIs",
    description: "API documentation for user endpoint",
  },
  host: "localhost:3000",
};

const outputFile = "./src/swagger/swagger-output.json";
const endpointsFiles = ["./src/api/routes/user-routes.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
