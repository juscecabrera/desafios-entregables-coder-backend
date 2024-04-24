import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        require: false,
        default: true
    },
    stock: {
        type: Number,
        require: true
    }
});

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;