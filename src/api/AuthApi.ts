import jwt from "jsonwebtoken";
import mysql from "mysql";
import config from "../../config/config";

export class AuthApi {
  constructor(private readonly connection: mysql.Pool) {}

  async create(params: Array<unknown>) {
    const sqlString = "INSERT INTO ?? SET?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async login(params: Array<unknown>): Promise<unknown> {
    const sqlString = "SELECT * FROM ?? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(new Error(err.message));
        if (!result.length) reject(result);

        const token = jwt.sign({ userId: result.id }, config.SECURITY.TOKEN!, {
          expiresIn: "5h",
        });

        resolve({ result, token });
      });
    });

    return responce;
  }
}
