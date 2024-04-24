import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type: Array,
        default: [],
        require: true
    }
});

const cartModel2 = mongoose.model(cartCollection, cartSchema);

export default cartModel2;