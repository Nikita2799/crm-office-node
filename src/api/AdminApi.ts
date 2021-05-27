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

  async getClient(params: Array<unknown>) {
    const sqlString = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err) reject(err);
        if (res.length === 0) reject(0);
        resolve(res);
      });
    });

    return responce;
  }

  async getClientBase(params: Array<unknown>) {
    const sqlString =
      "SELECT * FROM ?? as ug INNER JOIN ?? as g ON ug.groupId=g.groupId WHERE ??=?";
    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (err) reject(err);
        if (res.length === 0) reject(0);
        resolve(res);
      });
    });

    return responce;
  }

  async getActiveClient(params: Array<unknown>) {
    const sqlString = "SELECT * FROM ?? WHERE ??=?";
    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        console.log(err, res);

        if (res === 0) reject(0);
        if (err) reject(err);

        resolve(res);
      });
    });

    return responce;
  }

  async updatePassword(params: Array<unknown>) {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";
    const responce = new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, res) => {
        if (res === 0) reject(0);
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
