console.log("Este es el ejemplo ES8");

//Las funciones Object.entries, Object.keys, Object.values 
function printObjToEntries(obj) {
    console.warn("Ejemplo de Object.entries() >>>");

    let entries = Object.entries(obj);

    for(let entrie of entries) {
        console.log(`${entrie[0]}, ${entrie[1]}`);
    }
}

printObjToEntries({
    name: "Joaquin",
    lastName: "Cejas",
    age: 29
})

function printObjToKeysAndValues(obj) {
    console.warn("Ejemplo de Object.keys() y Object.values() >>>");

    let keys = Object.keys(obj);
    let values = Object.values(obj);

    console.log(keys,values)

    for(let i = 0; i < keys.length; i++) {
        console.log(`${keys[i]}, ${values[i]}`)
    }
}

printObjToKeysAndValues({
    name: "MESSI",
    lastName: "RESPIRAPORFAVOR",
    age: 36
})