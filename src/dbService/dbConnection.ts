import mysql from "mysql";
import config from "../../config/config";

export const dbConnect = mysql.createPool({
  multipleStatements: true,
  host: config.DATABASE.host,
  user: config.DATABASE.user,
  password: config.DATABASE.password,
  database: config.DATABASE.database,
});
