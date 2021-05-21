import { type } from "os";
import xlsx from "xlsx";
import { dbQueryInsert } from "../dbService/dbQuery";
import fs from "fs";

///Parse execel to json and write db
export const ExcelHandler = async (nameTable: string) => {
  const wb = xlsx.readFile("file.xlsx", { type: "binary" });
  const ws = wb.Sheets["Лист1"];
  const data = xlsx.utils.sheet_to_json(ws);

  data.forEach(async (e: any, i: number) => {
    let phone = e.phone.toString();
    let changeNumber = phone.replace("8", "7");

    const paramsQuery = [
      `${nameTable}`,
      {
        userId: 1,
        name: e.name,
        phone: changeNumber,
        addres: e.addres,
        status: "0",
      },
    ];
    await dbQueryInsert(paramsQuery, (err: any, result: any) => {
      if (err) {
        console.log(err, "das");
        throw err;
      }
    });
  });
};
