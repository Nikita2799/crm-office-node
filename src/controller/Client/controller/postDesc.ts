import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const postDesc = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const { clientId } = req.params;
    const { desc } = req.body;
    const params = ["users_group", "groups", userId];

    console.log(userId, clientId, desc);

    const nameTabel: any = await db.client.getNameTabel(params);
    console.log(nameTabel);

    const paramsPost = [nameTabel[0].nameTabel, { desc: desc }, "id", clientId];

    await db.client.postDesc(paramsPost);

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
