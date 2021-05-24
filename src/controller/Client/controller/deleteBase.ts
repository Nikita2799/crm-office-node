import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getInfoBase = async (req: Request, res: Response) => {
  try {
    const { nameTabel } = req.body;
    const param = [nameTabel];

    await db.client.deleteBase(param);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
