import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.route";
import authRouter from "./routes/auth.route"
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);
