import dotenv from 'dotenv';
dotenv.config();

const config = {
    env: process.env.NODE_ENV,
    HOST: process.env.HOST,
    DATABASE: process.env.DATA_BASE,
    USER:process.env.DB_USER,
    PASSWORD: process.env.PASSWORD,
    PORT_DB: process.env.PORT_DB
}
export {config}   