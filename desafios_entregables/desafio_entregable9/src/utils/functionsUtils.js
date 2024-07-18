import bcrypt from "bcrypt";

//Crea el hash 
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Compara el hash con la contraseña hasheada
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);