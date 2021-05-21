import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getAllGroup = async (req: Request, res: Response) => {
  try {
    const params = ["groups"];

    const result = await db.group.getAllGroup(params);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    //if(err===0) return res.status(422).json()
    res.status(500).json({ message: "wrong some" });
  }
};
