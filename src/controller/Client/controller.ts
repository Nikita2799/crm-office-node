import {Request,Response} from 'express';
import { MysqlError } from 'mysql';
import {dbQueryJoin, dbQuerySelect, dbQuerySelectClient,dbQueryShowDb,dbQuerySelectClientWorked} from '../../dbService/dbQuery';
import {findTable} from '../Admin/helperService/findTable';

export const getClient = async (req:Request,res:Response) =>{
    try {
        const {userId} =  req.user
        
        await dbQueryShowDb(['office-crm_db'],async (err:MysqlError,listTable:any)=>{
            if(err) return res.status(500).json({message: err})

            const list:any = await findTable(listTable)
            
            await dbQuerySelectClient([list[0],'status',0],async (err:MysqlError,result:any)=>{                
                if(err) return res.status(500).json({message: err})
                
                if(result.length===0){
                    if(list.length>1){
                        await dbQuerySelectClient([list[1],'status',0],async (err:MysqlError,resultSecond:any)=>{
                            if(err) return res.status(500).json({message: err})

                            if(resultSecond.length===0) return res.status(204).json({message:'db empty'})
                            
                            const params = ['worked_base',{userId:userId,name:resultSecond.name,phone:resultSecond.phone,addres:resultSecond.addres,status: 1},list[1],resultSecond.id]
                            await dbQuerySelectClientWorked(['worked_base','status',0,"userId",userId],async (err:MysqlError,resultClient:any)=>{
                                if(err) return res.status(500).json({message:"server error"})
                                if(resultClient.length===0){
                                    await dbQueryJoin(params,async (err:MysqlError,resultAction:any)=>{
                                        if(err) res.status(500).json({message: 'server error'})
                                        dbQuerySelectClientWorked(['worked_base','status',1,"userId",userId],async (err:MysqlError,resultClientSecond:any)=>{
                                            if(err) return res.status(500).json({message:"server error"})
                                            
                                            return res.status(200).json(resultClientSecond[0])
                                        })      
                                    },true)
                                }
                                return res.status(200).json(resultClient[0])
                            }) 
                        })
                    }
                    else{
                        return res.status(204).json({message:'db empty'})
                    }    
                }
                else{   
                    const params = ['worked_base',{userId:userId,name:result.name,phone:result.phone,addres:result.addres,status: 1},list[0],result.id]
                    await dbQuerySelectClientWorked(['worked_base','status',0,"userId",userId],async (err:MysqlError,resultClient:any)=>{
                        if(err) return res.status(500).json({message:"server error"})
                        if(resultClient.length===0){
                            await dbQueryJoin(params,async (err:MysqlError,resultAction:any)=>{
                                if(err) res.status(500).json({message: 'server error'})
                                dbQuerySelectClientWorked(['worked_base','status',0,"userId",userId],async (err:MysqlError,resultClientSecond:any)=>{
                                    if(err) return res.status(500).json({message:"server error"})
                                    
                                    return res.status(200).json(resultClientSecond[0])
                                })      
                            },true)
                        }
                        else{
                            return res.status(200).json(resultClient[0])
                        }
                    })
                }
            })
        })
    } 
    catch (err) {
        console.log(err);
        res.status(400).json({message: "bad request"});
    }
}


export const changeStatus = async (req:Request,res:Response,) => {
    try {
        const id = req.params.id
        console.log(req.params);
        
        const {status} = req.body
        console.log(req.body);
        
        const params = ['worked_base','id',id]

        await dbQuerySelect(params,async (err:MysqlError,result:any)=>{
            if(err) return res.status(500).json({message: err})
            
            if(result.length===0) return res.status(204).json({message:'client not found'})

            const paramsQuery = ['worked_base',{status:status},'id',result.id]
            await dbQueryJoin(paramsQuery,(err:MysqlError,joinResult:any)=>{
                if(err) return res.status(500).json({message: err})
                return res.status(200).json({message: 'success'})
            },false)

        },false)
        
    } catch (err) {
        console.log(err);
        return res.status(400).json({message: 'bad request'})
    }
}