import express from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Use routers
app.use("/", cartRouter);
app.use("/", productsRouter);


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});