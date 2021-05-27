import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const changeStatusClient = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const { status, clientId } = req.body;
    const params: Array<any> = ["groups", "users_group", userId];
    console.log(userId, status, clientId);

    const { nameTabel }: any = await db.client.getUserGroup(params);

    const updateParams = [
      nameTabel,
      { userId: userId, status: status },
      "id",
      clientId,
    ];
    await db.client.updateClient(updateParams);

    res.status(200).json({ message: "status changed" });
  } catch (err) {
    console.log(err);

    if (err === 0)
      return res.status(422).json({ Message: "user not add non group" });

    res.status(500).json({ message: "wrong some" });
  }
};
