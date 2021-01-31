import {Request,Response} from 'express';
import { MysqlError } from 'mysql';
import { dbQuerySelect } from '../../dbService/dbQuery'; 

export const getOneUserById = async (req:Request,res:Response) => {
    try {
        const id = req.user.userId
        const paramsQuery = ['users','id',id]

        await dbQuerySelect(paramsQuery,(err:MysqlError,result:any)=>{
            if(err) return res.status(400).json({message: "wrong somtheing"})

            if (result) 
                return res.status(200).json(result)
            else 
                return res.status(204).json({message:"user not found"})   
        },false)
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "bad request"})
    }
}

export const getAllUser = async (req:Request,res:Response) => {
    try {
        const paramsQuery = ['users']
        
        await dbQuerySelect(paramsQuery,(err:MysqlError,result:any)=>{
            if(err) return res.status(400).json({message: err})

            if (result)
                return res.status(200).json(result)
            else 
                return res.status(204).json({message:"user not found"}) 
        },true)
    } catch (err) {
        console.log(err)
        res.status(400).json({message: "bad request"})
    }
}