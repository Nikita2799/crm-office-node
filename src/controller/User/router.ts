import { middelwareToken } from "../../middelware"
import {getAllUser, getOneUserById } from "./controller"

export const UserRouter = (router:any) => {
    router.get('/user/getOne',middelwareToken,getOneUserById)
    router.get('/user/getAll',getAllUser)
}