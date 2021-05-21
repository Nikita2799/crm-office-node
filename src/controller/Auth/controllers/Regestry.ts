import { Request, Response } from "express";
import bcrypt from "bcryptjs";
//import { dbQueryInsert, dbQuerySelect } from "../../dbService/dbQuery";
import { IUser } from "../type";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const Regestry = async (req: Request, res: Response) => {
  try {
    const { login, name, lastName, password } = <IUser>req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const paramsQuery = [
      "users",
      {
        login: login,
        name: name,
        lastName: lastName,
        password: hashPassword,
        role: "user",
        balance: "0",
        online: false,
      },
    ];

    await db.auth.create(paramsQuery);

    res.status(201).json({ message: "user created" });
  } catch (err) {
    console.log(err);
    if (err === 1062) return res.status(422).json({ message: "user exist" });
    res.status(500).json({ message: "bad request" });
  }
};
