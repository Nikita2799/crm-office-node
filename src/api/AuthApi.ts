import jwt from "jsonwebtoken";
import mysql from "mysql";
import config from "../../config/config";

export class AuthApi {
  constructor(private readonly connection: mysql.Pool) {}

  async create(params: Array<unknown>) {
    const sqlString = "INSERT INTO ?? SET?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(err.errno);

        resolve(result);
      });
    });

    return responce;
  }

  async login(params: Array<unknown>): Promise<unknown> {
    const sqlString = "SELECT * FROM ?? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, async (err, result) => {
        if (err) reject(new Error(err.message));
        if (result.length === 0) reject(result);
        else {
          setTimeout(() => {
            const token = jwt.sign(
              { userId: result[0].id },
              config.SECURITY.TOKEN!,
              {
                expiresIn: "10h",
              }
            );
            resolve({ result, token });
          }, 0);
        }
      });
    });

    return responce;
  }
}
