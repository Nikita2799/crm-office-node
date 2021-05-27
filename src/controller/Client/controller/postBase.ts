import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";
import xlsx from "xlsx";
import { IClient } from "../type";
import { deleteFile } from "../../../ExcelService/deleteFile";

const db: DatabaseApi = new DatabaseApi();

export const postBase = async (req: Request, res: Response) => {
  try {
    const { nameTabel } = req.body;

    if (nameTabel.length === 0)
      return res.status(422).json({ message: "empty name" });

    const params: Array<any> = [nameTabel + "_wp"];

    await db.client.postNameBase(params);
    const err = await excel_to_base(nameTabel + "_wp", res);

    if (err) return res.status(422).json({ message: "incorrect base data" });

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    if (err === 1050)
      return res.status(422).json({ message: "Name tabel alrady exist" });
    res.status(500).json({ message: "bad request" });
  }
};

async function excel_to_base(nameTable: string, res: Response) {
  const wb = xlsx.readFile("file.xlsx");
  const ws = wb.Sheets["Лист1"];

  const data: Array<IClient> = xlsx.utils.sheet_to_json(ws);

  if (data.length < 0) return true;

  for (let i = 0; i < data.length; i++) {
    if (
      data[i].name === undefined ||
      data[i].address === undefined ||
      data[i].phone === undefined
    ) {
      return true;
    }

    const phone = await validationPhone(data[i].phone);
    const params = [
      `${nameTable}`,
      {
        userId: 0,
        name: data[i].name,
        phone: phone,
        address: data[i].address,
        desc: "",
        card: "",
        status: 0,
      },
    ];

    await db.client.postBase(params);
  }

  await deleteFile();
  return false;
}

const validationPhone = async (phone: string) => {
  let changePhone: string = phone.toString().replace(/\D/g, "").trim();

  if (changePhone.length === 10) changePhone = `7${+changePhone}`;
  if (changePhone[0] === "8") changePhone = changePhone.replace("8", "7");

  return changePhone;
};
