import { middelwareToken } from "../../middelware";
import { deleteAll, showAllTable } from "./controller";
import { changePassword } from "./controllers/changePassword";
import { deleteUserById } from "./controllers/deleteUserById";
import { updateUser } from "./controllers/updateUser";

export const AdminRouter = (router: any) => {
  router.delete("/admin/delete_all", middelwareToken, deleteAll);
  router.delete("/admin/delete_user/:id", middelwareToken, deleteUserById);
  router.put("/admin/update_user/:id", middelwareToken, updateUser);
  router.put("/admin/update_password/:id", middelwareToken, changePassword);
};
