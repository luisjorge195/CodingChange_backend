import * as pg from 'pg'
const { Pool } = pg.default

import dotenv from 'dotenv';
dotenv.config();
import {config} from '../../enviroments.js'

const URI = `postgres://${config.USER}:${config.PASSWORD}@${config.HOST}:${config.PORT_DB}/${config.DATABASE}`
const pool = new Pool({ connectionString: URI, ssl: {
    rejectUnauthorized: false,
  }, });
export {pool}   