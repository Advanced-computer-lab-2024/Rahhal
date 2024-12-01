import express from "express";
import promocodeRoutes from "./api/routes/promocode-routes";

const app = express();

app.use(express.json());

app.use("/promocode", promocodeRoutes)

export default app;