import express from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import fs from "fs";
import {Server} from "socket.io";
import websocket from "./websocket.js";


const app = express();

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views",`${__dirname}/views`);
app.set("view engine", "handlebars");

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


//Use routers
app.use("/", cartRouter);
app.use("/", productsRouter);
app.use('/products', viewsRouter);


const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

websocket(io);

