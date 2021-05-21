import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getgroupById = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const paramsGroup = ["groups", "groupId", groupId];

    const result = await db.group.findGroupById(paramsGroup);

    if (!result) return res.status(422).json({ message: "group not found" });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
