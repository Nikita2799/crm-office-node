import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.body;
    const paramsGroup = ["groups", "groupId", groupId];
    const paramsGroupUser = ["users_group", "groupId", groupId];

    await db.group.deleteGroup(paramsGroup);
    await db.group.deleteGroup(paramsGroupUser);

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
