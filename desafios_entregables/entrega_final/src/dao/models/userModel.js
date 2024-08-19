import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String, 
        require: true
    },
    cart: {
        type: mongoose.Schema.ObjectId,
        ref: "carts",
        default: []
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;