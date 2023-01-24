import mongoose from "mongoose";
import {mongoUri} from "../configs/config"


mongoose
  .connect(mongoUri)
  .then((db) => console.log("Db is connected"))
  .catch((err) => console.log(err));

  export default mongoose;
