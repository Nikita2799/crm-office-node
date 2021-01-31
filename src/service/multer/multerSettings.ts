import multer from 'multer';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, ".");
    },
    filename: (req, file, cb) =>{
        cb(null, 'file.xlsx');
    }
});

export const multerApi = multer({storage:storageConfig}).single("file") 

 