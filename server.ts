import express from "express";
import config from "./config/config";
import router from "./src/mainRouter";
import bodyParser from "body-parser";
import http from "http";
import { multerApi } from "./src/service/multer/multerSettings";
import { DatabaseApi } from "./src/dbService/DatabaseApi";
//import * as socketio from 'socket.io';
//import { dbQueryInsert, dbQuerySelect } from './src/dbService/dbQuery';

const app = express();

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

app.use(express.static(__dirname));
app.use(multerApi);
app.use(bodyParser.json());
app.use("/api", router);
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(config.SERVER.PORT, () => {
  console.log(`server started on:${config.SERVER.HOST}:${config.SERVER.PORT}`);
});
