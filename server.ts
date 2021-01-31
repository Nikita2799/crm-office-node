import express from 'express'
import config  from './config/config'
import router  from './src/mainRouter'
import bodyParser from 'body-parser'
import http from 'http';
import { multerApi } from './src/service/multer/multerSettings';
//import * as socketio from 'socket.io';
//import { dbQueryInsert, dbQuerySelect } from './src/dbService/dbQuery';

const app = express()
const server = http.createServer(app)

/*const io:socketio.Socket = require('socket.io')(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})*/

declare global {
  namespace Express {
    interface Request {
      user:any,
    }
  }
}

app.use(express.static(__dirname));
app.use(multerApi);
app.use(bodyParser.json());
app.use('/api',router);
app.use(bodyParser.urlencoded({extended:true}));

/*io.on("connection",(socket: any)=> {
  console.log("a user connectedd");
  // whenever we receive a 'message' we log it out

  socket.on("get",async (message:any,callback:Function)=> {
    console.log('get');
    const paramsQuery = ['chat']
    
    await dbQuerySelect(paramsQuery,(err:any,res:any)=>{
      if(err) throw err
      socket.emit('message',{res})
    },true) 

    callback()
  });

  socket.on("setMessage",async (message: any,callback:Function)=> {   
      console.log(message); 
      const paramsQuery = ['chat',{userId:message.userId,message:message.message}]

      await dbQueryInsert(paramsQuery,(err:any,res:any)=>{
        if(err) throw err
      })
      socket.emit('newMessage',{message: message.message, userId: message.userId})
      
      callback()
  });

  socket.on("disconnect",()=>{
    console.log("a user disconnected");
  })
});*/

server.listen(config.SERVER.PORT,()=>{
    console.log(`server started on:${config.SERVER.HOST}:${config.SERVER.PORT}` );
})