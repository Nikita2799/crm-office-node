import mysql from "mysql";

export class SocketApi {
  constructor(private readonly connection: mysql.Pool) {}

  async changeOnline(params: Array<unknown>) {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(err.errno);

        resolve(result);
      });
    });

    return responce;
  }
}
