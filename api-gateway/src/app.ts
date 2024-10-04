import express from "express";
import morgan from "morgan";
import entertainmentRouter from "@/api/routes/enterainment-routes";
import userRouter from "@/api/routes/user-routes"

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/entertainment", entertainmentRouter);
app.use("/users", userRouter);

export default app;
