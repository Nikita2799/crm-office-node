import { middelwareToken } from "../../middelware";
import { getUserByToken } from "./controllers/getUserByToken";
import { getAllUser } from "./controllers/getAll";
import { getUserById } from "./controllers/getUserById";

export const UserRouter = (router: any) => {
  router.get("/user/getOne", middelwareToken, getUserByToken);
  router.get("/user/getAll", middelwareToken, getAllUser);
  router.get("/user/get_by_id/:id", middelwareToken, getUserById);
};
