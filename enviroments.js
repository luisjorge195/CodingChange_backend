import dotenv, { parse } from 'dotenv';
dotenv.config();

const config = {
    HOST: process.env.HOST,
    DATABASE: process.env.DATA_BASE,
    USER:process.env.DB_USER,
    PASSWORD: process.env.PASSWORD,
    PORT_DB: process.env.PORT_DB
}
export {config}    