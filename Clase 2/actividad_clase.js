const objetos = [
    {
        manzanas: 3,
        peras: 2,
        carne: 1,
        jugos: 5,
        dulces: 2
    },
    {
        manzanas: 1,
        sandias: 1,
        huevos: 6,
        jugos: 1,
        panes: 2
    },
  ];


//Solución de otro alumno
const new_list = objetos.map(obj => Object.keys(obj)).flat(); 

//Buscar sobre 
//new Set(new_list), map, flat, reduce, etc. 
