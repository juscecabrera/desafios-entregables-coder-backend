export const userExistsError = (user) => {
    return `El usuario ${user} ya existe`
}

export const userNonexistentError = (user) => {
    return `El usuario ${user} no existe`
}

export const wrongPassword = () => {
    return `Contraseña incorrecta`
}

export const loginError = () => {
    return `Inicio de sesión fallido`
}

export const registerError = () => {
    return `Registro incorrecto: email y contraseña necesaria
    `
}

export const serverError = () => {
    return `Error interno del servidor`
}