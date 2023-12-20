import express from "express";
const router = express.Router();
import User from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";

//login schema

const userLoginJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .max(1024)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@%$#^&*-_*(])[A-Za-z\d!@%$#^&*-_*(]{8,}$/
    ),
});

//user schema

const userJoiSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
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

// Login User

router.post("/", async (req, res) => {
  try {
    const { error } = userLoginJoiSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User does not exist");
      return res.status(400).send("User does not exist");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      console.log("Invalid Password");
      return res.status(400).send("Invalid Password");
    }
    const token = jwt.sign(
      { _id: user._id, userName: user.userName, email: user.email },
      process.env.JWT_SECRET
    );
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
  }
});

// get all users
router.get("/", auth, async (req, res) => {
  try {
    if (!req.payload.isAdmin) {
      return res.status(403).send("unauthorized");
    }
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

// get user by id

router.get("/:id", auth, async (req, res) => {
  try {
    if (req.payload._id !== req.params.id 
      // && req.payload.isAdmin !== "admin"
      ) {
      return res.status(401).send("unthorized");
    }
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("user not found");
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

// update user by id

router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = userJoiSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }
    if (req.payload._id !== req.params.id && req.payload.isAdmin !== "admin") {
      return res.status(401).send("unthorized");
    }
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("user not found");
    }
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

// delete user by id

router.delete("/:id", auth, async (req, res) => {
    try {
      if (req.payload._id !== req.params.id && req.payload.isAdmin !== "admin") {
        return res.status(401).send("unthorized");
      }
      let user = await User.findByIdAndDelete({ _id: req.params.id });
      if (!user) {
        return res.status(404).send("user not found");
      }
      res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
  });
  

export default router;
