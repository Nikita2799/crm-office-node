import { Request, Response } from "express";
import { DatabaseApi } from "../../../dbService/DatabaseApi";
import xlsx from "xlsx";
import { IClient } from "../type";
import { deleteFile } from "../../../ExcelService/deleteFile";

const db: DatabaseApi = new DatabaseApi();

export const postBase = async (req: Request, res: Response) => {
  try {
    const { nameTabel } = req.body;

    const params: Array<any> = [nameTabel + "_wp"];

    await db.client.postNameBase(params);
    await excel_to_base(nameTabel + "_wp");

    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    if (err === 1050)
      return res.status(422).json({ message: "Name tabel alrady exist" });
    res.status(500).json({ message: "bad request" });
  }
};

async function excel_to_base(nameTable: string) {
  const wb = xlsx.readFile("file.xlsx");
  const ws = wb.Sheets["Лист1"];
  const data: Array<IClient> = xlsx.utils.sheet_to_json(ws);

  data.forEach(async (client: IClient) => {
    const phone = await validationPhone(client.phone);
    const params = [
      `${nameTable}`,
      {
        userId: 0,
        name: client.name,
        phone: phone,
        address: client.address,
        status: 0,
      },
    ];

    await db.client.postBase(params);
  });

  await deleteFile();
}

const validationPhone = async (phone: string) => {
  let changePhone: string = phone.toString().replace(/\D/g, "").trim();

  if (changePhone.length === 10) changePhone = `7${+changePhone}`;
  if (changePhone[0] === "8") changePhone = changePhone.replace("8", "7");

  return changePhone;
};
