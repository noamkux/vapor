import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userRegisterJoiSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi
    .string()
    .required()
    .min(8)
    .max(1024)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/
    ),
  age: Joi.number().required(),
  name: Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string().allow(""), // middleName is optional
    lastName: Joi.string().required(),
  }).required(),
  images: Joi.object({
    imgURL: Joi.string().allow(""), // imgURL is optional
    imgALT: Joi.string().required(),
  }).required(),
  games: Joi.array().required(),
  favGames: Joi.array().required(),
  carts: Joi.array().required(),
  isAdmin: Joi.boolean().required(),
});

// Register User

router.post("/register", async (req, res) => {
  try {
    const { error } = userRegisterJoiSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User already exists");
      return res.status(409).send("User already exists");
    }
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET
    );

    res.status(201).send(token);
  } catch (error) {
    console.log(error);
  }
});

export default router;