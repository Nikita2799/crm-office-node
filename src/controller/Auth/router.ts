import { LogIn } from "./controllers/LogIn";
import { Regestry } from "./controllers/Regestry";
import { LoginAdmin } from "./controllers/LoginAdmin";
import { middelwareToken } from "../../middelware";

export const AuthRouter = (router: any) => {
  router.post("/auth", LogIn);
  router.post("/auth/admin", middelwareToken, LoginAdmin);
  router.post("/auth/reg", middelwareToken, Regestry);
};
