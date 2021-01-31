import fs from 'fs';

export const deleteFile = async () => {
    fs.unlink('file.xlsx',(err)=> {
        if (err) throw err;
      
        console.log('file deleted');
    });
}