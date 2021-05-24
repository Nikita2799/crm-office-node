import { middelwareToken } from "../../middelware";
import { checkUserToGroupe } from "./controllers/checkUserToGroup";
import { deleteGroup } from "./controllers/deleteGroup";
import { deleteUserFromGroup } from "./controllers/deleteUserFromGroup";
import { getAllGroup } from "./controllers/getAllGroup";
import { getgroupById } from "./controllers/getGroupById";
import { getUsersFromGroup } from "./controllers/getUsersFromGroup";
import { postGroupe } from "./controllers/postGroupe";
import { postUserToGroup } from "./controllers/postUserToGroup";
import { updateGroup } from "./controllers/updateGroup";

export const GroupRouter = (router: any) => {
  router.post("/group/post_group", middelwareToken, postGroupe);
  router.post("/group/post_user_group", middelwareToken, postUserToGroup);
  router.get("/group/get_all_group", middelwareToken, getAllGroup);
  router.get(
    "/group/get_all_users/:groupid",
    middelwareToken,
    getUsersFromGroup
  );
  router.get("/group/get_group_by_id/:groupId", middelwareToken, getgroupById);
  router.get("/group/check_user/:id", middelwareToken, checkUserToGroupe);
  router.put("/group/update_group/:groupId", middelwareToken, updateGroup);
  router.delete("/group/delete_group", middelwareToken, deleteGroup);
  router.delete(
    "/group/delete_user_group",
    middelwareToken,
    deleteUserFromGroup
  );
};
