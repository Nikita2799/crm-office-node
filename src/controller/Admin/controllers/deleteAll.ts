import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const deleteAll = async (req: Request, res: Response) => {
  try {
    const params: Array<unknown> = ["office-crm_db"];

    await db.admin.deleteAll(params);

    res.status(200).json({ message: "del" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
