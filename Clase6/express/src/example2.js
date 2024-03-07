import express from "express";

const app = express();

const usuarios = [
    {id: "1", nombre: "MAURICIO", apellido: "MAURICIO", edad: 30},
    {id: "2", nombre: "MAURICIO2", apellido: "MAURICIO", edad: 30},
    {id: "3", nombre: "MAURICIO3", apellido: "MAURICIO", edad: 30}

]

app.get("/", (req,res) => {
    res.send(usuarios);
});

app.get("/:idUsuario", (req,res) => {
    const idUsuario = req.params.idUsuario;

    let usuario = usuarios.find(usuario => usuario.id === idUsuario);

    if (!usuario) {
        return res.send({
            error: "Usuario PERDIDO MANITO"
        })
    }

    res.send({usuario})
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});