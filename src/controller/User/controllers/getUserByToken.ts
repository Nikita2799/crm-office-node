import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getUserByToken = async (req: Request, res: Response) => {
  try {
    const id = req.user.userId;

    const params = ["users", "id", id];

    const result: any = await db.user.getById(params);

    res.status(200).json({ name: result.name, lastName: result.lastName });
  } catch (err) {
    console.log(err);
    if (err === 0) return res.status(422).json({ message: "user not found" });
    res.status(500).json({ message: "wrong some" });
  }
};
