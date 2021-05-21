import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const params = ["users", { ...req.body }, "id", id];

    await db.admin.update(params);

    res.status(200).json({ message: "user updated" });
  } catch (err) {
    console.log(err);
    if (err === 0) return res.status(422).json({ message: "user not found" });
    if (err === 1062) return res.status(422).json({ message: "user exist" });

    res.status(500).json({ message: "wrong some" });
  }
};
