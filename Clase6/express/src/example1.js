import express from "express";

const app = express();

app.get("/bienvenida", (req,res) => {
    res.send('<h1 style = "color: blue;">BIENVENIDOS AL MUNDO DEL BELLAQUEO</h1>');
});

app.get("/usuario", (req,res) => {
    res.send({nombre: "MARIANO", apellido: "NO LO HAGAS POR FAVOR", edad: "LA DE MARIANO", correo: "mariano@gmail.com"});
});

app.get("/", (req,res) => {
    res.send("Bienvenidos al Index!")
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});