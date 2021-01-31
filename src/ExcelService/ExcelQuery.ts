import {Request,Response} from 'express';
import { ExcelHandler } from './ExecelHandler';
import {dbQueryAddTabel} from '../dbService/dbQuery';
import { MysqlError } from 'mysql';
import { deleteFile } from './deleteFile';

//Query add tabel excel to MySql
export const ExcelQuery = async (req:Request,res:Response) => {
    try {
        const {nameTable} = req.body
        let name = `${nameTable}_wp`
        const paramsQuery = [nameTable]        
     
        await dbQueryAddTabel(paramsQuery,(err:MysqlError,result:any)=>{
            if(err)
                return res.status(400).json({message: 'name tabel alerdy exist'})   
        }) 

        await ExcelHandler(nameTable)

        await deleteFile()

        return res.status(200).json({message: 'db added'})  
    } catch (err) {
        console.log(err);
        return res.status(400).json({message: 'bad request'})
    }
}
