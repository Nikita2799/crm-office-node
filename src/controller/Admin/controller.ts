import { Request, Response } from "express";
import { MysqlError } from "mysql";
import {
  dbQueryDelete,
  dbQueryShowDb,
  dbQueryUpdate,
} from "../../dbService/dbQuery";
import { findTable } from "./helperService/findTable";

export const deleteAll = async (req: Request, res: Response) => {
  try {
    const paramsQuery = ["users"];
    await dbQueryDelete(
      paramsQuery,
      (err: MysqlError, result: any) => {
        if (err) return res.status(500).json({ message: err });

        if (result) return res.status(200).json(result);
        else return res.status(204).json({ message: "user not found" });
      },
      false
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "bad request" });
  }
};

export const showAllTable = async (req: Request, res: Response) => {
  try {
    const paramsQuery = ["office-crm_db"];

    await dbQueryShowDb(paramsQuery, async (err: MysqlError, result: any) => {
      if (err) return res.status(500).json({ message: err });

      let listTable = await findTable(result);

      if (result) return res.status(200).json(listTable);
      else return res.status(204).json({ message: "tables not found" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "bad request" });
  }
};
