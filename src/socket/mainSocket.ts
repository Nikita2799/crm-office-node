import http from "http";
import { Server } from "socket.io";
import { DatabaseApi } from "../dbService/DatabaseApi";
import jwt from "jsonwebtoken";
import config from "../../config/config";

const db: DatabaseApi = new DatabaseApi();

export const mainSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["*"],
    },
  });

  io.on("connection", async (socket) => {
    const token = socket.handshake.query.id;
    if (token !== undefined) {
      console.log("connect");

      const decode: any = jwt.verify(token, config.SECURITY.TOKEN!);

      const params = ["users", { online: true }, "id", Number(decode.userId)];

      await db.socket.changeOnline(params).catch((err) => console.log(err));

      socket.emit();
    }
    socket.on("disconnect", async () => {
      const token = socket.handshake.query.id;

      if (token !== undefined) {
        const decode: any = jwt.verify(token, config.SECURITY.TOKEN!);

        const paramsDisconnect = [
          "users",
          { online: false },
          "id",
          Number(decode.userId),
        ];

        await db.socket
          .changeOnline(paramsDisconnect)
          .catch((err) => console.log(err));
      }
    });
  });
};
