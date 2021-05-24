import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const checkUserToGroupe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findParams = ["groups", "users_group", id];

    const group = await db.group.checkUser(findParams);

    console.log(group);

    res.status(200).json(group);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};
