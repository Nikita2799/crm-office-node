import mysql from "mysql";
import config from "../../config/config";
import { AdminApi } from "../api/AdminApi";
import { AuthApi } from "../api/AuthApi";
import { ClientApi } from "../api/ClientApi";
import { GroupApi } from "../api/GroupApi";
import { SocketApi } from "../api/SocketApi";
import { UserApi } from "../api/UserApi";

export class DatabaseApi {
  private connection: mysql.Pool = mysql.createPool(config.DATABASE);

  public socket: SocketApi = new SocketApi(this.connection);
  public auth: AuthApi = new AuthApi(this.connection);
  public admin: AdminApi = new AdminApi(this.connection);
  public user: UserApi = new UserApi(this.connection);
  public client: ClientApi = new ClientApi(this.connection);
  public group: GroupApi = new GroupApi(this.connection);
}
