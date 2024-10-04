import express from "express";
import morgan from "morgan";
import entertainmentRouter from "@/api/routes/enterainment-routes";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/entertainment", entertainmentRouter);

export default app;
