import { deleteGroup } from "./controllers/deleteGroup";
import { deleteUserFromGroup } from "./controllers/deleteUserFromGroup";
import { getAllGroup } from "./controllers/getAllGroup";
import { getgroupById } from "./controllers/getGroupById";
import { getUsersFromGroup } from "./controllers/getUsersFromGroup";
import { postGroupe } from "./controllers/postGroupe";
import { postUserToGroup } from "./controllers/postUserToGroup";
import { updateGroup } from "./controllers/updateGroup";

export const GroupRouter = (router: any) => {
  router.post("/group/post_group", postGroupe);
  router.post("/group/post_user_group", postUserToGroup);
  router.get("/group/get_all_group", getAllGroup);
  router.get("/group/get_all_users/:id", getUsersFromGroup);
  router.get("/group/get_group_by_id/:groupId", getgroupById);
  router.put("/group/update_group/:groupId", updateGroup);
  router.delete("/group/delete_group", deleteGroup);
  router.delete("/group/delete_user_group", deleteUserFromGroup);
};
