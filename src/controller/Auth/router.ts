import { LogIn, Regestry } from "./controller"

export const AuthRouter = (router:any) => {
    router.post('/auth',LogIn)
    router.post('/auth/reg',Regestry)
}