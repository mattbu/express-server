import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import "dotenv/config";
import usersRouter from "./routes/users.route";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/users", usersRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
};
app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
