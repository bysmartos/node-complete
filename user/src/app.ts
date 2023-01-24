import express, {Request, Response} from "express";
import userRoutes from "./routes/user.routes"
import dotenv from "dotenv";
import db from "./services/database.service";

db

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/user", userRoutes);
app.get("/api", (req: Request , res: Response) => {
  res.json("Hello");
});
app.use((req: Request , res: Response) => {
  res.status(404).send('404')})

app.listen(8005, () => {
  console.log("server up");
});
