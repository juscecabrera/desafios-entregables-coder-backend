import orderModel from "../models/orderModel.js"

export default class Order {

    getOrders = async () => {
        try {
            return await orderModel.find();
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    getOrderById = async (id) => {
        try {
            return await orderModel.findOne({_id : id})
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    createOrder = async (order) => {
        try {
            return await orderModel.create(order)
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }

    resolveOrder = async (id, order) => {
        try {
            return await orderModel.updateOne({_id: id}, {$set: order});
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}