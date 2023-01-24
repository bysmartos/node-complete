import express, {Request, Response} from "express";
import cartRoutes from "./routes/cart.routes"
import dotenv from "dotenv";
import db from "./services/database.service";

//Connect with database 
db

//Dotenv config to use .env file with environment variables

dotenv.config();

const app = express();
//App config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/cart", cartRoutes);
app.get("/api", (req: Request , res: Response) => {
  res.json("Hello");
});
app.use((req: Request , res: Response) => {
  res.status(404).send('404')})

app.listen(8002, () => {
  console.log("server up");
});
