import express from "express";
const router = express.Router();
import Game from "../models/Game.js";
import Joi from "joi";
import User from "../models/User.js";
import mongoose from "mongoose";
import { auth } from "../middleware/auth.js";

const gameJoiSchema = Joi.object({
  name: Joi.string().required(),
  release_date: Joi.string().required(),
  developer: Joi.string().required(),
  publisher: Joi.string().required(),
  platforms: Joi.string().required(),
  required_age: Joi.number().required(),
  price: Joi.number().required(),
  type: Joi.object({
    genres: Joi.array().required(),
    steamspy_tags: Joi.array().required(),
    categories: Joi.array().required(),
  }).required(),
  stats: Joi.object({
    positive_ratings: Joi.number().required(),
    negative_ratings: Joi.number().required(),
    owners: Joi.string().required(),
    average_playtime: Joi.number().required(),
  }).required(),
  description: Joi.object({
    _id: Joi.string().required(),
    detailed_description: Joi.string().required(),
    about_the_game: Joi.string().required(),
    short_description: Joi.string().required(),
  }).required(),
  media: Joi.object({
    _id: Joi.string().required(),
    header_image: Joi.string().required(),
    screenshots: Joi.array().required(),
    background: Joi.string().required(),
  }).required(),
});

function isValidJson(obj) {
  try {
    JSON.stringify(obj);
  } catch (e) {
    return false;
  }
  return true;
}

// get my games

router.get("/", async (req, res) => {
  try {
    let sort = req.query.sortingParams.sort || "desc";
    let page = req.query.sortingParams.page - 1;
    let name = "";
    req.query.sortingParams.sort
      ? (sort = req.query.sortingParams.sort.split(","))
      : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    let searchParams = req.query.searchParams;
    if (searchParams && searchParams.name) {
      searchParams.name = new RegExp(searchParams.name, 'i');
    }
    const total = await Game.countDocuments(req.query.searchParams);
    const games = await Game.find(req.query.searchParams)
      .sort(sortBy)
      .skip(page * req.query.sortingParams.limit)
      .limit(req.query.sortingParams.limit);


    const response = {
      error: false,
      total,
      page: req.query.sortingParams.page,
      limit: req.query.sortingParams.limit,
      games,
    };
    return res.status(200).send(response);
  } catch (error) {}
});

router.get("/mygames", auth, async (req, res) => {
  try {
    let user = await User.findById(req.payload._id);
    if (!user.games) {
      return res.status(400).send("No Games Found");
    }
    let games = await Game.find({ _id: { $in: user.games } });
    res.json(games).status(200).send("Games Found");
  } catch (error) {
    console.log(error);
  }
});
//get game by serach word
router.post("/search", async (req, res) => {
  try {
    let keyword = new RegExp(Object.keys(req.body)[0], "i"); // 'i' makes it case insensitive
    let games = await Game.find(
      { $text: { $search: keyword } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(70);
    if (!games) {
      return res.status(404).send("game not found");
    }
    return res.status(200).send(games);
  } catch (error) {
    console.log(error);
  }
});
router.post("/find", async (req, res) => {
  try {
    if (!isValidJson(req.body)) {
      return res.status(400).send("Invalid Search Object");
    }
    let games = await Game.find(req.body);
    if (!games) {
      return res.status(404).send("game not found");
    }
    return res.status(200).send(games);
  } catch (error) {
    console.log(error);
  }
});
// get a set amount of games
router.get("/page/:page", async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const games = await Game.aggregate([{ $sample: { size: page } }]);

    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// get game by id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid game id");
    }
    let game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).send("game not found");
    }
    return res.status(200).send(game);
  } catch (error) {
    console.log(error);
  }
});
//delete game by id
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.payload.isAdmin !== "admin") {
      return res.status(401).send("unthorized");
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid game id");
    }
    await Game.findByIdAndDelete(req.params.id);
    return res.status(200).send(`game ${req.params.id} deleted`);
  } catch (error) {}
});
// update game by id
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.payload.isAdmin !== "admin") {
      return res.status(401).send("unthorized");
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid game id");
    }
    const { error } = gameJoiSchema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }
    let game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).send("game not found");
    }
    game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(game);
  } catch (error) {
    console.log(error);
  }
});

export default router;
