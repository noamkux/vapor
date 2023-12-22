import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./routes/users.js";
import register from "./routes/register.js";
import games from "./routes/games.js";
import carts from "./routes/carts.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, dbName: "vapor" })
  .then(() => {console.log("Connected To MongoDB");})
  .catch((error) => {
    console.log(`${error} Failed To Connect To MongoDB`);
  });
  mongoose.set('debug', true);
app.use("/api/users", users);
app.use("/api/users/register", register);
app.use("/api/games", games)
app.use("/api/carts", carts)



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});



