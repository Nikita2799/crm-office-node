import mysql from "mysql";
import config from "../../config/config";
import { AuthApi } from "../api/AuthApi";

export class DatabaseApi {
  private connection: mysql.Pool = mysql.createPool(config.DATABASE);

  public auth: AuthApi = new AuthApi(this.connection);
}
