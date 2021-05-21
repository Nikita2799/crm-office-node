import mysql from "mysql";

export class AdminApi {
  constructor(private readonly connection: mysql.Pool) {}

  async deleteAll(params: Array<unknown>) {
    const sqlString = "DROP DATABASE ??";
    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });

    return responce;
  }

  async updatePassword(params: Array<unknown>) {
    const sqlString = "UPDATE ?? SET? WHERE ??=";
    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err) reject(err);

        resolve(res);
      });
    });

    return responce;
  }

  async deleteById(params: Array<unknown>) {
    const sqlString = "DELETE FROM ?? WHERE id=?";
    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err) reject(err);
        console.log(res);

        if (res.affectedRows === 0) reject(0);
        resolve(res);
      });
    });

    return responce;
  }

  async update(params: Array<unknown>) {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";
    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err?.errno === 1062) reject(err.errno);
        if (err) reject(err);
        console.log(res);

        if (res === 0) reject(0);
        resolve(res);
      });
    });

    return responce;
  }
}
