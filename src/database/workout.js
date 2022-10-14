import * as pg from 'pg'
const { Pool } = pg.default
import dotenv from 'dotenv';
dotenv.config();
import {config} from '../../enviroments.js'

const USER = encodeURIComponent(config.USER);
const PASSWORD = encodeURIComponent(config.PASSWORD);

const URI = `postgres://${USER}:${PASSWORD}@${config.HOST}:${config.PORT_DB}/${config.DATABASE}`;
const pool = new Pool({ connectionString: URI });
export {pool} 