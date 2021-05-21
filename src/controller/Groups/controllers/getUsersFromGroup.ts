import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getUsersFromGroup = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const params = ["users_group", "groupId", id];

    const result = await db.group.getUsersFromGroup(params);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
