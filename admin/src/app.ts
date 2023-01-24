import express, {Request, Response} from "express";
import adminRoutes from "./routes/admin.routes"
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
app.use("/api/admin", adminRoutes);
app.get("/api", (req: Request , res: Response) => {
  res.json("Hello");
});
app.use((req: Request , res: Response) => {
  res.status(404).send('404 Page not found')})

app.listen(8000, () => {
  console.log("server up");
});
