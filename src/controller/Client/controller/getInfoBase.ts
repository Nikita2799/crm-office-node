import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

interface IDataBase {
  tabel: string;
  notWorking: number;
  inWorking: number;
  closed: number;
  noAnswer: number;
  loss: number;
}

export const getInfoBase = async (req: Request, res: Response) => {
  try {
    const param = ["office-crm_db"];
    let tables: any = await db.client.getInfoBase(param);

    const result = await sortInfo(tables);

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};

async function sortInfo(tables: any) {
  let result: Array<IDataBase> = [];

  let numbers = [];

  for (let i = 0; i < tables.length; i++) {
    const nameTabel: any = Object.values(tables[i]);

    if (nameTabel[0].includes("wp")) {
      for (let i = 0; i <= 4; i++) {
        const params = [nameTabel[0], "status", i];
        const res: any = await db.client.getCount(params);
        numbers.push(res[0]["COUNT(*)"]);
      }

      result.push({
        tabel: nameTabel[0].replace("_wp", ""),
        notWorking: numbers[0],
        inWorking: numbers[1],
        noAnswer: numbers[2],
        closed: numbers[3],
        loss: numbers[4],
      });

      numbers = [];
    }
    continue;
  }
  return result;
}
