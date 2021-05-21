import express from "express";
import config from "./config/config";
import router from "./src/mainRouter";
import { multerApi } from "./src/service/multer/multerSettings";
import http from "http";
import { mainSocket } from "./src/socket/mainSocket";

const app = express();
const server = http.createServer(app);

declare global {
  namespace Express {
    interface Request {
      user: any;
      middel: any;
    }
  }
}

app.use(express.static(__dirname));
app.use(multerApi);
app.use(express.json());
app.use("/api", router);
app.use(express.urlencoded({ extended: true }));
mainSocket(server);

server.listen(config.SERVER.PORT, () => {
  console.log(`server started on:${config.SERVER.HOST}:${config.SERVER.PORT}`);
});
