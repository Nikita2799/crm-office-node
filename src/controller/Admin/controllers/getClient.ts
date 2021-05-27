import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";

const db: DatabaseApi = new DatabaseApi();

export const getClient = async (req: Request, res: Response) => {
  try {
    const params = ["office-crm_db"];

    const bases: any = await db.client.getInfoBase(params);

    const tabels: Array<string> = await sortTabel(bases);
    const result: Array<string> = [];
    for (let i = 0; i < tabels.length; i++) {
      let paramsStatus = [tabels[i], "status", "5"];
      let data: any = await db.admin.getActiveClient(paramsStatus);
      if (data.length !== 0) Array.prototype.push.apply(result, data);
    }

    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "wrong some" });
  }
};

async function sortTabel(names: Array<string>) {
  let sortArray: Array<string> = [];

  for (let i = 0; i < names.length; i++) {
    const nameTabel = Object.values(names[i]);

    if (nameTabel[0].includes("_wp")) sortArray.push(nameTabel[0]);
  }

  return sortArray;
}
