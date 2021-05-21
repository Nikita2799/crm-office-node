import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const params = ["users", id];

    await db.admin.deleteById(params);

    res.status(200).json({ message: "del user" });
  } catch (err) {
    console.log(err);
    if (err === 0) return res.status(422).json({ message: "user not found" });
    res.status(500).json({ message: "wrong some" });
  }
};
