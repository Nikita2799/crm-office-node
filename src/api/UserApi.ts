import mysql from "mysql";

export class UserApi {
  constructor(private readonly connection: mysql.Pool) {}

  async getById(params: Array<unknown>) {
    const sqlString = "SELECT * FROM ?? WHERE ??=?";

    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err) reject(err);
        if (res.length === 0) reject(0);

        resolve(res[0]);
      });
    });

    return responce;
  }

  async updateUser(params: Array<unknown>) {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";

    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err) reject(err);
        if (res.length === 0) reject(0);

        resolve(res);
      });
    });

    return responce;
  }

  async getAll(params: Array<unknown>) {
    const sqlString = "SELECT * FROM ??";

    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err) reject(err);
        if (res.length === 0) reject(0);

        resolve(res);
      });
    });

    return responce;
  }
}
