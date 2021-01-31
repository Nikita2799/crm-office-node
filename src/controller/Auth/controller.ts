import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from './type';
import { dbQueryInsert, dbQuerySelect } from '../../dbService/dbQuery';
import config from '../../../config/config';
import { MysqlError } from 'mysql';

export const LogIn = async(req:Request,res:Response) => {
    try {
        const {login,password} = <IUser>req.body;
        const paramsQuery = ['users','login',login];

        await dbQuerySelect(paramsQuery,async (err:any,result:any)=>{
            if(err) return res.status(503).json({message: "db error"});

            if(result){
                const isMatch = await bcrypt.compare(password,result.password)
                if(!isMatch) return res.status(412).json({message: 'incorrect password'})
                
                const token = jwt.sign({userId: result.id},config.SECURITY.TOKEN!, {expiresIn: '5h'});
                
                res.status(200).json({token: token});
            }
            else{
                res.status(204).json({message:"user not found"})
            }
        },false);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "bad request"});
    }
}  

export const Regestry = async (req:Request,res:Response) =>{
    try {
        const {login,name,lastName,password} = <IUser> req.body
        const hashPassword = await bcrypt.hash(password,12)
        const paramsQuery = ['users',{login:login,name:name,lastName:lastName,password:hashPassword,role:"user",  balance:"0"},"login",login]

        console.log(paramsQuery);
        

        await dbQueryInsert(paramsQuery,(err:MysqlError,result:any)=>{
            if(err)
                return res.status(400).json({message: 'user exist'})
            return res.status(201).json({message: 'user created'})    
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "bad request"});
    }
}  

