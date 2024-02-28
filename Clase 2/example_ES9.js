console.log("Este es el ejemplo para ES9");

// Operador spread y rest

function add(...numbers) {
    let add = 0;

    for (let n of numbers) {
        add+= n;
    }

    return add;
}

const result = add(1, 2, 3, 4, 908, 910);

console.log(`El resultado es: ${result}`)

// Operador rest

let obj = {
    name: "MESSI NO",
    lastName: "AAAAAAA",
    elPorqueLoHizo: "POR QUEL O HICISTE",
    sionoRasa: "sionorasa"
};

const {lastName, ...gime} = obj;

console.log(gime);
// Operador spread (copia profunda de objetos)

const coders = {
    ivan: "estudiante 1",
    jose: "estudiante 2",
    jean: "estudiante 3",
    profes: {
        joaco: "profe",
        lucia: "tutora adjunta"
    }
}

const coders_2 = coders; 
//el segundo objeto está referenciando al objeto 1, no es una copia. 

coders_2.ivan = "otra cosa";

console.log("coders: ", coders);
console.log("coders_2: ", coders_2);

//en la consola, coders cambia por el cambio en coders_2. Todo lo que le hago a coders_2 le afecta a coders. 

const coders_3 = {...coders};
coders_3.jean= "otra cosa";

console.log("coders: ", coders);
console.log("coders_3: ", coders_3);

//esto hace que coders_3 sea una copia. En la consola, no se modifica coders, solo coders_3. El spread está copiando, no referenciando. 

coders_3.profes.joaco = "Modificación profunda";
console.log("coders: ", coders);
console.log("coders_3: ", coders_3);

//esto de arriba SI modifica al objeto original. No hace copias profundas, solo copia el primer nivel de atributos. 

//(abajo) Copia profunda 
const coders_copia_profunda = JSON.parse(JSON.stringify(coders));//Esta función convierte un objeto a un string. Esto ya es una copia completa. El parse lo convierte en un objeto de nuevo. 
coders_copia_profunda.profes.lucia ="Nerea";
console.log("coders: ", coders);
console.log("coders_copia_profunda: ", coders_copia_profunda);


