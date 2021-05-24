import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const deleteUserFromGroup = async (req: Request, res: Response) => {
  try {
    const { groupId, userId } = req.body;
    console.log(groupId, userId);

    const paramsGroup = ["users_group", "groupId", groupId, "userId", userId];

    const result = await db.group.deleteUserGroup(paramsGroup);
    console.log(result);

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
