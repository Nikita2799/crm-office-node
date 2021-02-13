import { middelwareToken } from "../../middelware"
import {deleteAll, deleteUserById, showAllTable, updateUser} from "./controller"

export const AdminRouter = (router:any) => {
    router.delete('/admin/delete_all',middelwareToken,deleteAll);
    router.delete('/admin/delete_user/:id',middelwareToken,deleteUserById);
    router.get('/admin/show_tabel',showAllTable);
    router.put('/admin/update_user/:id',updateUser)
}