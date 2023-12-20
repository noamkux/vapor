
import mongoose from "mongoose";
import Game from "./Game.js";

const cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    total: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    dateUpdated: {
        type: String,
        required: true,
    },
});

cartSchema.pre('save', async function(next) {
    let cart = this;

    // calculate total price
    let totalPrice = 0;
    for (let gameId of cart.games) {
        let game = await Game.findById(gameId);
        if (!game) {
            console.log(`Game not found with id: ${gameId}`);
            continue;
        }
        totalPrice += game.price;
    }

    cart.total = totalPrice;

    next();
});

const Cart = mongoose.model("Cart", cartSchema, "Carts");

export default Cart;