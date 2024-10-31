import express from "express";
import morgan from "morgan";

import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// CORS
app.use(cors());

// Routes

export default app;
