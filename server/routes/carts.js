import express from "express";
const router = express.Router();
import Game from "../models/Game.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Joi from "joi";
import { auth } from "../middleware/auth.js";

const cartSchema = Joi.object({
  user_id: Joi.string().required(),
  games: Joi.array().required(),
  total: Joi.number().required(),
  active: Joi.boolean().required(),
  dateUpdated: Joi.string().required(),
});

// add a game to cart
router.post("/:id", auth, async (req, res) => {
  try {
    //checks if the id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid game id");
    }
    //checks if the game exists
    let game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).send("game not found");
    }
    //checks if the user exists
    let user = await User.findById(req.payload._id);
    if (!user) {
      return res.status(404).send("user not found");
    }
    //checks if the user has an active cart
    if (user.carts.length > 0) {
      let cart = await Cart.findOne({ user_id: req.payload._id, active: true });
      cart.games.push(req.params.id);
      await cart.save();
      return res.status(200).send(cart);
    }
    //checks if the user dont have a cart
    if (user.carts.length === 0) {
      const newCart = new Cart({
        user_id: req.payload._id,
        games: [req.params.id],
        total: game.price,
        active: true,
        dateUpdated: new Date().toISOString(),
      });
      await newCart.save();
      user.carts.push(newCart._id);
      await user.save();
      return res.status(200).send(newCart);
    }
  } catch (error) {
    console.log(error);
  }
});

//get my active carts
router.get("/", auth, async (req, res) => {
  try {
    let userCarts = await Cart.find({ user_id: req.payload._id, active: true });
    if (userCarts.length === 0) {
      return res.status(404).send("no carts found");
    }
    return res.status(200).send(userCarts);
  } catch (error) {
    console.log(error);
  }
});
//get my carts history
router.get("/history", auth, async (req, res) => {
  try {
    let userCarts = await Cart.find({
      user_id: req.payload._id,
      active: false,
    });
    if (userCarts.length === 0) {
      return res.status(404).send("no carts found");
    }
    return res.status(200).send(userCarts);
  } catch (error) {
    console.log(error);
  }
});

// update cart my active cart
router.put("/", auth, async (req, res) => {
  try {
    let { error } = cartSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }
    let cart = await Cart.findOne({ user_id: req.payload._id, active: true });
    if (!cart) {
      return res.status(404).send("cart not found");
    }
    cart = req.body;
    await cart.save();
    return res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
});

// deactivate my active cart
router.delete("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user_id: req.payload._id, active: true });
    if (!cart) {
      return res.status(404).send("cart not found");
    }
    cart.active = false;
    await cart.save();
    return res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
});

export default router;
