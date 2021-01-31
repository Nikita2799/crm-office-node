import {ExcelQuery} from "./ExcelQuery"

export const ExcelRouter = (router:any) => {
    router.post('/excel/add',ExcelQuery)
}