import express from "express";
import cartRouter from "./routes/cart.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import websocket from "./websocket.js";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import session from "express-session";
import usersRouter from "./routes/users.router.js"
import passport from "passport";
import initializatePassport from "./config/passportConfig.js";

const app = express();

//MongoDB connect
const uri = "mongodb+srv://jusce240:omjGmRaUnnVjwVE3@cluster0.dlahfbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views",`${__dirname}/views`);
app.set("view engine", "handlebars");

//Login
app.use(session({
    store: mongoStore.create(
        {
            mongoUrl: uri,
            ttl: 60
        }
    ),
    secret: 'secretPhrase',
    resave: true,
    saveUninitialized: true
    }
))

initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


//Use routers
app.use("/", cartRouter);
app.use("/", productsRouter);
// app.use('/products', viewsRouter);
app.use("/", viewsRouter);

app.use("/api/sessions", usersRouter)


const PORT = 8080;
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});

const io = new Server(httpServer);

websocket(io);

