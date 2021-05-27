import { middelwareToken } from "../../middelware";
import { deleteAll, showAllTable } from "./controller";
import { changePassword } from "./controllers/changePassword";
import { deleteUserById } from "./controllers/deleteUserById";
import { getClient } from "./controllers/getClient";
import { getClientById } from "./controllers/getClientById";
import { updateUser } from "./controllers/updateUser";

export const AdminRouter = (router: any) => {
  router.delete("/admin/delete_all", middelwareToken, deleteAll);
  router.delete("/admin/delete_user/:id", middelwareToken, deleteUserById);
  router.get("/admin/get_client", middelwareToken, getClient);
  router.get("/admin/get_client_by_id", getClientById);
  router.put("/admin/update_user/:id", middelwareToken, updateUser);
  router.put("/admin/update_password", middelwareToken, changePassword);
};
