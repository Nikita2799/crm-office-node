import { dbConnect } from "./dbConnection";

export async function  dbQuerySelect (paramsQuery:Array<any>,callback:Function,getAll:boolean){
    let sql = getAll?"SELECT * FROM ??" : "SELECT * FROM ?? WHERE ??=?"
    
    dbConnect.query(sql, paramsQuery, (err, res) => {        
        if (err)
           return callback(err,null)           
        if (res.length === 0)
           return callback(null,res)

       return callback(null,getAll?res:res[0])
    }) 
}

export async function  dbQuerySelectClient (paramsQuery:Array<any>,callback:Function){
    let sql = 'SELECT * FROM ?? WHERE ??=? ORDER BY id LIMIT 1 '

    dbConnect.query(sql, paramsQuery, (err, res) => {        
        if (err)
           return callback(err,null)
        console.log(err,res);
           
        if (res.length === 0){
            return callback(null,res)
        }
           
       return callback(null,res[0])
       
    }) 
}

export async function  dbQuerySelectClientWorked (paramsQuery:Array<any>,callback:Function){
    let sql = 'SELECT * FROM ?? WHERE ??=?&&??=? ORDER BY id LIMIT 1 '

    dbConnect.query(sql, paramsQuery, (err, res) => {        
        if (err)
           return callback(err,null)           
        if (res.lenght === 0){
            return callback(null,res)
        }
           
       return callback(null,res)
       
    }) 
}

export async function  dbQueryJoin (paramsQuery:Array<any>,callback:Function,deleteLine:boolean){
    let sql = deleteLine? 'INSERT INTO ?? SET?; '+ 
    'DELETE FROM ?? WHERE id=?': 'UPDATE ?? SET? WHERE ??=?'
    
    dbConnect.query(sql, paramsQuery, (err, res) => {        
        if (err)
           return callback(err,null)
        if (res.lenght === 0){
            return callback(null,res)
        }
           
       return callback(null,res)
       
    }) 
}

export async function  dbQueryInsert (paramsQuery:Array<any>,callback:Function){
    let sql = "INSERT INTO ?? SET?"
    
    dbConnect.query(sql, paramsQuery, (err, res) => {  
        if (err)
           return callback(err,null)
        
       return callback(null,res)
    }) 
}

export async function  dbQueryDelete (paramsQuery:Array<any>,callback:Function,userDelete:boolean){
    let sql = userDelete?"DELETE FROM ?? WHERE id=?":"DELETE FROM ??"

    dbConnect.query(sql, paramsQuery, (err, res) => {        
        if (err)
           return callback(err,null)
        
       return callback(null,res)
    }) 
}

export async function  dbQueryShowDb (paramsQuery:Array<any>,callback:Function){
    let sql = 'SHOW TABLES FROM ??'
    
    dbConnect.query(sql, paramsQuery, (err, res) => {        
        if (err)
           return callback(err,null)
        
       return callback(null,res)
    }) 
}

export async function  dbQueryAddTabel (paramsQuery:Array<any>,callback:Function){
    let sql = "CREATE TABLE `office-crm_db`.?? ( `id` INT NOT NULL AUTO_INCREMENT , `userId` INT NOT NULL , `name` VARCHAR(1000) NOT NULL , `phone` VARCHAR(30) NOT NULL , `addres` VARCHAR(100) NOT NULL , `status` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB"
    
    dbConnect.query(sql, paramsQuery, (err, res) => {  
        if (err)
           return callback(err,null)
        
       return callback(null,res)
    }) 
}

export async function  dbQueryUpdate (paramsQuery:Array<any>,callback:Function){
    let sql = "UPDATE ?? SET? WHERE ??=? "
    
    dbConnect.query(sql, paramsQuery, (err, res) => {  
        if (err)
           return callback(err,null);
        
       return callback(null,res);
    }) 
}