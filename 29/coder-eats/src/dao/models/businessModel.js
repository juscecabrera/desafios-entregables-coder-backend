import mongoose, { mongo } from "mongoose";

const businessCollection = "businesss";

const businessSchema = new mongoose.Schema({
    name: String,
    products: []
})

const businessModel = mongoose.model(businessCollection, businessSchema);

export default businessModel;