export const findTable = async (listTable:any):Promise<[string]> => {
    const prefix:string = '_wp'
    let tabels:any = []  

    listTable.find((e:any,i:any)=>{
            let nameTable:string = e['Tables_in_office-crm_db']
                
            if(!nameTable.match(prefix)) return;
                
            tabels.push(nameTable)
    })
    
    return tabels        
}