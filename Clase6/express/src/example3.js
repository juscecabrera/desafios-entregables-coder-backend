import express from "express";

const app = express();

app.use(express.urlencoded({extended: true}));

const usuarios = [
    {id: "1", nombre: "MAURICIO", apellido: "MAURICIO", edad: 30, genero:"F"},
    {id: "2", nombre: "MAURICIO2", apellido: "MAURICIO", edad: 30, genero:"M"},
    {id: "3", nombre: "MAURICIO3", apellido: "MAURICIO", edad: 30, genero:"F"}
];

app.get("/", (req,res) => {
    const genero = req.query.genero;

    if(!genero || (genero !== "M" && genero !== "F")) {
        return res.send(usuarios);
    }

    const usuariosFiltrados = usuarios.filter(usuario => usuario.genero === genero);

    res.send({usuariosFiltrados});

});


const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});