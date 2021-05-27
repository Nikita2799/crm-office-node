import { middelwareToken } from "../../middelware";
import { postBase } from "./controller/postBase";
import { getInfoBase } from "./controller/getInfoBase";
import { getClient } from "./controller/getClient";
import { changeStatusClient } from "./controller/changeStatusClient";
import { postDesc } from "./controller/postDesc";
import { postCardClient } from "./controller/postCardClient";

export const ClientRouter = (router: any) => {
  router.post("/client/post_base", postBase);
  router.post("/client/update_status", middelwareToken, changeStatusClient);
  router.post("/client/post_desc/:clientId", middelwareToken, postDesc);
  router.post("/client/post_card/:clientId", middelwareToken, postCardClient);
  router.get("/client/get_info", getInfoBase);
  router.get("/client/get_client", middelwareToken, getClient);
};
