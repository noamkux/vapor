import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  platforms: {
    type: String,
    required: true,
  },
  required_age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    genres: {
      type: Array,
      required: true,
    },
    steamspy_tags: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  stats: {
    positive_ratings: {
      type: Number,
      required: true,
    },
    negative_ratings: {
      type: Number,
      required: true,
    },
    owners: {
      type: String,
      required: true,
    },
    average_playtime: {
      type: Number,
      required: true,
    },
  },
  description: {
    _id: {
      type: String,
      required: true,
    },
    detailed_description: {
      type: String,
      required: true,
    },
    about_the_game: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
  },
  media: {
    _id: {
      type: String,
      required: true,
    },
    header_image: {
      type: String,
      required: true,
    },
    screenshots: {
      type: Array,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    movies: {
      type: String,
      required: false,
    },
  },
});

gameSchema.index({
  name: "text",
  developer: "text",
  publisher: "text",
  platforms: "text",
  type: "text",
  "description.detailed_description": "text",

});
const Game = mongoose.model("Game", gameSchema , "Games");

export default Game;
