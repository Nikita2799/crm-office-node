import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express';
import config from '../config/config';

export const middelwareToken = (req:Request,res:Response,next:NextFunction) => {
    if(req.method==='OPTIONS') return next();
    try {
        let token = undefined
    
        if (req.headers['x-access-token']) {
            token = req.headers['x-access-token'].toString();
        }
        
        if(!token) return res.status(401).json({message: 'non auth'});

        const decode = jwt.verify(token,config.SECURITY.TOKEN!);
    
        req.user = decode

        next();
        
    } catch (err) {
        console.log(err);
        res.status(401).json({message: 'non auth'});
    }
}