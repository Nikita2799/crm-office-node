import { middelwareToken } from "../../middelware";
import { changeStatus, getClient } from "./controller"

export const ClientRouter = (router:any) => {
    router.get('/client/get',middelwareToken,getClient);
    router.put('/client/change_status/:id',middelwareToken,changeStatus)
}