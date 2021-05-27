import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getClientById = async (req: Request, res: Response) => {
  try {
    const { userId, clientId } = req.body;
    const params = ["users_group", "groups", "userId", userId];

    const tabelData: any = await db.admin.getClientBase(params);

    const clientParams = [tabelData[0].nameTabel, "status", 5, "id", clientId];
    const result = await db.admin.getClient(clientParams);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    if (err === 0) return res.status(422).json({ message: "not found" });
    res.status(500).json({ message: "wrong some" });
  }
};
