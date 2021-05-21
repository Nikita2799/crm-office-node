import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const params = ["users"];

    const result = await db.user.getAll(params);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    if (err === 0) return res.status(422).json({ message: "users not found" });
    res.status(500).json({ message: "bad request" });
  }
};
