import mysql from 'mysql';
import config from '../../config/config'

export const dbConnect = mysql.createPool({
    multipleStatements:true,
    host: config.DATABASE.DB_HOST,
    user: config.DATABASE.DB_USER,
    password: config.DATABASE.DB_PASSWORD,
    database: config.DATABASE.DB_NAME
})
