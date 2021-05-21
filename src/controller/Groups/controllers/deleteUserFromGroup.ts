import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const deleteUserFromGroup = async (req: Request, res: Response) => {
  try {
    const { groupId, userId } = req.body;
    const paramsGroup = ["users_group", "groupId", groupId, "userId", userId];

    await db.group.deleteUserGroup(paramsGroup);

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
