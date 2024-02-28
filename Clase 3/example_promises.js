function dividir(dividendo, divisor) {
    return new Promise((resolve, reject) => {
        if (divisor === 0) {
            reject ("no se puede dividir por cero")
        } else {
            resolve(dividendo / divisor)
        }
    });
}

dividir(10,0).then(resultado => {
    console.log(`El resultado es: ${resultado}`)
}).catch(error => {
    console.error(`Error: ${error}`)
});

dividir(10,2).then(resultado => {
    console.log(`El resultado es: ${resultado}`)
}).catch(error => {
    console.error(`Error: ${error}`)
})