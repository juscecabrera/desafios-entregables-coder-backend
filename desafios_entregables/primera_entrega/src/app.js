import express from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import fs from "fs";
import {Server} from "socket.io";

const app = express();


app.engine("handlebars", handlebars.engine());

app.set("views",`${__dirname}/views`);

app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

//Use routers
app.use("/", cartRouter);
app.use("/", productsRouter);

const productsFile = fs.readFileSync("./src/Products.json", "utf8")

app.get("/", (req, res) => {
    res.render(
        "home",
        {
            title: "Lista de productos",
            listaProductos: productsFile
        }
    )
});

app.get("/realtimeproducts", (req, res) => {
    res.render(
        "realTimeProducts",
        {
            title: "Productos en tiempo real",
            listaTiempoReal: productsFile
        }
    )
});

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado")

    socketServer.emit("para_todos", "este mensaje lo reciben todos")
})
