import mysql from "mysql";

export class GroupApi {
  constructor(private readonly connection: mysql.Pool) {}

  async addGroup(params: Array<unknown>): Promise<unknown> {
    const sqlString = "INSERT INTO ?? SET?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        console.log(err);

        if (err) reject(err.errno);

        resolve(result);
      });
    });

    return responce;
  }

  async addUserToGroup(params: Array<unknown>): Promise<unknown> {
    const sqlString = "INSERT INTO ?? SET?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        console.log(err);

        if (err) reject(err.errno);

        resolve(result);
      });
    });

    return responce;
  }

  async getAllGroup(params: Array<unknown>): Promise<unknown> {
    const sqlString = "SELECT * FROM ??";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));
        //if (result.length === 0) resolve(result);

        resolve(result);
      });
    });

    return responce;
  }

  async checkUser(params: Array<unknown>): Promise<unknown> {
    const sqlString =
      "SELECT * FROM ?? as g LEFT JOIN ?? as ug ON g.groupId=ug.groupId WHERE ug.userId=? ";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));
        //if (result.length === 0) resolve(result);

        resolve(result);
      });
    });

    return responce;
  }

  async getUsersFromGroup(params: Array<unknown>): Promise<unknown> {
    const sqlString =
      "SELECT * FROM ?? as u LEFT JOIN ?? as ug ON ug.userId=u.id WHERE ug.groupId=? ";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));
        //if (result.length === 0) resolve(result);

        resolve(result);
      });
    });

    return responce;
  }

  async findGroup(params: Array<unknown>): Promise<unknown> {
    const sqlString = "SELECT * FROM ?? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));
        if (result.length === 0) resolve(false);

        resolve(true);
      });
    });

    return responce;
  }

  async findGroupById(params: Array<unknown>): Promise<unknown> {
    const sqlString = "SELECT * FROM ?? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));
        if (result.length === 0) resolve(false);

        resolve(result[0]);
      });
    });

    return responce;
  }

  async updateGroup(params: Array<unknown>): Promise<unknown> {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(err.errno);

        resolve(result);
      });
    });
    //Этот код писал чел который ничего не понимает, и да, он долбоёб
    return responce;
  }

  async findUser(params: Array<unknown>): Promise<unknown> {
    const sqlString = "SELECT * FROM ?? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));
        if (result.length === 0) resolve(false);

        resolve(true);
      });
    });

    return responce;
  }

  async updateUser(params: Array<unknown>): Promise<unknown> {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async addUser(params: Array<unknown>): Promise<unknown> {
    const sqlString = "INSERT INTO ?? SET?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async deleteGroup(params: Array<unknown>): Promise<unknown> {
    const sqlString = "DELETE FROM ?? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        console.log(err);
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async deleteUserGroup(params: Array<unknown>): Promise<unknown> {
    const sqlString = "DELETE FROM ?? WHERE ??=? AND ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        console.log(err);
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }
}
