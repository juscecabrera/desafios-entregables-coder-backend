import Order from "../dao/classes/orderDAO.js";
import User from "../dao/classes/userDAO.js";
import Business from "../dao/classes/businessDAO.js";

const orderService = new Order();
const userService = new User();
const businessService = new Business();

const responseError = {
    status: "error",
    error: "Something went wrong, try again"
}

export const getOrders = async (req,res) => {
    const result = await orderService.getOrders();

    if (!result) return res.status(500).send(responseError);
    res.send({ status: "success", result })
}

export const getOrderById = async (req,res) => {
    const { oid } = req.params;
    const result = await orderService.getOrderById(oid);

    if (!result) return res.status(500).send(responseError);
    res.send({ status: "success", result })
}

export const createOrder = async (req,res) => {
    const { user, business, products } = req.body;

    const resultUser = await userService.getUserById(user);
    const resultBusiness = await businessService.getBusinessById(business);
    
    if (!resultBusiness || !resultUser) return res.status(500).send(responseError);

    const currentOrders = resultBusiness.products.filter(product => products.includes(product.id));
    const sum = currentOrders.reduce((acc, prev) => {
        acc += prev.price;
        return acc;
    },0);

    const orderNumber = Date.now() + Math.floor(Math.random() * 10000 + 1)

    const order = {
        number: orderNumber,
        business,
        user,
        status: "pending",
        products: currentOrders.map(product => product.id),
        totalPrice: sum
    }

    const orderResult = await orderService.createOrder(order);

    if(!orderResult) return res.status(500).send(responseError);
    res.send({ status: "success", result: orderResult })
}

export const resolveOrder = async (req,res) => {
    const { status } = req.body;
    const { oid } = req.params;

    const order = await orderService.getOrderById(oid);

    if (!order) return res.status(500).send(responseError);

    order.status = status;
    const result = await orderService.resolveOrder(order._id, order);

    if (!result) return res.status(500).send(responseError);

    res.send({ status: "success", result: "Order resolved" })
}