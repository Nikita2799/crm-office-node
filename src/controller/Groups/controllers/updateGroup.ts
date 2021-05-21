import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const params = ["groups", { ...req.body }, "groupId", groupId];

    res.status(200).json();
  } catch (err) {
    console.log(err);
    if (err === 1062)
      return res.status(422).json({ message: "Duplicate name" });
    res.status(500).json({ message: "wrong some" });
  }
};
