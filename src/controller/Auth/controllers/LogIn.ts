import { Request, Response } from "express";
import bcrypt from "bcryptjs";
//import { dbQueryInsert, dbQuerySelect } from "../../dbService/dbQuery";
import { IUser } from "../type";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const LogIn = async (req: Request, res: Response) => {
  try {
    const { login, password } = <IUser>req.body;

    const paramsQuery = ["users", "login", login];

    const result: any = await db.auth.login(paramsQuery);

    const isMatch = await bcrypt.compare(password, result.result[0].password);

    if (!isMatch)
      return res.status(422).json({ message: "incorrect password" });

    res.status(200).json({ token: result.token });
  } catch (err) {
    console.log(err);
    if (err.length === 0) {
      return res.status(422).json({ message: "user not found" });
    }

    res.status(500).json({ message: "wrong some" });
  }
};
