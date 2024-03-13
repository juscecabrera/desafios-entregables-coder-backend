import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";

const app = express();

//iniciamos el motor de plantillas
app.engine("handlebars", handlebars.engine());

//Establecemos la ruta de vistas
app.set("views", `${__dirname}/views`)

//Establecemos el motor de renderizado
app.set("view engine", "handlebars");

//Lo hice yo mismo y funciona. 
app.get("/", (req,res) => {
    let random = Math.floor(Math.random() * 5);
    if (random == 0) {
        random === 1;
    }
    const users = [
        {
            name: "Jusce",
            apellido: "Cabrera",
            edad: "22",
            correo: "jusce240@gmail.com",
            telefono: "954989568"
        },
        {
            name: "Cristian",
            apellido: "Roose",
            edad: "21",
            correo: "ros@gmail.com",
            telefono: "912399129"
        },
        {
            name: "Jorge",
            apellido: "Revoredo",
            edad: "64",
            correo: "voredus@gmail.com",
            telefono: "908786567"
        },
        {
            name: "manito4",
            apellido: "manito4",
            edad: "edad4",
            correo: "correo4",
            telefono: "telefono4"
        },
        {
            name: "manito5",
            apellido: "manito5",
            edad: "edad5",
            correo: "correo5",
            telefono: "telefono5"
        },
    ]
    res.render(
        "index",
        {
            title: "Coder House",
            name: users[random].name,
            apellido: users[random].apellido,
            edad: users[random].edad,
            correo: users[random].correo,
            telefono: users[random].telefono
        }
    )
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor activo en https://localhost:${PORT}`);
});