import mysql from "mysql";
import config from "../../config/config";

export class ClientApi {
  constructor(private readonly connection: mysql.Pool) {}

  async getUserGroup(params: Array<any>): Promise<unknown> {
    const sqlString =
      "SELECT g.nameTabel FROM ?? as g INNER JOIN ?? as ug ON ug.groupId=g.groupId WHERE ug.userId = ? LIMIT 1";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        console.log(err);

        console.log(result, "test");

        if (err) reject(new Error(err.message));
        if (result.length === 0) reject(0);

        resolve(result[0]);
      });
    });

    return responce;
  }

  async updateClient(params: Array<any>): Promise<unknown> {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        console.log(err);

        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async getClientInWork(params: Array<any>): Promise<unknown> {
    const sqlString = "SELECT * FROM ?? WHERE ??=? AND ??=? LIMIT 1";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        console.log(err);
        console.log(result);

        if (err) reject(err.errno);
        if (result.length === 0 || result === undefined) resolve(0);

        resolve(result[0]);
      });
    });

    return responce;
  }

  async getClient(params: Array<any>): Promise<unknown> {
    const sqlString = "SELECT * FROM ?? WHERE ??=? LIMIT 1";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        console.log(err);

        if (err) reject(new Error(err.message));
        if (err) reject(err.errno);

        if (result.length === 0) resolve(0);

        resolve(result[0]);
      });
    });

    return responce;
  }

  async postNameBase(params: Array<unknown>) {
    const sqlString =
      "CREATE TABLE `office-crm_db`.?? ( `id` INT NOT NULL AUTO_INCREMENT , `userId` INT NOT NULL , `name` VARCHAR(150) NOT NULL,`phone` VARCHAR(30) NOT NULL , `address` VARCHAR(500) NOT NULL ,`desc` VARCHAR(3000) NOT NULL,`card` VARCHAR(50) NOT NULL, `status` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(err.errno);

        resolve(result);
      });
    });

    return responce;
  }

  async getNameTabel(params: Array<any>): Promise<unknown> {
    const sqlString =
      "SELECT * FROM ?? as ug INNER JOIN ?? as g ON ug.groupId=g.groupId WHERE ug.userId=? ";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async postDesc(params: Array<any>): Promise<unknown> {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async postCard(params: Array<any>): Promise<unknown> {
    const sqlString = "UPDATE ?? SET? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async postBase(params: Array<any>): Promise<unknown> {
    const sqlString = "INSERT INTO ?? SET?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async getInfoBase(params: Array<unknown>): Promise<unknown> {
    const sqlString = "SHOW TABLES FROM ??";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async getCount(params: Array<unknown>): Promise<unknown> {
    const sqlString = "SELECT COUNT(*) FROM ?? WHERE ??=?";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }

  async deleteBase(params: Array<unknown>): Promise<unknown> {
    const sqlString = "DROP TABLE ??";

    const responce = await new Promise((resolve, reject) => {
      this.connection.query(sqlString, params, (err, result: Array<any>) => {
        if (err) reject(new Error(err.message));

        resolve(result);
      });
    });

    return responce;
  }
}
