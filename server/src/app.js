import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

//cors settings
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);

//config for express to understand browser encoder
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

app.use(cookieParser());

//to store images and files in public
app.use(express.static("public"));

import studentRouter from "./routes/students.routes.js";

app.use("/api/v1/students", studentRouter);
export default app;
