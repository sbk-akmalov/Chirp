import "dotenv/config";
import express from "express";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import errorHandler from "./middleware/error.handler.js";
import sessionRoutes from "./routes/session.route.js";
import authenticate from "./middleware/authenticate.js";
import path from "node:path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use("/auth", authRoutes);
app.use("/session", authenticate, sessionRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
});
