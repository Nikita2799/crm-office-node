import { Request, Response } from "express";

export const getquery = (req: Request, res: Response) => {
  try {
    res.status(200).json({ mes: "sd" });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
