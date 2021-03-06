import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";
import bcrypt from "bcryptjs";

const db: DatabaseApi = new DatabaseApi();

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    console.log(req.user);

    const { password } = req.body;
    console.log(req.body);

    const hashPassword = await bcrypt.hash(password, 12);
    const params = ["users", { password: hashPassword }, "id", userId];

    await db.admin.updatePassword(params);

    res.status(200).json({ message: "password changed" });
  } catch (err) {
    console.log(err);
    if (err === 0) return res.status(422).json({ message: "user not found" });
    res.status(500).json({ message: "wrong some" });
  }
};
