import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getUsersFromGroup = async (req: Request, res: Response) => {
  try {
    const { groupid } = req.params;
    const params = ["users", "users_group", groupid];

    const result: any = await db.group.getUsersFromGroup(params);
    console.log(result, "users");

    let arrayUser = result.map((u: any) => {
      return { id: u.userId, name: u.name, lastName: u.lastName };
    });

    res.status(200).json(arrayUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
