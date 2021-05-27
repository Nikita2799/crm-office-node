import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getClient = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const params: Array<any> = ["groups", "users_group", userId];

    console.log(userId);

    const { nameTabel }: any = await db.client.getUserGroup(params);
    console.log(nameTabel, "nametabel");

    let client: any = await db.client.getClientInWork([
      nameTabel,
      "status",
      1,
      "userId",
      userId,
    ]);

    if (client === 0) {
      client = await db.client.getClient([nameTabel, "status", 0]);
      if (client === 0)
        client = await db.client.getClient([nameTabel, "status", 2]);
      if (client === 0) return res.status(404).json({ message: "no client" });
    }

    res.status(200).json(client);

    const updateParams = [
      nameTabel,
      { userId: userId, status: 1 },
      "id",
      client.id,
    ];
    await db.client.updateClient(updateParams);
  } catch (err) {
    console.log(err);
    if (err === 0)
      return res.status(422).json({ Message: "user not add non group" });

    if (err === 1146) return res.status(422).json({ message: "wrong tabel" });

    res.status(500).json({ message: "wrong some" });
  }
};
