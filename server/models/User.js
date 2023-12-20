
import mongoose from "mongoose";

// Create a Mongoose schema based on the Joi schema
const userSchema = new mongoose.Schema({
  userName: { type: String, minLength: 2, maxLength: 30, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024,
    match:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/,
  },
  age: Number,
  name: {
    firstName: String,
    middleName: { type: String, required: false },
    lastName: String,
  },
  images: {
    imgURL: String,
    imgALT: String,
  },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  favGames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  isAdmin: Boolean,
});

// Create the Mongoose model
const User = mongoose.model("User", userSchema , "Users");

export default User;
