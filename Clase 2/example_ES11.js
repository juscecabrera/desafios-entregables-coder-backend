//Operador OR "||"(interpreta los booleanos)

let varTest = 0; //lo interpreta como un booleano false, el 1 es true

let varAssign = varTest || "Sin valor";

console.log(varAssign); //"Sin valor"

//Operador Nullish "??" (no interpreta, porque tiene un valor)

let varWithNullish = varTest ?? "Sin valor";

console.log(varWithNullish); // 0

//varWithNullish = notDefined ?? "Sin valor";
//console.log(varWithNullish); // Genera error con variables indefinidas

varWithNullish = (undefined ? notDefined : "Sin valor") //Operador ternario
console.log(varWithNullish);
