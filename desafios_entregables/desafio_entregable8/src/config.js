import dotenv from "dotenv";

dotenv.config();

export default {
    clientId: process.env.CLIENT_ID,
    secretId: process.env.SECRET_ID
}