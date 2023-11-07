import dotenv from "dotenv";
import express, {Application} from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { router } from "./routes";

dotenv.config();
const app: Application = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: process.env.CLIENT_HOST || "",
    credentials: true,
  })
);

app.use("/api", router);

(async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
