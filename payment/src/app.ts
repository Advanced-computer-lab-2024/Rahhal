import express from "express";
import promocodesRoutes from "./api/routes/promocode-routes";

const app = express();

app.use(express.json());

app.use("/promocodes", promocodesRoutes)

export default app;